import { getBusinessByIdService } from "./businessService.js";
import { resolveSaleShareToken } from "./salePublicShareService.js";

const IVA_RATE = 0.19;

const DOCUMENT_LABELS = {
    RECEIPT: "Comprobante de venta",
    BOLETA: "Boleta electrónica",
    FACTURA: "Factura electrónica",
};

const PAYMENT_METHOD_LABELS = {
    0: "Tarjeta de Débito",
    1: "Tarjeta de Crédito",
    2: "Efectivo",
    3: "Transferencia Bancaria",
};

function resolveBusinessContact(business) {
    const email =
        business?.businessReceiptEmail?.trim()
        || business?.businessEmail?.trim()
        || null;
    const phone =
        business?.businessReceiptPhone?.trim()
        || [business?.businessCodePhoneNumber, business?.businessPhoneNumber]
            .filter(Boolean)
            .join(" ")
            .trim()
        || null;
    const address = business?.businessReceiptAddress?.trim() || null;
    const document = business?.businessDocumentNumber?.trim()
        ? `${business.businessDocumentType || "RUT"}: ${business.businessDocumentNumber}`
        : null;

    return {
        name: business?.businessName?.trim() || "Empresa",
        logoUrl: business?.businessReceiptLogoUrl?.trim() || null,
        email,
        phone,
        address,
        document,
        footerNote: business?.businessReceiptFooterNote?.trim() || null,
    };
}

function mapSaleDetailRow(detail) {
    const name =
        detail.product?.productName
        || detail.service?.serviceName
        || "Ítem";
    const sku =
        detail.product?.productSKU
        || detail.service?.serviceSKU
        || null;

    return {
        name,
        sku,
        quantity: detail.saleDetailQuantity,
        unitPrice: detail.saleDetailPrice,
        lineTotal: detail.saleDetailTotal,
        type: detail.saleDetailType,
    };
}

function mapPaymentRow(payment) {
    return {
        methodLabel: PAYMENT_METHOD_LABELS[payment.paymentMethod] ?? "Otro",
        amount: payment.paymentAmount,
    };
}

async function loadSaleForPublic(saleId, prisma) {
    return prisma.sale.findUnique({
        where: { saleId },
        include: {
            customer: {
                select: {
                    customerFirstName: true,
                    customerLastName: true,
                },
            },
            SaleDetail: {
                include: {
                    product: {
                        select: { productName: true, productSKU: true },
                    },
                    service: {
                        select: { serviceName: true, serviceSKU: true },
                    },
                },
            },
            Payment: {
                select: {
                    paymentAmount: true,
                    paymentMethod: true,
                },
            },
        },
    });
}

function buildPublicPayload(sale, business) {
    const items = (sale.SaleDetail ?? []).map(mapSaleDetailRow);
    const payments = (sale.Payment ?? []).map(mapPaymentRow);
    const total = Number(sale.saleTotal ?? 0);
    const totalPayments = payments.reduce((acc, p) => acc + Number(p.amount || 0), 0);
    const pendingAmount = total - totalPayments;
    const netTotal = Math.round(total / (1 + IVA_RATE));
    const ivaTotal = total - netTotal;

    const customerName = [
        sale.customer?.customerFirstName,
        sale.customer?.customerLastName,
    ]
        .filter(Boolean)
        .join(" ")
        .trim() || "Cliente";

    const saleDate = sale.createdAt
        ? new Date(sale.createdAt).toLocaleDateString("es-CL", {
            day: "numeric",
            month: "long",
            year: "numeric",
        })
        : "—";

    const documentLabel =
        DOCUMENT_LABELS[sale.documentType] || DOCUMENT_LABELS.RECEIPT;

    const businessContact = resolveBusinessContact(business);

    return {
        saleNumber: sale.saleNumber,
        saleDate,
        documentType: sale.documentType,
        documentLabel,
        saleComment: sale.saleComment,
        customerName,
        items,
        payments,
        netTotal,
        ivaTotal,
        total,
        totalPayments,
        pendingAmount,
        business: businessContact,
    };
}

export async function getPublicSaleReceiptByToken(shareToken) {
    const resolved = await resolveSaleShareToken(shareToken);
    if (!resolved) {
        const error = new Error("Enlace no válido o expirado.");
        error.statusCode = 404;
        error.code = "SHARE_NOT_FOUND";
        throw error;
    }

    const sale = await loadSaleForPublic(resolved.saleId, resolved.prisma);
    if (!sale) {
        const error = new Error("Comprobante no encontrado.");
        error.statusCode = 404;
        error.code = "SALE_NOT_FOUND";
        throw error;
    }

    const business = await getBusinessByIdService(resolved.businessId);
    if (!business) {
        const error = new Error("Empresa no encontrada.");
        error.statusCode = 404;
        throw error;
    }

    return buildPublicPayload(sale, business);
}
