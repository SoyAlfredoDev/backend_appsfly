import { describe, expect, it } from "vitest";
import {
  OPTICS_PLANS,
  PLAN_IDS,
  VERTICAL_CATALOGS,
  assertApprovedCheckoutPrice,
  canClaimOpticsTrial,
  isSeatAvailable,
  planIncludesCapability,
  checkoutUrlForPlan,
  publicFeatureLabels,
} from "../services/billing/opticsPlanCatalog.ts";

describe("optics plan catalog", () => {
  it("keeps restaurants empty", () => {
    expect(VERTICAL_CATALOGS.restaurant.enabled).toBe(false);
    expect(VERTICAL_CATALOGS.restaurant.plans).toEqual([]);
  });

  it("charges the confirmed net prices and leaves the trial free", () => {
    const byTier = Object.fromEntries(OPTICS_PLANS.map((plan) => [plan.tier, plan]));
    expect(byTier.start?.price?.netAmount).toBe(24990);
    expect(byTier.pro?.price?.netAmount).toBe(39990);
    expect(byTier.elite?.price?.netAmount).toBe(49990);
    expect(byTier.trial?.price).toBeNull();
    expect(byTier.trial?.planId).toBe(PLAN_IDS.trial);
    expect(byTier.start?.maxUsers).toBe(1);
    expect(byTier.pro?.maxUsers).toBe(5);
    expect(byTier.elite?.maxUsers).toBe(10);
    for (const plan of OPTICS_PLANS.filter((item) => item.billable)) {
      expect(() => assertApprovedCheckoutPrice(plan)).not.toThrow();
    }
    expect(() => assertApprovedCheckoutPrice(byTier.trial!)).toThrow(/tarifa aprobada/);
    expect(() => assertApprovedCheckoutPrice(byTier.elite!)).toThrow(/tarifa aprobada/);
    expect(checkoutUrlForPlan("P005")).toBe("https://mpago.la/1AFYzNQ");
    expect(checkoutUrlForPlan("P006")).toBe("https://mpago.la/2Zet5b1");
    expect(checkoutUrlForPlan("P007")).toBeNull();
    expect(byTier.elite?.forSale).toBe(false);
    expect(byTier.start?.forSale).toBe(true);
    expect(byTier.pro?.forSale).toBe(true);
  });

  it("gives the trial the same capabilities as Pro and withholds branches", () => {
    const trial = OPTICS_PLANS.find((plan) => plan.tier === "trial");
    const pro = OPTICS_PLANS.find((plan) => plan.tier === "pro");
    expect(publicFeatureLabels(trial!)).toEqual(publicFeatureLabels(pro!));
    expect(planIncludesCapability(PLAN_IDS.trial, "appointments")).toBe(true);
    expect(planIncludesCapability(PLAN_IDS.start, "appointments")).toBe(false);
    expect(planIncludesCapability(PLAN_IDS.elite, "branches")).toBe(false);
    expect(publicFeatureLabels(OPTICS_PLANS.find((plan) => plan.tier === "elite")!)).not.toContain(
      "Sucursales",
    );
  });

  it("allows the trial only once and enforces the seat cap", () => {
    expect(canClaimOpticsTrial(0)).toBe(true);
    expect(canClaimOpticsTrial(1)).toBe(false);
    expect(isSeatAvailable({ maxUsers: 1, occupied: 0 })).toBe(true);
    expect(isSeatAvailable({ maxUsers: 1, occupied: 1 })).toBe(false);
    expect(isSeatAvailable({ maxUsers: null, occupied: 9 })).toBe(true);
  });
});
