import { afterEach, beforeEach, describe, expect, it } from "vitest";

import {
  createEmailConfirmationToken,
  verifyEmailConfirmationToken,
} from "../services/auth/emailConfirmationToken.js";

const originalSecret = process.env.TOKEN_SECRET;

describe("email confirmation tokens", () => {
  beforeEach(() => {
    process.env.TOKEN_SECRET = "test-secret-that-is-long-enough-for-confirmation";
  });

  afterEach(() => {
    if (originalSecret === undefined) delete process.env.TOKEN_SECRET;
    else process.env.TOKEN_SECRET = originalSecret;
  });

  it("round-trips the intended user", () => {
    const token = createEmailConfirmationToken("user-123");
    expect(verifyEmailConfirmationToken(token)).toBe("user-123");
  });

  it("rejects missing and tampered tokens", () => {
    expect(() => verifyEmailConfirmationToken(undefined)).toThrow(
      "Invalid email confirmation token",
    );
    const token = createEmailConfirmationToken("user-123");
    expect(() => verifyEmailConfirmationToken(`${token}tampered`)).toThrow(
      "Invalid email confirmation token",
    );
  });
});
