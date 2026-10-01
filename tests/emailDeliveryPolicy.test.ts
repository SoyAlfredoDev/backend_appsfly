import { describe, expect, it } from "vitest";

import { shouldDeliverExternalEmail } from "../emails/core/sendEmail.js";

describe("external email delivery policy", () => {
  it("always enables delivery in production", () => {
    expect(
      shouldDeliverExternalEmail({
        APP_ENV: "production",
        EMAIL_DELIVERY_ENABLED: "false",
      }),
    ).toBe(true);
  });

  it("disables delivery by default in development and test", () => {
    expect(shouldDeliverExternalEmail({ APP_ENV: "development" })).toBe(false);
    expect(shouldDeliverExternalEmail({ NODE_ENV: "test" })).toBe(false);
  });

  it("allows explicit delivery while testing an email integration locally", () => {
    expect(
      shouldDeliverExternalEmail({
        APP_ENV: "development",
        EMAIL_DELIVERY_ENABLED: "true",
      }),
    ).toBe(true);
  });
});
