import { randomUUID } from "crypto";
import { getBusinessByIdService } from "./businessService.js";
import {
    parseBusinessDateOnly,
    resolveBusinessTimezone,
    DEFAULT_BUSINESS_TIMEZONE,
} from "../libs/businessTimezone.js";

const DEFAULT_COMMENT = "Según receta médica presentada por el paciente.";

const certificateInclude = {
    details: { orderBy: { sortOrder: "asc" } },
    sale: {
        select: {
            saleId: true,
            saleNumber: true,
            saleTotal: true,
            createdAt: true,
        },
    },
    createdBy: {
        select: { userId: true, userFirstName: true, userLastName: true },
    },
    issuedBy: {
        select: { userId: true, userFirstName: true, userLastName: true },
    },
};

const formatName = (first, last) =>
    [first, last].filter(Boolean).map((s) => String(s).trim()).join(" ").trim() || null;

const buildBusinessSnapshots = (business) => {
    if (!business) {
        return {
            businessNameSnapshot: null,
            businessDocumentSnapshot: null,
            businessAddressSnapshot: null,
            businessLogoSnapshot: null,
        };
    }
    const doc = [business.businessDocumentType, business.businessDocumentNumber]
        .filter(Boolean)
        .join(" ")
        .trim();
    return {
        businessNameSnapshot: business.businessName?.trim() || null,
        businessDocumentSnapshot: doc || null,
        businessAddressSnapshot:
            business.businessReceiptAddress?.trim()
            || business.businessCountry?.trim()
            || null,
        businessLogoSnapshot: business.businessReceiptLogoUrl?.trim() || null,
    };
};

const mapSaleDetailToLine = (detail, index) => {
    const isProduct = detail.saleDetailType === "PRODUCT";
    const name = isProduct
        ? detail.product?.productName
        : detail.service?.serviceName;
    const sku = isProduct
        ? detail.product?.productSKU
        : detail.service?.serviceSKU;

    const qty = Number(detail.saleDetailQuantity) || 1;
    const unitPrice = Number(detail.saleDetailPrice) || 0;
    const lineTotal = Number(detail.saleDetailTotal) || qty * unitPrice;

    return {
        purchaseCertificateDetailId: randomUUID(),
        sourceSaleDetailId: detail.saleDetailId,
        lineType: detail.saleDetailType || "PRODUCT",
        lineSku: sku || null,
        lineDescription: name || "Ítem",
        lineQuantity: qty,
        lineUnitPrice: unitPrice,
        lineTotal,
        sortOrder: index,
        lineIncluded: true,
    };
};

const normalizeDetailInput = (raw, index) => {
    const qty = Math.max(1, Math.floor(Number(raw.lineQuantity) || 1));
    const unitPrice = Math.max(0, Math.floor(Number(raw.lineUnitPrice) || 0));
    const lineTotal =
        raw.lineTotal !== undefined && raw.lineTotal !== null && raw.lineTotal !== ""
            ? Math.max(0, Math.floor(Number(raw.lineTotal) || 0))
            : qty * unitPrice;

    return {
        purchaseCertificateDetailId: raw.purchaseCertificateDetailId || randomUUID(),
        sourceSaleDetailId: raw.sourceSaleDetailId || null,
        lineType: raw.lineType || "PRODUCT",
        lineSku: raw.lineSku?.trim() || null,
        lineDescription: (raw.lineDescription || "").trim() || "Ítem",
        lineQuantity: qty,
        lineUnitPrice: unitPrice,
        lineTotal,
        sortOrder: Number.isFinite(Number(raw.sortOrder)) ? Number(raw.sortOrder) : index,
        lineIncluded: raw.lineIncluded !== false,
    };
};

const computeTotal = (details) =>
    details
        .filter((d) => d.lineIncluded !== false)
        .reduce((sum, d) => sum + (Number(d.lineTotal) || 0), 0);

export const countPurchaseCertificates = async (prisma) =>
    prisma.purchaseCertificate.count();

export const defineCertificateNumber = async (prisma) => {
    const count = await countPurchaseCertificates(prisma);
    return `CC-${String(Number(count) + 1).padStart(5, "0")}`;
};

export const getPurchaseCertificates = async (prisma, filters = {}) => {
    const where = {};
    if (filters.saleId) where.saleId = filters.saleId;
    if (filters.status) where.certificateStatus = filters.status;

    return prisma.purchaseCertificate.findMany({
        where,
        orderBy: { createdAt: "desc" },
        include: certificateInclude,
    });
};

export const getPurchaseCertificatesBySaleId = async (saleId, prisma) =>
    getPurchaseCertificates(prisma, { saleId });

export const getPurchaseCertificateById = async (id, prisma) =>
    prisma.purchaseCertificate.findUnique({
        where: { purchaseCertificateId: id },
        include: certificateInclude,
    });

/**
 * Crea un borrador precargado desde la venta (snapshot; no muta SaleDetail).
 */
