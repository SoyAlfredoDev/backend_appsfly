import { getPlanPricing } from "../../libs/planPricing.js";
import { contractedUfPrice } from "./planPolicy.js";
import { fetchOfficialUfRate } from "./ufRate.js";

type PricePlan = {
  planCurrency?: string | null;
  planPrice?: number | null;
  planListPriceUf?: unknown;
  planOfferPriceUf?: unknown;
  planOfferEndsAt?: Date | string | null;
};

export async function quotePlanPrice(
  plan: PricePlan,
  at: Date = new Date(),
  loadUf = fetchOfficialUfRate,
) {
  if (plan.planCurrency !== "UF") {
    const pricing = getPlanPricing(plan.planPrice);
    if (pricing.net <= 0) throw new Error("PLAN_PRICE_INVALID");
    return { ...pricing, currency: plan.planCurrency || "CLP", priceUf: null, ufRate: null };
  }

  const priceUf = contractedUfPrice(plan, at);
  if (priceUf === null) throw new Error("PLAN_PRICE_INVALID");
  const ufRate = await loadUf(at);
  const pricing = getPlanPricing(Math.round(priceUf * ufRate.valueClp));
  return { ...pricing, currency: "CLP", priceUf, ufRate };
}
