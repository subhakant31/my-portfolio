/**
 * Generates a bcrypt hash + a random session secret for the edit-mode admin login.
 *
 * Usage:
 *   node scripts/generate-admin-hash.mjs "your-password-here"
 *
 * Copy the printed values into your env:
 *   - ADMIN_PASSWORD_HASH  -> local: .env.development / prod: hosting env vars
 *   - SESSION_SECRET       -> keep secret, never commit
 *
 * ADMIN_USER is up to you (plain string, e.g. your email or a username).
 */
import bcrypt from "bcryptjs";
import { randomBytes } from "node:crypto";

const password = process.argv[2];

if (!password) {
  console.error('Usage: node scripts/generate-admin-hash.mjs "your-password"');
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 12);
// Store base64-encoded: a bcrypt hash contains "$" which dotenv/dotenv-expand
// would otherwise try to expand as variables, corrupting the value.
const hashB64 = Buffer.from(hash, "utf8").toString("base64");
const sessionSecret = randomBytes(48).toString("base64url");

console.log("\nAdd these to your env (.env.development locally, hosting env vars in prod):\n");
console.log(`ADMIN_USER=admin`);
console.log(`ADMIN_PASSWORD_HASH_B64=${hashB64}`);
console.log(`SESSION_SECRET=${sessionSecret}`);
console.log("");
