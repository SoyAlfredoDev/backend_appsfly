import { PrismaClient as PrismaGeneral } from "../../src/generated/general/index.js";

const general = new PrismaGeneral();

function normalizeEmail(email) {
    return String(email ?? "").trim().toLowerCase();
}

/**
 * Marca un prospecto como convertido cuando el correo se registra en AppsFly.
 * Conserva el registro para medir atribución (no se elimina de la BD).
 */
export async function markProspectConvertedByEmail(email, userId) {
    const normalized = normalizeEmail(email);
    if (!normalized || !userId) return null;

    const prospect = await general.platformEmailProspect.findUnique({
        where: { email: normalized },
    });

    if (!prospect) return null;

    if (prospect.status === "CONVERTED" && prospect.convertedUserId === userId) {
        return prospect;
    }

    if (prospect.status === "CONVERTED" && prospect.convertedUserId !== userId) {
        console.warn(
            "[prospect-conversion] Email ya convertido con otro userId:",
            normalized,
        );
        return prospect;
    }

    return general.platformEmailProspect.update({
        where: { prospectId: prospect.prospectId },
        data: {
            status: "CONVERTED",
            convertedUserId: userId,
            convertedAt: new Date(),
        },
    });
}

/**
 * Incrementa contadores cuando un correo de outreach se envía al prospecto.
 */
export async function trackProspectOutreachSend(prospectId, variantId = null) {
    if (!prospectId) return;

    const prospect = await general.platformEmailProspect.findUnique({
        where: { prospectId },
        select: { prospectId: true, status: true, firstOutreachAt: true },
    });

    if (!prospect || prospect.status === "CONVERTED") return;

    const now = new Date();
    await general.platformEmailProspect.update({
        where: { prospectId },
        data: {
            outreachEmailsSent: { increment: 1 },
            lastOutreachAt: now,
            firstOutreachAt: prospect.firstOutreachAt ?? now,
            ...(variantId ? { lastOutreachVariantId: variantId } : {}),
        },
    });
}

export async function getProspectConversionStats() {
    const [active, unsubscribed, converted, total, contacted, convertedAfterOutreach] =
        await Promise.all([
            general.platformEmailProspect.count({ where: { status: "ACTIVE" } }),
            general.platformEmailProspect.count({ where: { status: "UNSUBSCRIBED" } }),
            general.platformEmailProspect.count({ where: { status: "CONVERTED" } }),
            general.platformEmailProspect.count(),
            general.platformEmailProspect.count({
                where: { outreachEmailsSent: { gt: 0 } },
            }),
            general.platformEmailProspect.count({
                where: {
                    status: "CONVERTED",
                    outreachEmailsSent: { gt: 0 },
                },
            }),
        ]);

    const conversionRateAfterOutreach =
        contacted > 0 ? Math.round((convertedAfterOutreach / contacted) * 1000) / 10 : 0;

    return {
        active,
        unsubscribed,
        converted,
        total,
        contacted,
        convertedAfterOutreach,
        conversionRateAfterOutreach,
    };
}
