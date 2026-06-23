const WEEKDAY_LABELS = {
    0: "domingo",
    1: "lunes",
    2: "martes",
    3: "miércoles",
    4: "jueves",
    5: "viernes",
    6: "sábado",
};

export const MANUAL_CAMPAIGN_HINT =
    "Puedes dispararlo manualmente desde el panel admin (botón «Enviar campaña» o, para prospectos, «Enviar outreach ahora»).";

export function getManualActionForCampaign(campaign) {
    if (campaign?.audienceType === "PLATFORM_PROSPECTS") {
        return {
            path: "/admin/email-prospects",
            label: "Ir a Prospectos y enviar outreach",
        };
    }
    if (campaign?.campaignId) {
        return {
            path: `/admin/email-campaigns/${campaign.campaignId}/edit`,
            label: "Enviar campaña manualmente",
        };
    }
    return {
        path: "/admin/email-campaigns",
        label: "Ver campañas de email",
    };
}

export function formatMissedSlotLabel(dueMeta) {
    const dayKey = dueMeta?.slot?.dayKey;
    if (dayKey) return dayKey;
    if (dueMeta?.runDay) return `día ${dueMeta.runDay} del mes`;
    const weekday = dueMeta?.slot?.weekday;
    if (weekday != null) return WEEKDAY_LABELS[weekday] ?? String(weekday);
    return "el ciclo programado";
}

export function buildCampaignManualRequiredNotification(
    campaign,
    { reason, detail, dueMeta, errorMessage } = {},
) {
    const manual = getManualActionForCampaign(campaign);
    const missedLabel = dueMeta ? formatMissedSlotLabel(dueMeta) : null;

    let message = detail;
    if (!message) {
        if (reason === "CATCH_UP_FAILED") {
            message = `No se pudo recuperar el envío automático pendiente (${missedLabel ?? "ciclo anterior"}).`;
        } else if (reason === "AUTO_SEND_FAILED") {
            message = `El envío automático falló${errorMessage ? `: ${errorMessage}` : "."}`;
        } else if (reason === "SCHEDULER_DISABLED") {
            message = `Hay un envío programado pendiente (${missedLabel ?? "ciclo anterior"}) y el programador del servidor está desactivado.`;
        } else if (reason === "MISSED_SLOT") {
            message = `No se ejecutó el envío programado (${missedLabel ?? "ciclo anterior"}). El servidor pudo haber estado apagado.`;
        } else {
            message = "No se pudo completar el envío automático de la campaña.";
        }
    }

    message = `${message} ${MANUAL_CAMPAIGN_HINT}`;

    return {
        notificationType: "CAMPAIGN_MANUAL_REQUIRED",
        title: `Envío pendiente: ${campaign.campaignName ?? "Campaña"}`,
        message,
        payload: {
            campaignId: campaign.campaignId,
            campaignKey: campaign.campaignKey,
            campaignName: campaign.campaignName,
            reason,
            dueMeta,
            errorMessage: errorMessage ?? null,
            requiresManualAction: true,
            manualActionPath: manual.path,
            manualActionLabel: manual.label,
        },
        campaignId: campaign.campaignId,
    };
}

export function enrichNotificationWithManualAction(notificationData, campaign) {
    const manual = getManualActionForCampaign(campaign);
    const needsManual =
        notificationData.notificationType === "CAMPAIGN_FAILED"
        || (notificationData.notificationType === "CAMPAIGN_SKIPPED"
            && campaign?.audienceType === "PLATFORM_PROSPECTS");

    if (!needsManual) return notificationData;

    return {
        ...notificationData,
        notificationType: "CAMPAIGN_MANUAL_REQUIRED",
        message: `${notificationData.message} ${MANUAL_CAMPAIGN_HINT}`,
        payload: {
            ...(notificationData.payload ?? {}),
            requiresManualAction: true,
            manualActionPath: manual.path,
            manualActionLabel: manual.label,
        },
    };
}