export const createPurchaseCertificateFromSale = async (
    { saleId, createdByUserId, businessId, comment, issuedDate, responsibleName },
    prisma,
) => {
    const sale = await prisma.sale.findUnique({
        where: { saleId },
        include: {
            customer: true,
            SaleDetail: {
                include: {
                    product: { select: { productName: true, productSKU: true } },
                    service: { select: { serviceName: true, serviceSKU: true } },
                },
                orderBy: { createdAt: "asc" },
            },
            user: {
                select: { userFirstName: true, userLastName: true },
            },
        },
    });

    if (!sale) {
        const error = new Error("Venta no encontrada.");
        error.statusCode = 404;
        throw error;
    }

    const business = businessId ? await getBusinessByIdService(businessId) : null;
    const businessTz = resolveBusinessTimezone(business);
    const details = sale.SaleDetail.map(mapSaleDetailToLine);
    const certificateNumber = await defineCertificateNumber(prisma);
    const customerName = formatName(
        sale.customer?.customerFirstName,
        sale.customer?.customerLastName,
    );
    const customerDoc = [
        sale.customer?.customerDocumentType,
        sale.customer?.customerDocumentNumber,
    ]
        .filter(Boolean)
        .join(" ")
        .trim();

    const defaultResponsible =
        responsibleName?.trim()
        || formatName(sale.user?.userFirstName, sale.user?.userLastName)
        || null;

    return prisma.purchaseCertificate.create({
        data: {
            saleId,
            certificateNumber,
            certificateStatus: "DRAFT",
            certificateIssuedDate: issuedDate
                ? parseBusinessDateOnly(issuedDate, businessTz)
                : new Date(),
            certificateComment: comment?.trim() || DEFAULT_COMMENT,
            certificateResponsibleName: defaultResponsible,
            customerNameSnapshot: customerName,
            customerDocumentSnapshot: customerDoc || null,
            ...buildBusinessSnapshots(business),
            certificateTotal: computeTotal(details),
            createdByUserId,
            details: { create: details },
        },
        include: certificateInclude,
    });
};

export const updatePurchaseCertificate = async (id, body, prisma) => {
    const existing = await getPurchaseCertificateById(id, prisma);
    if (!existing) {
        const error = new Error("Certificado no encontrado.");
        error.statusCode = 404;
        throw error;
    }

    if (existing.certificateStatus !== "DRAFT") {
        const error = new Error("Solo se pueden editar certificados en borrador.");
        error.statusCode = 400;
        error.code = "CERTIFICATE_NOT_EDITABLE";
        throw error;
    }

    const data = {};
    if (body.certificateComment !== undefined) {
        data.certificateComment = body.certificateComment?.trim() || null;
    }
    if (body.certificateResponsibleName !== undefined) {
        data.certificateResponsibleName = body.certificateResponsibleName?.trim() || null;
    }
    if (body.certificateIssuedDate !== undefined) {
        data.certificateIssuedDate = body.certificateIssuedDate
            ? parseBusinessDateOnly(body.certificateIssuedDate, DEFAULT_BUSINESS_TIMEZONE)
            : null;
    }
    if (body.customerNameSnapshot !== undefined) {
        data.customerNameSnapshot = body.customerNameSnapshot?.trim() || null;
    }
    if (body.customerDocumentSnapshot !== undefined) {
        data.customerDocumentSnapshot = body.customerDocumentSnapshot?.trim() || null;
    }

    let detailsPayload = null;
    if (Array.isArray(body.details)) {
        detailsPayload = body.details.map(normalizeDetailInput);
        data.certificateTotal = computeTotal(detailsPayload);
    }

    return prisma.$transaction(async (tx) => {
        if (detailsPayload) {
            await tx.purchaseCertificateDetail.deleteMany({
                where: { purchaseCertificateId: id },
            });
            await tx.purchaseCertificateDetail.createMany({
                data: detailsPayload.map((d) => ({
                    ...d,
                    purchaseCertificateId: id,
                })),
            });
        }

        return tx.purchaseCertificate.update({
            where: { purchaseCertificateId: id },
            data,
            include: certificateInclude,
        });
    });
};

/**
 * Emite el certificado: congela contenido y refresca snapshot de negocio.
 */
export const issuePurchaseCertificate = async (
    { purchaseCertificateId, issuedByUserId, businessId },
    prisma,
) => {
    const existing = await getPurchaseCertificateById(purchaseCertificateId, prisma);
    if (!existing) {
        const error = new Error("Certificado no encontrado.");
        error.statusCode = 404;
        throw error;
    }

    if (existing.certificateStatus === "ISSUED") {
        return existing;
    }

    if (existing.certificateStatus === "VOID") {
        const error = new Error("No se puede emitir un certificado anulado.");
        error.statusCode = 400;
        throw error;
    }

    const included = (existing.details || []).filter((d) => d.lineIncluded);
    if (included.length === 0) {
        const error = new Error("El certificado debe incluir al menos un producto o ítem.");
        error.statusCode = 400;
        throw error;
    }

    const business = businessId ? await getBusinessByIdService(businessId) : null;
    const snaps = buildBusinessSnapshots(business);

    return prisma.purchaseCertificate.update({
        where: { purchaseCertificateId },
        data: {
            certificateStatus: "ISSUED",
            issuedAt: new Date(),
            issuedByUserId,
            certificateTotal: computeTotal(existing.details),
            ...snaps,
            certificateIssuedDate: existing.certificateIssuedDate || new Date(),
        },
        include: certificateInclude,
    });
};

export const voidPurchaseCertificate = async (id, prisma) => {
    const existing = await getPurchaseCertificateById(id, prisma);
    if (!existing) {
        const error = new Error("Certificado no encontrado.");
        error.statusCode = 404;
        throw error;
    }

    return prisma.purchaseCertificate.update({
        where: { purchaseCertificateId: id },
        data: { certificateStatus: "VOID" },
        include: certificateInclude,
    });
};

export const deletePurchaseCertificate = async (id, prisma) => {
    const existing = await getPurchaseCertificateById(id, prisma);
    if (!existing) {
        const error = new Error("Certificado no encontrado.");
        error.statusCode = 404;
        throw error;
    }

    if (existing.certificateStatus === "ISSUED") {
        const error = new Error("No se puede eliminar un certificado emitido. Anúlalo si corresponde.");
        error.statusCode = 400;
        throw error;
    }

    return prisma.purchaseCertificate.delete({
        where: { purchaseCertificateId: id },
    });
};

export { DEFAULT_COMMENT };
