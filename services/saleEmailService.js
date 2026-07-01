import { getBusinessByIdService } from "./businessService.js";
import { sendSaleReceiptEmail } from "../emails/dispatchers/saleReceipt.dispatcher.js";

const IVA_RATE = 0.19;

const DOCUMENT_LABELS = {
    RECEIPT: "Comprobante de venta",
    BOLETA: "Boleta electrónica",
    FACTURA: "Factura electrónica",
};

function resolveBusinessContact(business) {
    const email =
        business?.businessReceiptEmail?.trim() ||
        business?.businessEmail?.trim() ||
        null;
    const phone =
        business?.businessReceiptPhone?.trim() ||
        [business?.businessCodePhoneNumber, business?.businessPhoneNumber]
            .filter(Boolean)
            .join(" ")
            .trim() ||
        null;
    const address = business?.businessReceiptAddress?.trim() || null;
    const document = business?.businessDocumentNumber?.trim()
        ? `${business.businessDocumentType || "RUT"}: ${business.businessDocumentNumber}`
        : null;

    return {
        name: business?.businessName?.trim() || "Empresa",
        email,
        phone,
        address,
        document,
    };
}

function mapSaleDetailRow(detail) {
    const name =
        detail.product?.productName ||
        detail.service?.serviceName ||
        "Ítem";
    const sku =
        detail.product?.productSKU ||
        detail.service?.serviceSKU ||
        null;

    return {
        name,
        sku,
        quantity: detail.saleDetailQuantity,
        unitPrice: detail.saleDetailPrice,
        lineTotal: detail.saleDetailTotal,
    };
}

async function getSaleForEmail(saleId, prisma) {
    return prisma.sale.findUnique({
        where: { saleId },
        include: {
            customer: {
                select: {
                    customerFirstName: true,
                    customerLastName: true,
                    customerEmail: true,
                },
            },
            SaleDetail: {
                include: {
                    product: {
                        select: {
                            productName: true,
                            productSKU: true,
                        },
                    },
                    service: {
                        select: {
                            serviceName: true,
                            serviceSKU: true,
                        },
                    },
                },
            },
        },
    });
}

export async function sendSaleReceiptEmailToCustomer(saleId, businessId, prisma) {
    const sale = await getSaleForEmail(saleId, prisma);
    if (!sale) {
        const error = new Error("Venta no encontrada.");
        error.statusCode = 404;
        throw error;
    }

    const customerEmail = sale.customer?.customerEmail?.trim();
    if (!customerEmail) {
        const error = new Error("El cliente no tiene correo electrónico registrado.");
        error.statusCode = 400;
        error.code = "CUSTOMER_EMAIL_REQUIRED";
        throw error;
    }

    const business = await getBusinessByIdService(businessId);
    if (!business) {
        const error = new Error("Negocio no encontrado.");
        error.statusCode = 404;
        throw error;
    }

    const contact = resolveBusinessContact(business);
    if (!contact.email) {
        const error = new Error(
            "Configure el correo de la empresa en Configuración para enviar comprobantes.",
        );
        error.statusCode = 400;
        error.code = "BUSINESS_REPLY_EMAIL_REQUIRED";
        throw error;
    }

    const items = (sale.SaleDetail ?? []).map(mapSaleDetailRow);
    const total = Number(sale.saleTotal ?? 0);
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

    return sendSaleReceiptEmail({
        to: customerEmail,
        replyTo: contact.email,
        businessName: contact.name,
        contactEmail: contact.email,
        contactPhone: contact.phone,
        contactAddress: contact.address,
        contactDocument: contact.document,
        customerName,
        saleNumber: sale.saleNumber,
        saleDate,
        documentLabel,
        saleComment: sale.saleComment,
        items,
        netTotal,
        ivaTotal,
        total,
    });
}
