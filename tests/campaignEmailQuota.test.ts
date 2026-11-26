import { afterEach, describe, expect, it, vi } from "vitest";
import {
  campaignQuotaPause,
  campaignSendPause,
  readCampaignEmailQuota,
} from "../services/billing/campaignEmailQuota.js";

const now = new Date("2026-11-25T12:00:00.000Z");
const dailyReset = "2026-11-25T23:59:59.999Z";
const monthlyReset = "2026-12-12T12:01:16.792Z";

function mockUsage(dailyUsed: number, monthlyUsed: number, dailyLimit = 100, monthlyLimit = 3000) {
  vi.stubEnv("RESEND_API_KEY", "test-quota-key");
  const fetch = vi.fn().mockResolvedValue(
    Response.json({
      emails: {
        daily: { used: dailyUsed, limit: dailyLimit, resets_at: dailyReset },
        monthly: { used: monthlyUsed, limit: monthlyLimit, resets_at: monthlyReset },
      },
    }),
  );
  vi.stubGlobal("fetch", fetch);
  return fetch;
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

describe("cuota de campañas en Resend", () => {
  it("consulta /usage y conserva el vencimiento del ciclo real de Resend", async () => {
    const fetch = mockUsage(26, 2991);

    await expect(readCampaignEmailQuota(now)).resolves.toEqual({
      daily: { remaining: 74, resetsAt: new Date(dailyReset) },
      monthly: { remaining: 9, resetsAt: new Date(monthlyReset) },
      remaining: 9,
    });

    expect(fetch).toHaveBeenCalledWith(
      "https://api.resend.com/usage",
      expect.objectContaining({
        headers: { Authorization: "Bearer test-quota-key" },
        cache: "no-store",
        signal: expect.any(AbortSignal),
      }),
    );
  });

  it("no supera los topes gratuitos si Resend devuelve límites más altos", async () => {
    mockUsage(99, 2999, 1000, 50000);

    await expect(readCampaignEmailQuota(now)).resolves.toMatchObject({
      daily: { remaining: 1 },
      monthly: { remaining: 1 },
      remaining: 1,
    });
  });

  it("respeta límites inferiores configurados en Resend", async () => {
    mockUsage(24, 250, 25, 250);

    await expect(readCampaignEmailQuota(now)).resolves.toMatchObject({
      daily: { remaining: 1 },
      monthly: { remaining: 0 },
      remaining: 0,
    });
  });

  it("prioriza la pausa mensual si se agotaron ambos límites", async () => {
    mockUsage(100, 3001);

    expect(campaignQuotaPause(await readCampaignEmailQuota(now))).toEqual({
      code: "CAMPAIGN_MONTHLY_QUOTA",
      retryAt: new Date(monthlyReset),
    });
  });

  it("pausa solo hasta el reinicio diario si aún queda cuota mensual", async () => {
    mockUsage(100, 1250);

    expect(campaignQuotaPause(await readCampaignEmailQuota(now))).toEqual({
      code: "CAMPAIGN_DAILY_QUOTA",
      retryAt: new Date(dailyReset),
    });
  });

  it.each([
    ["petición fallida", new Response(null, { status: 401 })],
    ["estructura incompleta", Response.json({ emails: { monthly: {} } })],
    [
      "ciclo desactualizado",
      Response.json({
        emails: {
          daily: { used: 100, limit: 100, resets_at: now.toISOString() },
          monthly: { used: 100, limit: 3000, resets_at: monthlyReset },
        },
      }),
    ],
  ])("impide el envío cuando el uso es indeterminado (%s)", async (_name, result) => {
    vi.stubEnv("RESEND_API_KEY", "test-quota-key");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(result));

    await expect(readCampaignEmailQuota(now)).rejects.toMatchObject({
      code: "CAMPAIGN_QUOTA_UNAVAILABLE",
      statusCode: 503,
    });
  });

  it("falla de forma segura si falta la llave del proveedor", async () => {
    const fetch = vi.fn();
    vi.stubEnv("RESEND_API_KEY", "");
    vi.stubGlobal("fetch", fetch);

    await expect(readCampaignEmailQuota(now)).rejects.toMatchObject({
      code: "CAMPAIGN_QUOTA_UNAVAILABLE",
    });
    expect(fetch).not.toHaveBeenCalled();
  });

  it("distingue un rechazo diario, mensual y una espera breve incluso cuando la última lectura tenía cupo", async () => {
    mockUsage(20, 250);
    const quota = await readCampaignEmailQuota(now);

    expect(campaignSendPause({ code: "monthly_quota_exceeded" }, quota, now)).toEqual({
      code: "CAMPAIGN_MONTHLY_QUOTA",
      retryAt: new Date(monthlyReset),
    });
    expect(campaignSendPause({ code: "daily_quota_exceeded" }, quota, now)).toEqual({
      code: "CAMPAIGN_DAILY_QUOTA",
      retryAt: new Date(dailyReset),
    });
    expect(campaignSendPause({ statusCode: 429, retryAfter: "3" }, quota, now)).toEqual({
      code: "CAMPAIGN_RATE_LIMIT",
      retryAt: new Date("2026-11-25T12:00:03.000Z"),
    });
    expect(campaignSendPause({ statusCode: 400 }, quota, now)).toBeNull();
  });

  it.each([
    { code: "application_error", statusCode: null },
    { code: "concurrent_idempotent_requests", statusCode: 409 },
    { code: "internal_server_error", statusCode: 502 },
  ])("señala entregas inciertas que requieren reintento idempotente (%s)", async (error) => {
    mockUsage(20, 250);
    const quota = await readCampaignEmailQuota(now);

    expect(campaignSendPause(error, quota, now)).toEqual({
      code: "CAMPAIGN_DELIVERY_UNCERTAIN",
      retryAt: new Date("2026-11-25T12:01:00.000Z"),
    });
  });
});
