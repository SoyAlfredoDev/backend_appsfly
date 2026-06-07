import crypto from "crypto";
import { getMercadoPagoWebhookSecret } from "../../config/mercadopagoEnv.js";

/**
 * Extrae ts y v1 del header x-signature de Mercado Pago.
 * @see https://www.mercadopago.cl/developers/es/docs/your-integrations/notifications/webhooks
 */
export function parseMercadoPagoSignatureHeader(xSignature) {
    if (!xSignature || typeof xSignature !== "string") {
        return { ts: null, v1: null };
    }

    let ts = null;
    let v1 = null;

    for (const part of xSignature.split(",")) {
        const [key, ...rest] = part.split("=");
        const value = rest.join("=").trim();
        const trimmedKey = key?.trim();
        if (trimmedKey === "ts") ts = value;
        if (trimmedKey === "v1") v1 = value;
    }

    return { ts, v1 };
}

function normalizeDataIdForManifest(dataId) {
    if (!dataId) return "";
    const id = String(dataId);
    return /^[a-zA-Z0-9]+$/.test(id) ? id.toLowerCase() : id;
}

/**
 * Construye el manifest oficial MP: id:...;request-id:...;ts:...;
 */
export function buildMercadoPagoSignatureManifest({ dataId, xRequestId, ts }) {
    const parts = [];
    if (dataId) parts.push(`id:${normalizeDataIdForManifest(dataId)}`);
    if (xRequestId) parts.push(`request-id:${xRequestId}`);
    if (ts) parts.push(`ts:${ts}`);
    return `${parts.join(";")};`;
}

/**
 * Valida HMAC-SHA256 del webhook contra el secreto configurado en el panel MP.
 */
export function verifyMercadoPagoWebhookSignature({
    xSignature,
    xRequestId,
    dataId,
    secret = getMercadoPagoWebhookSecret(),
}) {
    if (!secret) {
        return { valid: true, skipped: true, reason: "WEBHOOK_SECRET_NOT_CONFIGURED" };
    }

    const { ts, v1 } = parseMercadoPagoSignatureHeader(xSignature);
    if (!ts || !v1) {
        return { valid: false, skipped: false, reason: "MISSING_SIGNATURE_PARTS" };
    }

    const manifest = buildMercadoPagoSignatureManifest({ dataId, xRequestId, ts });
    const computed = crypto.createHmac("sha256", secret).update(manifest).digest("hex");

    return {
        valid: computed === v1,
        skipped: false,
        reason: computed === v1 ? "OK" : "SIGNATURE_MISMATCH",
    };
}

/**
 * Normaliza topic, action e ID del recurso desde query (IPN) o body (Webhooks).
 */
export function extractWebhookNotification(req) {
    const topic =
        req.query?.topic
        || req.query?.type
        || req.body?.type
        || req.body?.topic
        || null;

    const action = req.body?.action || null;

    const rawId =
        req.query?.["data.id"]
        ?? req.query?.id
        ?? req.body?.data?.id
        ?? req.body?.id
        ?? null;

    return {
        topic: topic ? String(topic) : null,
        action: action ? String(action) : null,
        resourceId: rawId != null ? String(rawId) : null,
        liveMode: Boolean(req.body?.live_mode),
    };
}
