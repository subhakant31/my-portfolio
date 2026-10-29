import type { NextApiRequest, NextApiResponse } from "next";
import { buildClient, ApiError } from "@datocms/cma-client-node";
import sanitizeHtml from "sanitize-html";
import { requireSession } from "@/utilities/auth";
import { getFieldKind } from "@/utilities/editableFields";

// Allowlist for rich-text fields. Anything outside this (scripts, iframes,
// event handlers, style attrs, etc.) is stripped so edit mode can't introduce
// stored XSS — the content is rendered via dangerouslySetInnerHTML to visitors.
const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: [
    "p", "br", "strong", "b", "em", "i", "u", "s", "a",
    "ul", "ol", "li", "blockquote", "h1", "h2", "h3", "h4", "h5", "h6",
    "span", "div",
  ],
  allowedAttributes: {
    a: ["href", "target", "rel"],
  },
  allowedSchemes: ["http", "https", "mailto", "tel"],
  transformTags: {
    // Force safe rel on links that open in a new tab.
    a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" }),
  },
};

const MAX_TEXT_LENGTH = 5000;
const MAX_HTML_LENGTH = 20000;

interface IncomingEdit {
  recordId: string;
  typename: string;
  apiKey: string;
  value: string;
}

/**
 * POST /api/admin/publish
 * Body: { edits: IncomingEdit[] }
 *
 * Auth-gated. Validates every edit against the server-side whitelist, writes
 * the changes to DatoCMS via the CMA (token stays server-side), publishes the
 * affected records, then revalidates the static pages so changes show quickly.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.setHeader("Allow", ["POST"]).status(405).end("Method Not Allowed");
  }

  // 1) AuthN/AuthZ — reject anything without a valid session.
  const session = await requireSession(req, res);
  if (!session) return;

  const token = process.env.DATOCMS_CMA_TOKEN;
  if (!token) {
    console.error("DATOCMS_CMA_TOKEN is not set.");
    return res.status(500).json({ error: "Publishing is not configured." });
  }

  const edits: IncomingEdit[] = Array.isArray(req.body?.edits) ? req.body.edits : [];
  if (edits.length === 0) {
    return res.status(400).json({ error: "No edits provided." });
  }

  // 2) Validate shape + whitelist. Reject the whole batch on any invalid edit.
  for (const edit of edits) {
    if (
      !edit ||
      typeof edit.recordId !== "string" ||
      typeof edit.typename !== "string" ||
      typeof edit.apiKey !== "string" ||
      typeof edit.value !== "string"
    ) {
      return res.status(400).json({ error: "Malformed edit payload." });
    }
    const kind = getFieldKind(edit.typename, edit.apiKey);
    if (!kind) {
      return res.status(403).json({
        error: `Field "${edit.apiKey}" on ${edit.typename} is not editable.`,
      });
    }
    const maxLen = kind === "html" ? MAX_HTML_LENGTH : MAX_TEXT_LENGTH;
    if (edit.value.length > maxLen) {
      return res.status(400).json({ error: "Edit value is too long." });
    }
  }

  // 3) Group edits by record id into a single attributes patch per record.
  //    Rich-text (html) fields are sanitized before saving.
  const byRecord = new Map<string, Record<string, string>>();
  for (const edit of edits) {
    const kind = getFieldKind(edit.typename, edit.apiKey);
    const value =
      kind === "html" ? sanitizeHtml(edit.value, SANITIZE_OPTIONS) : edit.value;
    const attrs = byRecord.get(edit.recordId) ?? {};
    attrs[edit.apiKey] = value;
    byRecord.set(edit.recordId, attrs);
  }

  const environment = process.env.DATOCMS_ENVIRONMENT || undefined;
  const client = buildClient({ apiToken: token, environment });

  try {
    const updatedIds: string[] = [];
    for (const [recordId, attributes] of Array.from(byRecord.entries())) {
      await client.items.update(recordId, attributes);
      await client.items.publish(recordId);
      updatedIds.push(recordId);
    }

    // 4) On-demand revalidation so the static pages reflect the changes.
    try {
      await res.revalidate("/");
    } catch (revalidateError) {
      // Non-fatal: the edit was saved; the page will catch up on the next ISR cycle.
      console.error("Revalidation failed:", (revalidateError as Error).message);
    }

    return res.status(200).json({ ok: true, updated: updatedIds });
  } catch (error) {
    if (error instanceof ApiError) {
      console.error("DatoCMS publish error:", error.message);
      return res.status(502).json({ error: "Failed to save to DatoCMS." });
    }
    console.error("Publish error:", (error as Error).message);
    return res.status(500).json({ error: "Unexpected error while publishing." });
  }
}
