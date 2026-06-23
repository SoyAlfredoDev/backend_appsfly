import { getFrontendBaseUrl } from "../../emails/shared/layout.js";
import {
    PROSPECT_OUTREACH_VARIANTS,
    renderProspectOutreachPreview,
} from "./adminEmailCampaignProspectTemplate.js";
import { describeVariantPickStrategy } from "./adminEmailCampaignProspectVariantPicker.js";
import { getProspectOutreachVariantStats } from "./adminEmailCampaignProspectVariantStats.js";
import { syncStaleCampaignDeliveriesFromResend } from "./adminEmailCampaignResendSyncService.js";

const SAMPLE_PREVIEW_DATA = {
    firstName: "María",
    lastName: "González",
    businessName: "Óptica Visión Clara",
    registerUrl: `${getFrontendBaseUrl()}/register?from=prospect-email`,
    unsubscribeUrl: `${getFrontendBaseUrl()}/prospect-unsubscribe/ejemplo`,
};

export async function getProspectOutreachVariantsForAdmin() {
    await syncStaleCampaignDeliveriesFromResend({ limit: 1 }).catch((error) => {
        console.warn("[prospect-variants] Sync entregas Resend:", error.message);
    });

    const statsResult = await getProspectOutreachVariantStats();

    const variants = PROSPECT_OUTREACH_VARIANTS.map((variant) => {
        const preview = renderProspectOutreachPreview(variant.id, SAMPLE_PREVIEW_DATA);
        const variantStats = statsResult.variants[variant.id] ?? {
            sent: 0,
            delivered: 0,
            opened: 0,
            failed: 0,
            openRate: 0,
        };

        return {
            id: variant.id,
            name: variant.name,
            marketingAngle: variant.marketingAngle,
            goal: variant.goal,
            subject: preview.subject,
            preheader: preview.preheader,
            html: preview.html,
            text: preview.text,
            stats: variantStats,
        };
    });

    const hasWeightedStrategy = Object.values(statsResult.variants).reduce(
        (sum, row) => sum + (row?.sent ?? 0),
        0,
    ) >= 30;

    return {
        variants,
        totals: statsResult.totals,
        pickStrategy: hasWeightedStrategy
            ? describeVariantPickStrategy({ outreachEmailsSent: 0, variantStats: statsResult.variants })
            : "Reparto equilibrado A/B/C en cada lote de envío",
        strategyNotes: [
            "Primer contacto: cada lote reparte las 3 variantes de forma equilibrada.",
            "Recontacto (otro mes): rota el mensaje según cuántos correos previos recibió el prospecto.",
            "Con suficientes datos de apertura: prioriza las variantes con mejor rendimiento.",
        ],
        sampleData: SAMPLE_PREVIEW_DATA,
    };
}
