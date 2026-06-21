import { formatSenderFrom } from "../../emails/core/emailFrom.js";

/**
 * Límites de envío para outreach a prospectos (contactos externos, no opt-in).
 *
 * Referencias: deliverability cold email ~50–150/día por identidad de remitente;
 * Resend 5 req/s — usamos delay mayor y rotación de remitentes en el mismo dominio.
 */

export const PROSPECT_OUTREACH_SENDER_POOL = [
    { email: "hola@appsfly.app", name: "AppsFly" },
    { email: "novedades@appsfly.app", name: "AppsFly Novedades" },
    { email: "invitaciones@appsfly.app", name: "AppsFly Invitaciones" },
    { email: "contacto@appsfly.app", name: "AppsFly Contacto" },
];

function envInt(name, fallback) {
    const n = Number(process.env[name]);
    return Number.isFinite(n) && n > 0 ? Math.floor(n) : fallback;
}

export function getProspectOutreachLimits() {
    return {
        maxPerRun: envInt("PROSPECT_OUTREACH_MAX_PER_RUN", 150),
        maxPerSender: envInt("PROSPECT_OUTREACH_MAX_PER_SENDER", 50),
        sendDelayMs: envInt("PROSPECT_OUTREACH_SEND_DELAY_MS", 180),
        senderPool: PROSPECT_OUTREACH_SENDER_POOL,
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
        meta.notice = `${deferredCount} prospecto(s) quedaron en cola por límite anti-spam (${limits.maxPerRun}/envío). Se incluirán en el próximo ciclo (lun, mié o dom) si aún no recibieron correo este mes.`;
    }

    return { recipients: batch, meta, limits };
}

/**
 * Rota remitente cada maxPerSender correos (mismo dominio appsfly.app).
 */
export function resolveProspectOutreachSenderFrom(sendIndex, limits = getProspectOutreachLimits()) {
    const pool = limits.senderPool.length ? limits.senderPool : PROSPECT_OUTREACH_SENDER_POOL;
    const slot = Math.floor(sendIndex / limits.maxPerSender);
    const sender = pool[slot % pool.length];
    return formatSenderFrom(sender.name, sender.email);
}
