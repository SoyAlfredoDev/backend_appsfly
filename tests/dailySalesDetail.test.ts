import { describe, expect, it } from "vitest";
import { applyHourlySale, businessDayBoundsUtc, closureDayKey } from "../libs/businessTimezone.js";

describe("daily closure detail dates", () => {
  it("keeps the calendar day from legacy timestamp text", () => {
    expect(closureDayKey("2026-10-08")).toBe("2026-10-08");
    expect(closureDayKey("2026-10-08T03:00:00.000Z")).toBe("2026-10-08");
    expect(closureDayKey("2026-10-08 00:00:00")).toBe("2026-10-08");
    expect(closureDayKey("")).toBe("");
  });

  it("does not include the previous hour when Santiago skips midnight", () => {
    const previous = businessDayBoundsUtc("2025-09-06", "America/Santiago");
    const current = businessDayBoundsUtc("2025-09-07", "America/Santiago");
    expect(previous.endExclusive.toISOString()).toBe("2025-09-07T04:00:00.000Z");
    expect(current.start).toEqual(previous.endExclusive);
    expect(current.endExclusive.toISOString()).toBe("2025-09-08T03:00:00.000Z");
    expect(businessDayBoundsUtc("2026-11-12", "America/Santiago").start.toISOString()).toBe(
      "2026-11-12T03:00:00.000Z",
    );
  });

  it("ignores an hour outside the daily buckets", () => {
    const hourlySales = Array.from({ length: 24 }, (_, hour) => ({
      hour,
      total: 0,
      count: 0,
    }));

    applyHourlySale(hourlySales, 15, 12000);
    applyHourlySale(hourlySales, Number.NaN, 5000);
    applyHourlySale(hourlySales, 24, 5000);

    expect(hourlySales[15]).toMatchObject({ total: 12000, count: 1 });
    expect(hourlySales.reduce((sum, bucket) => sum + bucket.total, 0)).toBe(12000);
  });
});
