import crypto from "crypto";
import { PrismaClient as PrismaGeneral } from "../src/generated/general/index.js";
import { getFrontendBaseUrl } from "../emails/shared/layout.js";
import { getPrismaForBusinessId } from "../db.js";

const general = new PrismaGeneral();

const DEFAULT_EXPIRY_DAYS = 365;

function generateShareToken() {
    return crypto.randomBytes(32).toString("hex");
}

function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

export function buildPublicSaleReceiptUrl(shareToken) {
    const base = getFrontendBaseUrl();
    return `${base}/public/receipt/${shareToken}`;
}

function isExpired(expiresAt) {
    if (!expiresAt) return false;
    return new Date(expiresAt).getTime() < Date.now();
}

/**
 * Obtiene o crea un token público para compartir el comprobante de una venta.
 */
export async function getOrCreateSaleShareLink(businessId, saleId, { expiryDays = DEFAULT_EXPIRY_DAYS } = {}) {
    const existing = await general.salePublicShareIndex.findUnique({
        where: {
            businessId_saleId: { businessId, saleId },
        },
    });

    if (existing && !isExpired(existing.expiresAt)) {
        return {
            shareToken: existing.shareToken,
            shareUrl: buildPublicSaleReceiptUrl(existing.shareToken),
            expiresAt: existing.expiresAt,
        };
    }

    const shareToken = generateShareToken();
    const expiresAt = expiryDays > 0 ? addDays(new Date(), expiryDays) : null;

    const record = await general.salePublicShareIndex.upsert({
        where: {
            businessId_saleId: { businessId, saleId },
        },
        create: {
            shareToken,
            businessId,
            saleId,
            expiresAt,
        },
        update: {
            shareToken,
            expiresAt,
            lastAccessAt: null,
        },
    });

    return {
        shareToken: record.shareToken,
        shareUrl: buildPublicSaleReceiptUrl(record.shareToken),
        expiresAt: record.expiresAt,
    };
}

/**
 * Resuelve token → tenant prisma + saleId. Actualiza lastAccessAt.
 */
export async function resolveSaleShareToken(shareToken) {
    const normalized = shareToken?.trim();
    if (!normalized || normalized.length < 32) {
        return null;
    }

    const index = await general.salePublicShareIndex.findUnique({
        where: { shareToken: normalized },
    });

    if (!index || isExpired(index.expiresAt)) {
        return null;
    }

    const prisma = await getPrismaForBusinessId(index.businessId);
    if (!prisma) {
        return null;
    }

    general.salePublicShareIndex
        .update({
            where: { shareId: index.shareId },
            data: { lastAccessAt: new Date() },
        })
        .catch(() => {});

    return {
        businessId: index.businessId,
        saleId: index.saleId,
        prisma,
    };
}
