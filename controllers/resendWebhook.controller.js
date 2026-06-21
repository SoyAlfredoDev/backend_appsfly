import { Webhook } from "svix";
import { processResendEmailWebhookEvent } from "../services/adminEmailCampaign/adminEmailCampaignResendWebhookService.js";

function isProductionEnvironment() {
    return (
        process.env.APP_ENV === "production"
        || process.env.NODE_ENV === "production"
        || process.env.VERCEL === "1"
    );
}

/**
 * Webhook Resend — entrega, rebotes y aperturas de campañas de email.
 * Requiere body raw (registrado antes de express.json en app.js).
 */
export const resendWebhookController = async (req, res) => {
    const secret = process.env.RESEND_WEBHOOK_SECRET?.trim();
    const rawBody =
        Buffer.isBuffer(req.body) ? req.body.toString("utf8") : String(req.body ?? "");

    let payload;

    if (secret) {
        try {
            const wh = new Webhook(secret);
            payload = wh.verify(rawBody, {
                "svix-id": req.headers["svix-id"],
                "svix-timestamp": req.headers["svix-timestamp"],
                "svix-signature": req.headers["svix-signature"],
            });
        } catch (error) {
            console.warn("[resend-webhook] Firma inválida:", error.message);
            if (isProductionEnvironment()) {
                return res.status(401).json({ received: false, error: "Invalid signature" });
            }
            try {
                payload = JSON.parse(rawBody);
            } catch {
                return res.status(400).json({ received: false, error: "Invalid payload" });
            }
        }
    } else {
        console.warn("[resend-webhook] RESEND_WEBHOOK_SECRET no configurado; firma omitida.");
        try {
            payload = JSON.parse(rawBody);
        } catch {
            return res.status(400).json({ received: false, error: "Invalid payload" });
        }
    }

    res.status(200).json({ received: true });

    setImmediate(() => {
        processResendEmailWebhookEvent(payload).catch((error) => {
            console.error("[resend-webhook] Error procesando evento:", error);
        });
    });
};
