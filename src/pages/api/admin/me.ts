import type { NextApiRequest, NextApiResponse } from "next";
import { readSessionCookie, verifySessionToken } from "@/utilities/auth";

/**
 * GET /api/admin/me — returns the current auth state so the client can decide
 * whether to show edit controls. Returns { authenticated: boolean }.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await verifySessionToken(readSessionCookie(req));
  return res.status(200).json({
    authenticated: Boolean(session),
    user: session?.sub ?? null,
  });
}
