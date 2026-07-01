import { getBusinessByIdService } from "./businessService.js";
import { getQuotationById, updateQuotationStatus } from "./quotationServices.js";
import { sendQuotationEmail } from "../emails/dispatchers/quotation.dispatcher.js";
import { generateQuotationPdfBuffer } from "./quotationPdfService.js";

const IVA_RATE = 0.19;

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

function mapDetailRow(detail) {
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
        quantity: detail.quotationDetailQuantity,
        unitPrice: detail.quotationDetailPrice,
        lineTotal: detail.quotationDetailTotal,
    };
}

export async function sendQuotationEmailToCustomer(quotationId, businessId, prisma) {
    const quotation = await getQuotationById(quotationId, prisma);
    if (!quotation) {
        const error = new Error("Cotización no encontrada.");
        error.statusCode = 404;
        throw error;
    }

    const customerEmail = quotation.customer?.customerEmail?.trim();
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
            "Configure el correo de la empresa en Configuración para enviar cotizaciones.",
        );
        error.statusCode = 400;
        error.code = "BUSINESS_REPLY_EMAIL_REQUIRED";
        throw error;
    }

    const items = (quotation.QuotationDetail ?? []).map(mapDetailRow);
    const total = Number(quotation.quotationTotal ?? 0);
    const netTotal = Math.round(total / (1 + IVA_RATE));
    const ivaTotal = total - netTotal;

    const customerName = [
        quotation.customer?.customerFirstName,
        quotation.customer?.customerLastName,
    ]
        .filter(Boolean)
        .join(" ")
        .trim() || "Cliente";

    const pdfBuffer = await generateQuotationPdfBuffer({
        quotation,
        business,
        items,
        netTotal,
        ivaTotal,
        total,
        customerName,
    });

    const result = await sendQuotationEmail({
        to: customerEmail,
        replyTo: contact.email,
        businessName: contact.name,
        contactEmail: contact.email,
        contactPhone: contact.phone,
        contactAddress: contact.address,
        contactDocument: contact.document,
        customerName,
        quotationNumber: quotation.quotationNumber,
        quotationDate: quotation.quotationDate || quotation.createdAt,
        quotationExpiresAt: quotation.quotationExpiresAt,
        quotationComment: quotation.quotationComment,
        items,
        netTotal,
        ivaTotal,
        total,
        pdfBuffer,
    });

    if (quotation.quotationStatus === "DRAFT") {
        await updateQuotationStatus(quotationId, "SENT", prisma);
    }

    return result;
}
