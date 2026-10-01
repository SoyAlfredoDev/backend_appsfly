export const MIN_PASSWORD_LENGTH = 8;

export function passwordPolicyError(password: unknown): string | null {
  if (typeof password !== "string" || password.length < MIN_PASSWORD_LENGTH) {
    return "Password must be at least 8 characters";
  }
  return null;
}

export function invalidCredentialsBody(): { message: string; code: "INVALID_CREDENTIALS" } {
  return {
    message: "Incorrect username or password",
    code: "INVALID_CREDENTIALS",
  };
}
