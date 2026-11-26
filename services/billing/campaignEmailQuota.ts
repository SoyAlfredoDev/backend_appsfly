const freeDailyLimit = 100;
const freeMonthlyLimit = 3000;
const defaultRetryMs = 60_000;

type QuotaWindow = {
  remaining: number;
  resetsAt: Date;
};

export type CampaignEmailQuota = {
  daily: QuotaWindow;
  monthly: QuotaWindow;
  remaining: number;
};

export type CampaignQuotaPause = {
  code:
    | "CAMPAIGN_DAILY_QUOTA"
    | "CAMPAIGN_MONTHLY_QUOTA"
    | "CAMPAIGN_RATE_LIMIT"
    | "CAMPAIGN_DELIVERY_UNCERTAIN";
  retryAt: Date;
};

export class CampaignQuotaUnavailableError extends Error {
  readonly code = "CAMPAIGN_QUOTA_UNAVAILABLE";
  readonly statusCode = 503;

  constructor() {
    super("No se pudo comprobar el cupo gratuito de Resend. Los correos siguen pendientes.");
  }
}

function readWindow(value: unknown, maximum: number, now: Date): QuotaWindow {
  if (!value || typeof value !== "object") throw new CampaignQuotaUnavailableError();

  const { used, limit, resets_at: reset } = value as Record<string, unknown>;
  if (
    typeof used !== "number" ||
    !Number.isSafeInteger(used) ||
    used < 0 ||
    typeof limit !== "number" ||
    !Number.isSafeInteger(limit) ||
    limit < 0 ||
    typeof reset !== "string"
  ) {
    throw new CampaignQuotaUnavailableError();
  }

  const resetsAt = new Date(reset);
  if (!Number.isFinite(resetsAt.valueOf()) || resetsAt <= now) {
    throw new CampaignQuotaUnavailableError();
  }

  return { remaining: Math.max(0, Math.min(limit, maximum) - used), resetsAt };
}

export async function readCampaignEmailQuota(now = new Date()): Promise<CampaignEmailQuota> {
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) throw new CampaignQuotaUnavailableError();

  try {
    const response = await fetch("https://api.resend.com/usage", {
      headers: { Authorization: `Bearer ${key}` },
      cache: "no-store",
      signal: AbortSignal.timeout(4000),
    });
    if (!response.ok) throw new CampaignQuotaUnavailableError();
    const payload = (await response.json()) as { emails?: { daily?: unknown; monthly?: unknown } };

    const daily = readWindow(payload?.emails?.daily, freeDailyLimit, now);
    const monthly = readWindow(payload?.emails?.monthly, freeMonthlyLimit, now);
    return { daily, monthly, remaining: Math.min(daily.remaining, monthly.remaining) };
  } catch {
    throw new CampaignQuotaUnavailableError();
  }
}

export function campaignQuotaPause(quota: CampaignEmailQuota): CampaignQuotaPause | null {
  if (quota.monthly.remaining === 0) {
    return { code: "CAMPAIGN_MONTHLY_QUOTA", retryAt: quota.monthly.resetsAt };
  }
  if (quota.daily.remaining === 0) {
    return { code: "CAMPAIGN_DAILY_QUOTA", retryAt: quota.daily.resetsAt };
  }
  return null;
}

function retryAtFromHeader(value: unknown, now: Date): Date {
  if (typeof value === "string" && value.trim()) {
    const seconds = Number(value);
    const time = Number.isFinite(seconds)
      ? now.valueOf() + Math.ceil(seconds * 1000)
      : Date.parse(value);
    if (time > now.valueOf() && Number.isFinite(new Date(time).valueOf())) return new Date(time);
  }
  return new Date(now.valueOf() + defaultRetryMs);
}

export function campaignSendPause(
  error: unknown,
  quota: CampaignEmailQuota,
  now = new Date(),
): CampaignQuotaPause | null {
  if (!error || typeof error !== "object") return null;
  const { code, statusCode, retryAfter } = error as Record<string, unknown>;

  if (code === "monthly_quota_exceeded") {
    return { code: "CAMPAIGN_MONTHLY_QUOTA", retryAt: quota.monthly.resetsAt };
  }
  if (code === "daily_quota_exceeded") {
    return { code: "CAMPAIGN_DAILY_QUOTA", retryAt: quota.daily.resetsAt };
  }
  if (code === "rate_limit_exceeded" || statusCode === 429) {
    return { code: "CAMPAIGN_RATE_LIMIT", retryAt: retryAtFromHeader(retryAfter, now) };
  }
  if (
    code === "concurrent_idempotent_requests" ||
    (code === "application_error" && statusCode == null) ||
    (typeof statusCode === "number" && statusCode >= 500)
  ) {
    return { code: "CAMPAIGN_DELIVERY_UNCERTAIN", retryAt: retryAtFromHeader(retryAfter, now) };
  }
  return null;
}
