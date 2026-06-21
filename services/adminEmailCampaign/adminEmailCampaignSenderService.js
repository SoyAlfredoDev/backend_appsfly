import {
    getPlatformEmailDomain,
    getDefaultSenderFrom,
    formatSenderFrom,
} from "../../emails/core/emailFrom.js";

/**
 * Remitentes por campaña (mismo dominio, distintas cuentas) para distribuir envíos.
 */

export { getPlatformEmailDomain, getDefaultSenderFrom, formatSenderFrom };

export function isAllowedSenderEmail(email) {
    if (!email || typeof email !== "string") return false;
    const normalized = email.trim().toLowerCase();
    const at = normalized.lastIndexOf("@");
    if (at <= 0 || at === normalized.length - 1) return false;
    const local = normalized.slice(0, at);
    const domain = normalized.slice(at + 1);
    if (!local || local.includes("@")) return false;
    return domain === getPlatformEmailDomain();
}

export function normalizeSenderEmail(email) {
    if (!email) return null;
    const normalized = email.trim().toLowerCase();
    return isAllowedSenderEmail(normalized) ? normalized : null;
}

export function resolveCampaignSenderFrom(campaign) {
    const email = normalizeSenderEmail(campaign?.senderEmail);
    if (email) {
        return formatSenderFrom(campaign?.senderName, email);
    }
    return getDefaultSenderFrom();
}

export function getSenderMetadata() {
    return {
        domain: getPlatformEmailDomain(),
        defaultFrom: getDefaultSenderFrom(),
    };
}
