/**
 * Inserta registros de auditoría de ejemplo si la tabla está vacía.
 * Uso: node scripts/seedSubscriptionPayments.js
 */
import dotenv from "dotenv";
import { PrismaClient } from "../src/generated/general/index.js";

dotenv.config();

const prisma = new PrismaClient();

async function main() {
    const existing = await prisma.subscriptionPayment.count();
    if (existing > 0) {
        console.log(`SubscriptionPayment ya tiene ${existing} registros. Omitiendo seed.`);
        return;
    }

    const subscription = await prisma.subscription.findFirst({
        include: {
            business: true,
            plan: true,
        },
        orderBy: { createdAt: "desc" },
    });

    if (!subscription) {
        console.log("No hay suscripciones para generar pagos de ejemplo.");
        return;
    }

    await prisma.subscriptionPayment.create({
        data: {
            subscriptionId: subscription.subscriptionId,
            subscriptionBusinessId: subscription.subscriptionBusinessId,
            subscriptionPlanId: subscription.subscriptionPlanId,
            amount: subscription.subscriptionAmount,
            currency: "CLP",
            paymentMethod:
                subscription.subscriptionPaymentMethod === "PROMO_FREE_TRIAL"
                || subscription.subscriptionAmount === 0
                    ? "PROMO_FREE_TRIAL"
                    : "MERCADO_PAGO",
            status: "APPROVED",
            externalReference: subscription.subscriptionId,
            createdByUserId: subscription.createdByUserId,
            metadata: { source: "seed_script" },
        },
    });

    const paidPlan = await prisma.plan.findFirst({
        where: { planPrice: { gt: 0 } },
    });

    if (paidPlan) {
        await prisma.subscriptionPayment.create({
            data: {
                subscriptionBusinessId: subscription.subscriptionBusinessId,
                subscriptionPlanId: paidPlan.planId,
                amount: paidPlan.planPrice,
                currency: paidPlan.planCurrency || "CLP",
                paymentMethod: "MERCADO_PAGO",
                status: "APPROVED",
                mpPaymentId: "MP-SEED-0001",
                externalReference: "seed-mp-payment",
                createdByUserId: subscription.createdByUserId,
                metadata: { source: "seed_script", simulated: true },
            },
        });
    }

    await prisma.subscriptionPayment.create({
        data: {
            subscriptionBusinessId: subscription.subscriptionBusinessId,
            subscriptionPlanId: subscription.subscriptionPlanId,
            amount: 0,
            currency: "CLP",
            paymentMethod: "PROMO_FREE_TRIAL",
            status: "APPROVED",
            externalReference: "seed-promo-payment",
            createdByUserId: subscription.createdByUserId,
            metadata: { source: "seed_script", promo: "P001" },
        },
    });

    console.log("✓ Pagos de ejemplo insertados.");
}

main()
    .catch((err) => {
        console.error(err);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
