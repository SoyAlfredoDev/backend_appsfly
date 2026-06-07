/**
 * E2E Mercado Pago — checkout + tarjeta sandbox APRO (Chile).
 * Uso: node scripts/e2e-mp-payment-test.mjs
 */
import dotenv from "dotenv";
import { randomUUID } from "crypto";
import { PrismaClient } from "../src/generated/general/index.js";

dotenv.config();

const prisma = new PrismaClient();
const API = process.env.BACKEND_URL || "http://localhost:3000";
const MP_TOKEN = process.env.MERCADO_PAGO_ACCESS_TOKEN?.trim();

const SANDBOX_CARD = {
    card_number: "5031753573450604",
    expiration_year: "2030",
    expiration_month: "11",
    security_code: "123",
    cardholder: {
        name: "APRO",
        identification: { type: "RUT", number: "111111111" },
    },
};

async function findTestContext({ forceExpire = false } = {}) {
    const subs = await prisma.subscription.findMany({
        include: { business: true, plan: true },
        orderBy: { subscriptionEndDate: "desc" },
    });

    const now = new Date();
    const byBusiness = new Map();

    for (const sub of subs) {
        const bid = sub.subscriptionBusinessId;
        if (!byBusiness.has(bid)) byBusiness.set(bid, []);
        byBusiness.get(bid).push(sub);
    }

    for (const [businessId, businessSubs] of byBusiness) {
        const hasActive = businessSubs.some((sub) => {
            const end = new Date(sub.subscriptionEndDate);
            return sub.subscriptionStatus === "ACTIVE" && end > now;
        });

        if (hasActive && !forceExpire) continue;

        const ub = await prisma.userBusiness.findFirst({
            where: { userBusinessBusinessId: businessId },
            include: { User: true, Business: true },
        });
        if (!ub?.User) continue;

        let restoreEndDate = null;
        let restoreSubId = null;

        if (hasActive && forceExpire) {
            const activeSub = businessSubs.find((sub) => {
                const end = new Date(sub.subscriptionEndDate);
                return sub.subscriptionStatus === "ACTIVE" && end > now;
            });
            if (activeSub) {
                restoreSubId = activeSub.subscriptionId;
                restoreEndDate = activeSub.subscriptionEndDate;
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                await prisma.subscription.update({
                    where: { subscriptionId: activeSub.subscriptionId },
                    data: { subscriptionEndDate: yesterday },
                });
                console.log(
                    "⚠ Modo prueba: suscripción vencida temporalmente hasta",
                    yesterday.toISOString().slice(0, 10),
                );
            }
        }

        return {
            userId: ub.User.userId,
            userEmail: ub.User.userEmail,
            businessId,
            businessName: ub.Business?.businessName,
            restoreSubId,
            restoreEndDate,
        };
    }

    throw new Error(
        "No hay negocio disponible para probar checkout.",
    );
}

async function createJwt(userId) {
    const { createAccessToken } = await import("../libs/jwt.js");
    return createAccessToken({ id: userId });
}

async function createCardToken() {
    const res = await fetch("https://api.mercadopago.com/v1/card_tokens", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${MP_TOKEN}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(SANDBOX_CARD),
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(`card_token: ${data.message || JSON.stringify(data)}`);
    }
    return data;
}

