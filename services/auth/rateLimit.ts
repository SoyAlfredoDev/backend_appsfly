type RateLimitRequest = {
  headers: Record<string, unknown>;
  ip?: string;
};

type RateLimitResponse = {
  status: (code: number) => { json: (body: unknown) => unknown };
};

type Bucket = { start: number; count: number };

export function createRateLimiter(
  options: { windowMs: number; max: number },
  now: () => number = Date.now,
) {
  const buckets = new Map<string, Bucket>();

  return function rateLimiter(req: RateLimitRequest, res: RateLimitResponse, next: () => void) {
    const header = req.headers["x-forwarded-for"];
    const forwarded = Array.isArray(header) ? header[0] : header;
    const ip =
      (typeof forwarded === "string" ? forwarded.split(",")[0]?.trim() : "") || req.ip || "unknown";

    const current = now();
    const existing = buckets.get(ip);
    if (!existing || current - existing.start >= options.windowMs) {
      buckets.set(ip, { start: current, count: 1 });
      next();
      return;
    }

    existing.count += 1;
    if (existing.count > options.max) {
      res.status(429).json({
        message: "Demasiadas solicitudes. Intenta más tarde.",
        code: "RATE_LIMITED",
      });
      return;
    }

    next();
  };
}

export const authRateLimit = createRateLimiter({ windowMs: 15 * 60 * 1000, max: 30 });
