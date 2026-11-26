import { afterEach, describe, expect, it, vi } from "vitest";

import { sendEmail } from "../emails/core/sendEmail.js";

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe("Resend SDK transport", () => {
  it.each([
    [undefined, "contacto@appsfly.cl"],
    [" soporte@example.com ", "soporte@example.com"],
  ])("preserves reply-to through SDK serialization (%s)", async (replyTo, expected) => {
    vi.stubEnv("APP_ENV", "production");
    vi.stubEnv("RESEND_API_KEY", "re_qa_not_a_real_key");
    vi.stubEnv("PLATFORM_EMAIL_DEFAULT_FROM", "AppsFly <no-reply@appsfly.cl>");
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ id: "qa-email-id" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    await expect(
      sendEmail({
        to: "qa@example.com",
        subject: "QA transport",
        html: "<p>Synthetic test</p>",
        replyTo,
      }),
    ).resolves.toEqual({ id: "qa-email-id" });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://api.resend.com/emails");
    expect(JSON.parse(String(init.body))).toMatchObject({
      from: "AppsFly <no-reply@appsfly.cl>",
      to: "qa@example.com",
      reply_to: expected,
    });
  });

  it("keeps quota error details and forwards campaign options through the Resend SDK", async () => {
    vi.stubEnv("APP_ENV", "production");
    vi.stubEnv("RESEND_API_KEY", "re_qa_not_a_real_key");
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    const fetchMock = vi
      .fn()
      .mockResolvedValue(
        Response.json(
          { name: "rate_limit_exceeded", statusCode: 429, message: "Esperar antes de enviar" },
          { status: 429, headers: { "Retry-After": "7" } },
        ),
      );
    vi.stubGlobal("fetch", fetchMock);

    const headers = {
      "List-Unsubscribe": "<https://appsfly.cl/unsubscribe/example>",
      "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
    };
    await expect(
      sendEmail({
        to: "qa@example.com",
        subject: "QA transport",
        html: "<p>Synthetic test</p>",
        headers,
        idempotencyKey: "qa-campaign-recipient",
        timeoutMs: 5000,
      }),
    ).rejects.toMatchObject({
      code: "rate_limit_exceeded",
      statusCode: 429,
      retryAfter: "7",
      message: "Esperar antes de enviar",
    });

    const [, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(new Headers(init.headers).get("Idempotency-Key")).toBe("qa-campaign-recipient");
    expect(init.signal).toBeInstanceOf(AbortSignal);
    expect(JSON.parse(String(init.body))).toMatchObject({ headers });
  });
});
