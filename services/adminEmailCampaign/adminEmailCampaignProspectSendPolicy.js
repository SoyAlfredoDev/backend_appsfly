import { formatSenderFrom, getPlatformEmailDomain } from "../../emails/core/emailFrom.js";
import {
    PROSPECT_OUTREACH_DEFAULT_MAX_PER_RUN,
} from "./adminEmailCampaignConstants.js";

function getProspectSenderPool() {
    return [{ email: `novedades@${getPlatformEmailDomain()}`, name: "AppsFly Novedades" }];
}

function envInt(name, fallback) {
    const n = Number(process.env[name]);
    return Number.isFinite(n) && n > 0 ? Math.floor(n) : fallback;
}

export function getProspectOutreachLimits() {
    return {
        maxPerRun: envInt("PROSPECT_OUTREACH_MAX_PER_RUN", PROSPECT_OUTREACH_DEFAULT_MAX_PER_RUN),
        maxPerSender: envInt("PROSPECT_OUTREACH_MAX_PER_SENDER", PROSPECT_OUTREACH_DEFAULT_MAX_PER_RUN),
        sendDelayMs: envInt("PROSPECT_OUTREACH_SEND_DELAY_MS", 180),
        senderPool: getProspectSenderPool(),
    };
}

export function isProspectOutreachCampaign(campaign) {
    return campaign?.audienceType === "PLATFORM_PROSPECTS";
}

/**
 * Limita el batch de envío y devuelve metadatos para el reporte.
 */
export function prepareProspectOutreachBatch(recipients, campaign) {
    const limits = getProspectOutreachLimits();
    const totalEligible = recipients.length;
    const batch = recipients.slice(0, limits.maxPerRun);
    const deferredCount = Math.max(0, totalEligible - batch.length);

    const meta = {
        prospectOutreach: true,
        totalEligible,
        sentThisRun: batch.length,
        deferredCount,
        maxPerRun: limits.maxPerRun,
        maxPerSender: limits.maxPerSender,
        sendDelayMs: limits.sendDelayMs,
        senderRotation: limits.senderPool.map((s) => s.email),
        primarySender: campaign?.senderEmail ?? limits.senderPool[0].email,
    };

    if (deferredCount > 0) {
        meta.notice = `${deferredCount} prospecto(s) quedaron en cola por límite anti-spam (${limits.maxPerRun}/envío). Se incluirán en el próximo ciclo (lun, mié o vie) si aún no recibieron correo este mes.`;
    }

    return { recipients: batch, meta, limits };
}

/**
 * Usa el dominio verificado de la plataforma para los prospectos suscritos.
 */
export function resolveProspectOutreachSenderFrom(sendIndex, limits = getProspectOutreachLimits()) {
    const pool = limits.senderPool.length ? limits.senderPool : getProspectSenderPool();
    const slot = Math.floor(sendIndex / limits.maxPerSender);
    const sender = pool[slot % pool.length];
    return formatSenderFrom(sender.name, sender.email);
}
