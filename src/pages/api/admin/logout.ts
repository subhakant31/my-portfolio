import type { NextApiRequest, NextApiResponse } from "next";
import { clearSessionCookie } from "@/utilities/auth";

/** POST /api/admin/logout — clears the session cookie. */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.setHeader("Allow", ["POST"]).status(405).end("Method Not Allowed");
  }
  res.setHeader("Set-Cookie", clearSessionCookie());
  return res.status(200).json({ ok: true });
}
