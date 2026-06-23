import { PrismaClient as PrismaGeneral } from "../../src/generated/general/index.js";
import { buildProspectRegisterLandingUrl } from "./emailProspectService.js";
import { syncRunMetricsFromRecipients } from "../adminEmailCampaign/adminEmailCampaignMetricsService.js";

const general = new PrismaGeneral();

const UUID_RE =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function isValidRecipientId(value) {
    return UUID_RE.test(String(value ?? "").trim());
}

/**
 * Registra un clic en el botón/enlace de registro y devuelve la URL final de destino.
 * Siempre redirige a /register?from=prospect-email para no interrumpir el alta del usuario.
 */
export async function trackProspectRegisterClick(campaignRecipientId) {
    const landingUrl = buildProspectRegisterLandingUrl();

    if (!isValidRecipientId(campaignRecipientId)) {
        return { found: false, redirectUrl: landingUrl };
    }

    const recipient = await general.platformEmailCampaignRecipient.findUnique({
        where: { recipientId: campaignRecipientId },
        select: {
            recipientId: true,
            runId: true,
            deliveryStatus: true,
            deliveredAt: true,
            clickedAt: true,
        },
    });

    if (!recipient) {
        return { found: false, redirectUrl: landingUrl };
    }

    const now = new Date();
    const data = {
        clickCount: { increment: 1 },
        clickedAt: recipient.clickedAt ?? now,
    };

    if (
        recipient.deliveryStatus === "PENDING"
        || recipient.deliveryStatus === "SENT"
    ) {
        data.deliveryStatus = "DELIVERED";
        data.deliveredAt = recipient.deliveredAt ?? now;
    }

    await general.platformEmailCampaignRecipient.update({
        where: { recipientId: recipient.recipientId },
        data,
    });

    await syncRunMetricsFromRecipients(recipient.runId);

    return { found: true, redirectUrl: landingUrl };
}
