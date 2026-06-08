import { randomUUID } from "crypto";

export const ASMR_CAMPAIGN_TYPES = {
    ONE_YEAR_NO_PURCHASE: "ONE_YEAR_NO_PURCHASE",
};

const MONTH_NAMES = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
];

export function normalizeRut(documentNumber) {
    if (!documentNumber) return null;
    return String(documentNumber)
        .replace(/\./g, "")
        .replace(/-/g, "")
        .toUpperCase()
        .trim();
}

export function normalizePhone(customer) {
    if (!customer) return null;
    const code = customer.customerCodePhoneNumber ?? "";
    const number = customer.customerPhoneNumber ?? "";
    const digits = `${code}${number}`.replace(/\D/g, "");
    return digits.length >= 8 ? digits : null;
}

function monthRange(year, month) {
    const start = new Date(year, month - 1, 1, 0, 0, 0, 0);
    const end = new Date(year, month, 0, 23, 59, 59, 999);
    return { start, end };
}

function customerKey(customer) {
    return normalizeRut(customer.customerDocumentNumber) || customer.customerId;
}

function formatCustomerName(customer) {
    return `${customer.customerFirstName ?? ""} ${customer.customerLastName ?? ""}`.trim();
}

export function buildCampaignMessage(customer, discountPercent) {
    const name = formatCustomerName(customer) || "cliente";
    return `Hola ${name}, te recordamos que ya cumplió un año desde tu última compra con nosotros. Tienes un ${discountPercent}% de descuento en tu renovación. ¡Te esperamos en nuestra óptica!`;
}

export function buildCampaignSummaryMessage(discountPercent, contactCount, sourceLabel) {
    return `Campaña fidelización óptica (${sourceLabel}): ${discountPercent}% descuento enviado a ${contactCount} contacto(s) vía WhatsApp.`;
}

/**
 * Motor de segmentación — "Clientes 1 año sin comprar".
 *
 * 1. Universo: compradores en el mismo mes del año anterior.
 * 2. Exclusión: RUT con recompra desde el mes posterior hasta fin del mes auditado.
 * 3. Desduplicación: un registro por teléfono normalizado.
 */
export async function segmentOneYearNoPurchase(prisma, { auditMonth, auditYear }) {
    const month = Number(auditMonth);
    const year = Number(auditYear);

    if (!month || month < 1 || month > 12 || !year) {
        throw Object.assign(new Error("Mes y año de auditoría inválidos."), {
            statusCode: 400,
        });
    }

    const sourceYear = year - 1;
    const sourceMonth = month;
    const sourceRange = monthRange(sourceYear, sourceMonth);

    const sourceSales = await prisma.sale.findMany({
        where: {
            createdAt: {
                gte: sourceRange.start,
                lte: sourceRange.end,
            },
        },
        include: {
            customer: true,
        },
        orderBy: { createdAt: "asc" },
    });

    const universeMap = new Map();
    for (const sale of sourceSales) {
        const key = customerKey(sale.customer);
        if (!universeMap.has(key)) {
            universeMap.set(key, sale.customer);
        }
    }

    const universeTotal = universeMap.size;
    const universeKeys = [...universeMap.keys()];

    if (universeTotal === 0) {
        return {
            auditMonth: month,
            auditYear: year,
            sourceMonth,
            sourceYear,
            sourcePeriodLabel: `${MONTH_NAMES[sourceMonth - 1]} ${sourceYear}`,
            auditPeriodLabel: `${MONTH_NAMES[month - 1]} ${year}`,
            breakdown: {
                universeTotal: 0,
                excludedRepurchase: 0,
                eligibleBeforeDedup: 0,
                eligibleFinal: 0,
                phonesDeduplicated: 0,
            },
            eligibleContacts: [],
        };
    }

    const exclusionStart = new Date(sourceYear, sourceMonth, 1, 0, 0, 0, 0);
    const exclusionEnd = monthRange(year, month).end;

    const repurchaseSales = await prisma.sale.findMany({
        where: {
            createdAt: {
                gte: exclusionStart,
                lte: exclusionEnd,
            },
        },
        include: { customer: true },
    });

    const repurchasedKeys = new Set();
    for (const sale of repurchaseSales) {
        const key = customerKey(sale.customer);
        if (universeMap.has(key)) {
            repurchasedKeys.add(key);
        }
    }

    const eligibleBeforeDedup = [];
    for (const key of universeKeys) {
        if (!repurchasedKeys.has(key)) {
            eligibleBeforeDedup.push(universeMap.get(key));
        }
    }

    const excludedRepurchase = repurchasedKeys.size;
    const seenPhones = new Set();
    const eligibleContacts = [];
    let phonesDeduplicated = 0;

    for (const customer of eligibleBeforeDedup) {
        const phone = normalizePhone(customer);
        if (!phone) {
            eligibleContacts.push({
                customerId: customer.customerId,
                customerName: formatCustomerName(customer),
                rut: customer.customerDocumentNumber ?? "—",
                phone: "—",
                messagePreview: buildCampaignMessage(customer, 20),
            });
            continue;
        }

        if (seenPhones.has(phone)) {
            phonesDeduplicated += 1;
            continue;
        }

        seenPhones.add(phone);
        eligibleContacts.push({
            customerId: customer.customerId,
            customerName: formatCustomerName(customer),
            rut: customer.customerDocumentNumber ?? "—",
            phone,
            messagePreview: buildCampaignMessage(customer, 20),
        });
    }

    return {
        auditMonth: month,
        auditYear: year,
        sourceMonth,
        sourceYear,
        sourcePeriodLabel: `${MONTH_NAMES[sourceMonth - 1]} ${sourceYear}`,
        auditPeriodLabel: `${MONTH_NAMES[month - 1]} ${year}`,
        breakdown: {
            universeTotal,
            excludedRepurchase,
            eligibleBeforeDedup: eligibleBeforeDedup.length,
            eligibleFinal: eligibleContacts.length,
            phonesDeduplicated,
        },
        eligibleContacts,
    };
}

export async function simulateCampaignSend(delayMs = 1500) {
    await new Promise((resolve) => setTimeout(resolve, delayMs));
}

export function createCampaignRecordPayload({
    segmentation,
    campaignName,
    campaignType,
    discountPercent,
    userId,
}) {
    const { breakdown, sourcePeriodLabel } = segmentation;
    const contactsSuccess = breakdown.eligibleFinal;

    return {
        campaignId: randomUUID(),
        campaignName,
        campaignType,
        auditMonth: segmentation.auditMonth,
        auditYear: segmentation.auditYear,
        sourceMonth: segmentation.sourceMonth,
        sourceYear: segmentation.sourceYear,
        discountPercent,
        messageSent: buildCampaignSummaryMessage(
            discountPercent,
            contactsSuccess,
            sourcePeriodLabel,
        ),
        contactsSuccess,
        universeTotal: breakdown.universeTotal,
        excludedRepurchase: breakdown.excludedRepurchase,
        eligibleBeforeDedup: breakdown.eligibleBeforeDedup,
        eligibleFinal: breakdown.eligibleFinal,
        phonesDeduplicated: breakdown.phonesDeduplicated,
        campaignStatus: "SENT",
        createdByUserId: userId,
        executedAt: new Date(),
    };
}
