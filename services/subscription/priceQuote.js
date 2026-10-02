// Generated from services/subscription/priceQuote.ts by npm run build:runtime.
import { getPlanPricing } from "../../libs/planPricing.js";
import { contractedUfPrice } from "./planPolicy.js";
import { fetchOfficialUfRate } from "./ufRate.js";
export async function quotePlanPrice(plan, at = new Date(), loadUf = fetchOfficialUfRate) {
    if (plan.planCurrency !== "UF") {
        const pricing = getPlanPricing(plan.planPrice);
        if (pricing.net <= 0)
            throw new Error("PLAN_PRICE_INVALID");
        return { ...pricing, currency: plan.planCurrency || "CLP", priceUf: null, ufRate: null };
    }
    const priceUf = contractedUfPrice(plan, at);
    if (priceUf === null)
        throw new Error("PLAN_PRICE_INVALID");
    const ufRate = await loadUf(at);
    const pricing = getPlanPricing(Math.round(priceUf * ufRate.valueClp));
    return { ...pricing, currency: "CLP", priceUf, ufRate };
}
