import {
    PROSPECT_OUTREACH_VARIANTS,
    getProspectVariantById,
} from "./adminEmailCampaignProspectTemplate.js";

const MIN_SENDS_FOR_WEIGHTING = 30;

function hasEnoughStats(variantStats) {
    const totalSent = PROSPECT_OUTREACH_VARIANTS.reduce(
        (sum, variant) => sum + (variantStats[variant.id]?.sent ?? 0),
        0,
    );
    return totalSent >= MIN_SENDS_FOR_WEIGHTING;
}

function pickWeightedByOpenRate(variants, variantStats) {
    const weights = variants.map((variant) => {
        const stats = variantStats[variant.id] ?? { sent: 0, opened: 0 };
        // Suavizado bayesiano simple para no castigar variantes con pocos envíos
        return (stats.opened + 1) / (stats.sent + 2);
    });

    const total = weights.reduce((sum, weight) => sum + weight, 0);
    let roll = Math.random() * total;

    for (let index = 0; index < variants.length; index += 1) {
        roll -= weights[index];
        if (roll <= 0) return variants[index];
    }

    return variants[variants.length - 1];
}

/**
 * Elige la variante de outreach para un prospecto.
 *
 * - Primer contacto en un lote: reparto equilibrado (A/B/C) por posición en el batch.
 * - Recontacto en otro mes: rota overview → offer → team según outreach previo.
 * - Con métricas suficientes: prioriza variantes con mayor tasa de apertura.
 */
export function pickProspectTemplateVariant({
    sendIndexInBatch = 0,
    outreachEmailsSent = 0,
    variantStats = null,
    forcedVariantId = null,
} = {}) {
    if (forcedVariantId) {
        const forced = getProspectVariantById(forcedVariantId);
        if (forced) return forced;
    }

    if (outreachEmailsSent > 0) {
        return PROSPECT_OUTREACH_VARIANTS[
            outreachEmailsSent % PROSPECT_OUTREACH_VARIANTS.length
        ];
    }

    if (variantStats && hasEnoughStats(variantStats)) {
        return pickWeightedByOpenRate(PROSPECT_OUTREACH_VARIANTS, variantStats);
    }

    return PROSPECT_OUTREACH_VARIANTS[
        sendIndexInBatch % PROSPECT_OUTREACH_VARIANTS.length
    ];
}

export function describeVariantPickStrategy({ outreachEmailsSent, variantStats }) {
    if (outreachEmailsSent > 0) {
        return "Rotación mensual (cada mes un mensaje distinto)";
    }
    if (variantStats && hasEnoughStats(variantStats)) {
        return "Prioriza variantes con mayor apertura (datos históricos)";
    }
    return "Reparto equilibrado A/B/C en cada lote de envío";
}
