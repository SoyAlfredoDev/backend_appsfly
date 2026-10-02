import { generalPrisma as general } from "../../dbGeneral.js";
import { getPlanPricing } from "../../libs/planPricing.js";
import { getMercadoPagoPreapproval, updateMercadoPagoPreapproval } from "../mercadopago/mpApiClient.js";
import { fetchOfficialUfRate } from "./ufRate.js";

/** Runs before Mercado Pago's next billing time; repeated calls are idempotent per billing day. */
export async function repriceUpcomingUfRenewals({
    now = new Date(),
    limit = 100,
    client = general,
    loadUf = fetchOfficialUfRate,
    getPreapproval = getMercadoPagoPreapproval,
    updatePreapproval = updateMercadoPagoPreapproval,
} = {}) {
    if (process.env.UF_REPRICE_ENABLED !== "true") {
        return { enabled: false, scanned: 0, updated: 0, skipped: 0, failed: 0, errors: [] };
    }
    const subscriptions = await client.subscription.findMany({
        where: {
            subscriptionPriceUf: { not: null },
            mpPreapprovalId: { not: null },
            autoRenewEnabled: true,
            subscriptionStatus: "ACTIVE",
        },
        take: limit,
        orderBy: { subscriptionEndDate: "asc" },
    });
    const summary = { enabled: true, scanned: subscriptions.length, updated: 0, skipped: 0, failed: 0, errors: [] };

    for (const subscription of subscriptions) {
        try {
            const remote = await getPreapproval(subscription.mpPreapprovalId);
            const nextPaymentDate = new Date(remote.next_payment_date);
            if (
                remote.status !== "authorized" ||
                Number.isNaN(nextPaymentDate.getTime()) ||
                nextPaymentDate <= now ||
                nextPaymentDate.getTime() - now.getTime() > 48 * 60 * 60 * 1000
            ) {
                summary.skipped += 1;
                continue;
            }

            const ufRate = await loadUf(nextPaymentDate);
            const priceUf = Number(subscription.subscriptionPriceUf);
            if (!Number.isFinite(priceUf) || priceUf <= 0) throw new Error("CONTRACTED_UF_PRICE_INVALID");
            const pricing = getPlanPricing(Math.round(priceUf * ufRate.valueClp));
            const previousAmount = Number(remote.auto_recurring?.transaction_amount);
            if (!Number.isFinite(previousAmount) || previousAmount <= 0) throw new Error("MP_AMOUNT_INVALID");

            if (previousAmount !== pricing.total) {
                const changed = await updatePreapproval(subscription.mpPreapprovalId, {
                    amount: pricing.total,
                    currency: "CLP",
                });
                if (Number(changed.auto_recurring?.transaction_amount) !== pricing.total) {
                    throw new Error("MP_AMOUNT_NOT_CONFIRMED");
                }
            }

            await client.subscriptionUfReprice.upsert({
                where: {
                    subscriptionId_billingDate: {
                        subscriptionId: subscription.subscriptionId,
                        billingDate: ufRate.date,
                    },
                },
                create: {
                    subscriptionId: subscription.subscriptionId,
                    billingDate: ufRate.date,
                    priceUf,
                    ufValueClp: ufRate.valueClp,
                    netAmountClp: pricing.net,
                    totalAmountClp: pricing.total,
                    previousAmountClp: previousAmount,
                    mpPreapprovalId: subscription.mpPreapprovalId,
                    mpNextPaymentDate: nextPaymentDate,
                },
                update: {
                    ufValueClp: ufRate.valueClp,
                    netAmountClp: pricing.net,
                    totalAmountClp: pricing.total,
                    mpNextPaymentDate: nextPaymentDate,
                },
            });
            summary.updated += 1;
        } catch (error) {
            summary.failed += 1;
            const known = new Set(["CONTRACTED_UF_PRICE_INVALID", "MP_AMOUNT_INVALID", "MP_AMOUNT_NOT_CONFIRMED", "UF_RATE_UNAVAILABLE", "UF_RATE_NOT_CONFIGURED", "UF_RATE_INVALID"]);
            summary.errors.push({ subscriptionId: subscription.subscriptionId, code: known.has(error?.message) ? error.message : "UF_REPRICE_FAILED" });
        }
    }
    return summary;
}
