import jwt, { type JwtPayload } from "jsonwebtoken";

const TOKEN_PURPOSE = "email-confirmation";

function tokenSecret(): string {
  const secret = process.env.TOKEN_SECRET?.trim();
  if (!secret) throw new Error("TOKEN_SECRET is required");
  return secret;
}

export function createEmailConfirmationToken(userId: string): string {
  if (!userId?.trim()) throw new Error("userId is required");
  return jwt.sign({ purpose: TOKEN_PURPOSE }, tokenSecret(), {
    subject: userId,
    audience: "appsfly-email-confirmation",
    issuer: "appsfly-api",
    expiresIn: "24h",
  });
}

export function verifyEmailConfirmationToken(token: unknown): string {
  try {
    if (typeof token !== "string" || !token.trim()) throw new Error("missing token");
    const payload = jwt.verify(token, tokenSecret(), {
      audience: "appsfly-email-confirmation",
      issuer: "appsfly-api",
    }) as JwtPayload;
    if (payload.purpose !== TOKEN_PURPOSE || typeof payload.sub !== "string") {
      throw new Error("invalid purpose");
    }
    return payload.sub;
  } catch {
    const error = new Error("Invalid email confirmation token");
    Object.assign(error, { code: "INVALID_EMAIL_CONFIRMATION_TOKEN" });
    throw error;
  }
}