async function api(path, { method = "GET", token, body } = {}) {
    const res = await fetch(`${API}/api${path}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: body ? JSON.stringify(body) : undefined,
    });
    const data = await res.json().catch(() => ({}));
    return { status: res.status, data };
}

async function main() {
    console.log("=== E2E Mercado Pago AppsFly ===\n");

    const forceExpire = process.argv.includes("--force-expire");

    if (!MP_TOKEN) {
        throw new Error("Falta MERCADO_PAGO_ACCESS_TOKEN en backend/.env");
    }

    const ctx = await findTestContext({ forceExpire });
    console.log("Usuario:", ctx.userEmail);
    console.log("Negocio:", ctx.businessName, `(${ctx.businessId})`);

    const paidPlan = await prisma.plan.findFirst({
        where: { planActive: { not: false }, planPrice: { gt: 0 } },
    });
    if (!paidPlan) throw new Error("No hay plan de pago activo en BD.");

    console.log("Plan:", paidPlan.planName, `$${paidPlan.planPrice} ${paidPlan.planCurrency || "CLP"}\n`);

    const token = await createJwt(ctx.userId);
    const subscriptionId = randomUUID();

    // 1. Checkout
    console.log("1) POST /subscriptions/checkout …");
    const checkout = await api("/subscriptions/checkout", {
        method: "POST",
        token,
        body: {
            subscriptionId,
            subscriptionBusinessId: ctx.businessId,
            subscriptionPlanId: paidPlan.planId,
        },
    });

    if (checkout.status !== 201) {
        console.error("Checkout falló:", checkout.status, checkout.data);
        process.exit(1);
    }

    const { paymentId, preferenceId, amount } = checkout.data;
    console.log("   ✓ paymentId:", paymentId);
    console.log("   ✓ preferenceId:", preferenceId);
    console.log("   ✓ amount:", amount);

    // 2. Card token
    console.log("\n2) Crear token tarjeta sandbox APRO …");
    const cardToken = await createCardToken();
    console.log("   ✓ token:", cardToken.id?.slice(0, 20) + "…");

    // 3. Process payment (simula Payment Brick onSubmit)
    console.log("\n3) POST /subscriptions/process-payment …");
    const formData = {
        token: cardToken.id,
        transaction_amount: Number(amount),
        installments: 1,
        payment_method_id: cardToken.payment_method_id || "master",
        issuer_id: cardToken.issuer_id,
        payer: {
            email: ctx.userEmail,
            identification: { type: "RUT", number: "111111111" },
        },
    };

    const payment = await api("/subscriptions/process-payment", {
        method: "POST",
        token,
        body: {
            subscriptionPaymentId: paymentId,
            formData,
            selectedPaymentMethod: "credit_card",
        },
    });

    if (payment.status !== 200) {
        console.error("Process-payment falló:", payment.status, payment.data);
        process.exit(1);
    }

    const payStatus = payment.data?.payment?.status;
    const subId = payment.data?.subscription?.subscriptionId;
    const mpStatus = payment.data?.mpPayment?.status;

    console.log("   ✓ payment.status:", payStatus);
    console.log("   ✓ mpPayment.status:", mpStatus);
    console.log("   ✓ subscriptionId:", subId || "(null)");

    // 4. Verify DB
    console.log("\n4) Verificar registro en BD …");
    const record = await prisma.subscriptionPayment.findUnique({
        where: { subscriptionPaymentId: paymentId },
        include: { subscription: true },
    });

    console.log("   ✓ DB status:", record?.status);
    console.log("   ✓ mpPaymentId:", record?.mpPaymentId);
    console.log("   ✓ subscription linked:", record?.subscriptionId);

    const success = payStatus === "APPROVED" && record?.status === "APPROVED" && record?.subscriptionId;

    console.log("\n=== RESULTADO:", success ? "✅ PAGO APROBADO — flujo OK" : "❌ FALLO ===");

    if (ctx.restoreSubId) {
        if (success) {
            await prisma.subscription.update({
                where: { subscriptionId: ctx.restoreSubId },
                data: { subscriptionStatus: "EXPIRED" },
            });
            console.log("↩ Suscripción anterior marcada EXPIRED (nueva suscripción MP activa).");
        } else if (ctx.restoreEndDate) {
            await prisma.subscription.update({
                where: { subscriptionId: ctx.restoreSubId },
                data: { subscriptionEndDate: ctx.restoreEndDate },
            });
            console.log(
                "↩ Suscripción original restaurada:",
                ctx.restoreEndDate.toISOString().slice(0, 10),
            );
        }
    }

    if (!success) process.exit(1);
}

main()
    .catch((err) => {
        console.error("\n❌ Error:", err.message);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
