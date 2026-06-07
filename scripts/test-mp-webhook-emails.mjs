/**
 * Prueba del módulo Webhook MP: firma x-signature + envío dual de correos.
 *
 * Uso:
 *   node scripts/test-mp-webhook-emails.mjs
 *   node scripts/test-mp-webhook-emails.mjs --webhook   # además POST al servidor local
 */
import crypto from "crypto";
import dotenv from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, "../.env") });

import {
    buildMercadoPagoSignatureManifest,
    verifyMercadoPagoWebhookSignature,
} from "../services/mercadopago/mpWebhookSignature.js";
import { sendDualSubscriptionPaymentEmails } from "../emails/dispatchers/subscriptionPayment.dispatcher.js";
import { PrismaClient as PrismaGeneral } from "../src/generated/general/index.js";

const general = new PrismaGeneral();
const runWebhookHttp = process.argv.includes("--webhook");

function assert(condition, message) {
    if (!condition) throw new Error(message);
}

async function testSignatureValidation() {
    const secret = process.env.MERCADO_PAGO_WEBHOOK_SECRET?.trim();
    console.log("\n── 1. Validación x-signature ──");

    if (!secret) {
        console.warn("⚠ MERCADO_PAGO_WEBHOOK_SECRET no está en backend/.env — agrégalo desde el panel MP.");
        return false;
    }

    const dataId = "123456789";
    const xRequestId = crypto.randomUUID();
    const ts = String(Math.floor(Date.now() / 1000));
    const manifest = buildMercadoPagoSignatureManifest({ dataId, xRequestId, ts });
    const v1 = crypto.createHmac("sha256", secret).update(manifest).digest("hex");
    const xSignature = `ts=${ts},v1=${v1}`;

    const ok = verifyMercadoPagoWebhookSignature({
        xSignature,
        xRequestId,
        dataId,
        secret,
    });
    assert(ok.valid === true, "La firma generada debería ser válida");
    console.log("✓ Firma HMAC-SHA256 válida");

    const bad = verifyMercadoPagoWebhookSignature({
        xSignature: `ts=${ts},v1=0000000000000000000000000000000000000000000000000000000000000000`,
        xRequestId,
        dataId,
        secret,
    });
    assert(bad.valid === false, "Firma incorrecta debería fallar");
    console.log("✓ Firma inválida rechazada correctamente");
    return true;
}

async function loadLatestApprovedPaymentContext() {
    const payment = await general.subscriptionPayment.findFirst({
        where: { status: "APPROVED" },
        orderBy: { createdAt: "desc" },
        include: {
            business: true,
            plan: true,
            subscription: true,
            createdBy: {
                select: {
                    userFirstName: true,
                    userLastName: true,
                    userEmail: true,
                },
            },
        },
    });
    return payment;
}

async function testDualEmails() {
    console.log("\n── 2. Envío dual de correos (cliente + admin) ──");

    if (!process.env.RESEND_API_KEY?.trim()) {
        console.warn("⚠ RESEND_API_KEY no configurada — se omite envío real.");
        return false;
    }

    let payment = await loadLatestApprovedPaymentContext();

    const mockContext = payment
        ? {
            user: payment.createdBy,
            business: payment.business,
            plan: payment.plan,
            amount: payment.amount,
            currency: payment.currency,
            paymentMethod: payment.paymentMethod,
            transactionId: payment.mpPaymentId || payment.subscriptionPaymentId,
            subscriptionEndDate: payment.subscription?.subscriptionEndDate ?? new Date(),
            eventType: "test.webhook.payment.approved",
        }
        : {
            user: {
                userFirstName: "Alfredo",
                userLastName: "Hurtado",
                userEmail: process.env.TEST_CUSTOMER_EMAIL?.trim() || "appsfly.cl@gmail.com",
            },
            business: {
                businessId: "TEST-BUSINESS-ID",
                businessName: "Negocio de Prueba AppsFly",
            },
            plan: {
                planId: "P002",
                planName: "Plan Profesional",
            },
            amount: 19990,
            currency: "CLP",
            paymentMethod: "MERCADO_PAGO",
            transactionId: `TEST-MP-${Date.now()}`,
            subscriptionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            eventType: "test.webhook.payment.approved",
        };

    console.log(`   Cliente: ${mockContext.user.userEmail}`);
    console.log(`   Admin:   ${process.env.APPSFLY_ADMIN_EMAIL?.trim() || "appsfly.cl@gmail.com"}`);

    await sendDualSubscriptionPaymentEmails(mockContext);
    console.log("✓ Correos enviados (revisa bandeja de entrada y spam)");
    return true;
}

async function testWebhookHttpEndpoint() {
    console.log("\n── 3. POST webhook local ──");

    const secret = process.env.MERCADO_PAGO_WEBHOOK_SECRET?.trim();
    const baseUrl = process.env.BACKEND_URL || "http://localhost:3000";
    const dataId = "999888777";
    const xRequestId = crypto.randomUUID();
    const ts = String(Math.floor(Date.now() / 1000));

    let xSignature = "";
    if (secret) {
        const manifest = buildMercadoPagoSignatureManifest({ dataId, xRequestId, ts });
        const v1 = crypto.createHmac("sha256", secret).update(manifest).digest("hex");
        xSignature = `ts=${ts},v1=${v1}`;
    }

    const url = `${baseUrl}/api/webhooks/mercadopago?data.id=${dataId}&type=payment`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-signature": xSignature,
                "x-request-id": xRequestId,
            },
            body: JSON.stringify({
                type: "payment",
                action: "payment.created",
                data: { id: dataId },
                live_mode: false,
            }),
        });

        const body = await response.json();
        console.log(`   Status: ${response.status}`, body);

        if (response.status === 200) {
            console.log("✓ Endpoint respondió 200 OK");
            return true;
        }
        console.warn("⚠ El servidor no respondió 200 — ¿está corriendo en puerto 3000?");
        return false;
    } catch (error) {
        console.warn(`⚠ No se pudo conectar a ${baseUrl}: ${error.message}`);
        console.warn("  Inicia el backend con: npm run dev");
        return false;
    }
}

async function main() {
    console.log("AppsFly — Test Webhook MP + Correos");
    console.log("====================================");

    const results = {
        signature: await testSignatureValidation(),
        emails: await testDualEmails(),
        http: runWebhookHttp ? await testWebhookHttpEndpoint() : null,
    };

    console.log("\n── Resumen ──");
    console.log(`Firma x-signature: ${results.signature ? "OK" : "PENDIENTE (falta MERCADO_PAGO_WEBHOOK_SECRET)"}`);
    console.log(`Correos duales:    ${results.emails ? "OK" : "FALLÓ o omitido"}`);
    if (runWebhookHttp) {
        console.log(`HTTP webhook:      ${results.http ? "OK" : "FALLÓ (servidor apagado o error)"}`);
    } else {
        console.log("HTTP webhook:      omitido (usa --webhook para probar el endpoint)");
    }

    await general.$disconnect();
}

main().catch(async (error) => {
    console.error("\n✗ Error en prueba:", error.message);
    await general.$disconnect();
    process.exit(1);
});
