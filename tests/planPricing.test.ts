import { describe, expect, it } from "vitest";
import { contractedUfPrice, hasPlanCapability } from "../services/subscription/planPolicy.js";
import { quotePlanPrice } from "../services/subscription/priceQuote.js";
import { parseUfValue } from "../services/subscription/ufRate.js";

const plan = {
  planCurrency: "UF",
  planListPriceUf: 1.2,
  planOfferPriceUf: 1,
  planOfferEndsAt: new Date("2027-01-01T03:00:00.000Z"),
};

describe("optics plan pricing and entitlements", () => {
  it("locks the promotional UF price before the end of the offer", () => {
    expect(contractedUfPrice(plan, new Date("2026-12-31T23:00:00.000Z"))).toBe(1);
    expect(contractedUfPrice(plan, new Date("2027-01-01T03:00:00.000Z"))).toBe(1.2);
  });

  it("quotes the contracted UF rate in pesos with IVA", async () => {
    const quote = await quotePlanPrice(plan, new Date("2026-10-02T12:00:00.000Z"), async () => ({
      date: "2026-10-02",
      valueClp: 40000,
      source: "CMF" as const,
    }));
    expect(quote).toMatchObject({ currency: "CLP", priceUf: 1, net: 40000, total: 47600 });
  });

  it("rejects malformed UF values and denied features", () => {
    expect(parseUfValue("40.123,45")).toBe(40123.45);
    expect(() => parseUfValue("40123.45")).toThrow("UF_RATE_INVALID");
    expect(
      hasPlanCapability({ modules: ["inventory"], maxUsers: 1, maxBranches: 1 }, "reports"),
    ).toBe(false);
  });
});
