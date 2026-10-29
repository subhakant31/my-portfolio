import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { createSessionToken, sessionCookie } from "@/utilities/auth";

/**
 * POST /api/admin/login
 * Body: { username, password }
 * Verifies against ADMIN_USER + ADMIN_PASSWORD_HASH (bcrypt) and, on success,
 * sets an HTTP-only session cookie. Never reveals which part was wrong.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.setHeader("Allow", ["POST"]).status(405).end("Method Not Allowed");
  }

  const { username, password } = req.body ?? {};

  const expectedUser = process.env.ADMIN_USER;
  // The bcrypt hash is stored base64-encoded to avoid dotenv variable-expansion
  // mangling the "$" characters in the hash. Decode it back here.
  const hashB64 = process.env.ADMIN_PASSWORD_HASH_B64;
  const expectedHash = hashB64
    ? Buffer.from(hashB64, "base64").toString("utf8")
    : undefined;

  if (!expectedUser || !expectedHash || !process.env.SESSION_SECRET) {
    console.error("Edit mode auth is not configured (missing env vars).");
    return res.status(500).json({ error: "Edit mode is not configured." });
  }

  if (typeof username !== "string" || typeof password !== "string") {
    return res.status(400).json({ error: "Username and password are required." });
  }

  // Always run bcrypt compare (even on username mismatch) to avoid timing leaks.
  const userMatches = username === expectedUser;
  const passwordMatches = await bcrypt.compare(password, expectedHash);

  if (!userMatches || !passwordMatches) {
    return res.status(401).json({ error: "Invalid credentials." });
  }

  const token = await createSessionToken(expectedUser);
  res.setHeader("Set-Cookie", sessionCookie(token));
  return res.status(200).json({ ok: true, user: expectedUser });
}
