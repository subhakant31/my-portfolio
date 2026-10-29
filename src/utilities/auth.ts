import type { NextApiRequest, NextApiResponse } from "next";
import { SignJWT, jwtVerify } from "jose";

/**
 * Server-side auth for edit mode. Credentials live in env vars; the browser
 * only ever receives a signed, HTTP-only session cookie (never the token or
 * the password hash). Every protected API route must call requireSession().
 */

export const SESSION_COOKIE = "edit_session";
const SESSION_TTL_SECONDS = 60 * 60 * 2; // 2 hours

function getSecret(): Uint8Array {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET is not set");
  }
  return new TextEncoder().encode(secret);
}

export interface SessionPayload {
  sub: string; // the admin username
  role: "editor";
}

/** Create a signed JWT for the authenticated admin. */
export async function createSessionToken(username: string): Promise<string> {
  return new SignJWT({ role: "editor" })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(username)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(getSecret());
}

/** Verify a JWT string; returns the payload or null if invalid/expired. */
export async function verifySessionToken(
  token: string | undefined | null
): Promise<SessionPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecret());
    if (payload.role !== "editor" || typeof payload.sub !== "string") {
      return null;
    }
    return { sub: payload.sub, role: "editor" };
  } catch {
    return null;
  }
}

function buildCookie(value: string, maxAge: number): string {
  const parts = [
    `${SESSION_COOKIE}=${value}`,
    "HttpOnly",
    "Path=/",
    "SameSite=Lax",
    `Max-Age=${maxAge}`,
  ];
  if (process.env.NODE_ENV === "production") {
    parts.push("Secure");
  }
  return parts.join("; ");
}

/** Build the Set-Cookie header value for the session cookie. */
export function sessionCookie(token: string): string {
  return buildCookie(token, SESSION_TTL_SECONDS);
}

/** Build the Set-Cookie header value that clears the session cookie. */
export function clearSessionCookie(): string {
  return buildCookie("", 0);
}

/** Read the session cookie from an incoming API request (Next parses req.cookies). */
export function readSessionCookie(req: NextApiRequest): string | undefined {
  return req.cookies?.[SESSION_COOKIE];
}

/**
 * Guard for protected API routes. Returns the verified session, or sends a 401
 * and returns null. Usage:
 *   const session = await requireSession(req, res);
 *   if (!session) return;
 */
export async function requireSession(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<SessionPayload | null> {
  const token = readSessionCookie(req);
  const session = await verifySessionToken(token);
  if (!session) {
    res.status(401).json({ error: "Unauthorized" });
    return null;
  }
  return session;
}
