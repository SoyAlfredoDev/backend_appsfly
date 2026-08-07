import {
    extractWebhookNotification,
    verifyMercadoPagoWebhookSignature,
} from "../services/mercadopago/mpWebhookSignature.js";
import { processMercadoPagoWebhookNotification } from "../services/mercadopago/mpWebhookProcessor.js";

function isProductionEnvironment() {
    return (
        process.env.APP_ENV === "production"
        || process.env.NODE_ENV === "production"
        || process.env.VERCEL === "1"
    );
}

/**
 * Webhook IPN Mercado Pago — protegido por x-signature.
 *
 * Importante (Vercel/serverless): NO usar setImmediate tras el 200.
 * El runtime congela la función al responder y se perdían renovaciones.
 * Procesamos inline y luego respondemos 200.
 */
export const mercadoPagoWebhookController = async (req, res) => {
    const notification = extractWebhookNotification(req);
    const xSignature = req.headers["x-signature"];
    const xRequestId = req.headers["x-request-id"];

    const signatureResult = verifyMercadoPagoWebhookSignature({
        xSignature,
        xRequestId,
        dataId: notification.resourceId
            ?? req.query?.["data.id"]
            ?? req.query?.id,
    });

    if (!signatureResult.skipped && !signatureResult.valid) {
        console.warn("[webhook] Firma inválida:", signatureResult.reason, {
            topic: notification.topic,
            resourceId: notification.resourceId,
        });
        if (isProductionEnvironment()) {
            return res.status(401).json({ received: false, error: "Invalid signature" });
        }
    }

    if (signatureResult.skipped) {
        console.warn("[webhook] Validación de firma omitida (MERCADO_PAGO_WEBHOOK_SECRET no configurado).");
    }

    try {
        const result = await processMercadoPagoWebhookNotification({
            topic: notification.topic,
            action: notification.action,
            resourceId: notification.resourceId,
        });

        return res.status(200).json({
            received: true,
            id: notification.resourceId,
            reason: result?.reason ?? null,
        });
    } catch (error) {
        console.error("[webhook] Error procesando notificación Mercado Pago:", error);
        // 200 para no spamear reintentos por errores de aplicación; el log queda para auditoría.
        return res.status(200).json({
            received: true,
            id: notification.resourceId,
            error: "PROCESSING_FAILED",
        });
    }
};
