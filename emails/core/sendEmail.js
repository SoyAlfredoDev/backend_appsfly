import { Resend } from "resend";
import dotenv from "dotenv";
import { getDefaultSenderFrom } from "./emailFrom.js";

dotenv.config();

function getResend() {
    const apiKey = process.env.RESEND_API_KEY?.trim();
    if (!apiKey) return null;
    return new Resend(apiKey);
}

/**
 * En producción el correo siempre se entrega. En desarrollo y test requiere
 * activación explícita para evitar envíos reales desde datos de prueba.
 * @param {NodeJS.ProcessEnv} env
 */
export const shouldDeliverExternalEmail = (env = process.env) => {
    const appEnv = env.APP_ENV || env.NODE_ENV || "development";
    return appEnv === "production" || env.EMAIL_DELIVERY_ENABLED === "true";
};

export const sendEmail = async ({ to, subject, html, text, from, replyTo, attachments, tags }) => {
    if (!shouldDeliverExternalEmail()) {
        console.info(
            "[email] Entrega externa omitida fuera de producción. Define EMAIL_DELIVERY_ENABLED=true para habilitarla.",
        );
        return { id: null, skipped: true, reason: "EMAIL_DELIVERY_DISABLED" };
    }

    try {
        const payload = {
            from: from?.trim() || getDefaultSenderFrom(),
            to,
            subject,
            html,
            text,
        };

        if (replyTo?.trim()) {
            payload.reply_to = replyTo.trim();
        }

        if (attachments?.length) {
            payload.attachments = attachments.map((file) => ({
                filename: file.filename,
                content: Buffer.isBuffer(file.content)
                    ? file.content.toString("base64")
                    : file.content,
            }));
        }

        if (tags && typeof tags === "object" && Object.keys(tags).length > 0) {
            payload.tags = Object.entries(tags).map(([name, value]) => ({
                name,
                value: String(value),
            }));
        }

        const resend = getResend();
        if (!resend) {
            throw new Error("RESEND_API_KEY is not configured.");
        }

        const { data, error } = await resend.emails.send(payload);

        if (error) {
            console.error("Error sending email:", error);
            throw new Error(error.message);
        }

        return data;
    } catch (error) {
        console.error("Resend service error:", error);
        throw error;
    }
};
