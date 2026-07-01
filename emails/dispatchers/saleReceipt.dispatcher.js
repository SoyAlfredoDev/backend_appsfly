import { sendEmail } from "../core/sendEmail.js";
import { getQuotationSenderFrom } from "../core/emailFrom.js";
import {
    saleReceiptEmailSubject,
    saleReceiptEmailTemplate,
    saleReceiptEmailText,
} from "../users/sales/saleReceiptEmail.template.js";

export async function sendSaleReceiptEmail({
    to,
    replyTo,
    businessName,
    businessLogoUrl = null,
    contactEmail,
    contactPhone,
    contactAddress,
    contactDocument,
    customerName,
    saleNumber,
    saleDate,
    documentLabel,
    saleComment,
    items,
    netTotal,
    ivaTotal,
    total,
    publicReceiptUrl = null,
    pdfBuffer = null,
    saleId = null,
    businessId = null,
}) {
    const recipient = to?.trim().toLowerCase();
    if (!recipient) {
        const error = new Error("El cliente no tiene correo electrónico registrado.");
        error.statusCode = 400;
        error.code = "CUSTOMER_EMAIL_REQUIRED";
        throw error;
    }

    if (!replyTo?.trim()) {
        const error = new Error(
            "La empresa no tiene correo de contacto configurado para recibir respuestas.",
        );
        error.statusCode = 400;
        error.code = "BUSINESS_REPLY_EMAIL_REQUIRED";
        throw error;
    }

    const templateData = {
        businessName,
        businessLogoUrl,
        contactEmail,
        contactPhone,
        contactAddress,
        contactDocument,
        customerName,
        saleNumber,
        saleDate,
        documentLabel,
        saleComment,
        items,
        netTotal,
        ivaTotal,
        total,
        publicReceiptUrl,
        hasPdfAttachment: Boolean(pdfBuffer),
    };

    const subject = saleReceiptEmailSubject({
        businessName,
        saleNumber,
        documentLabel,
    });
    const html = saleReceiptEmailTemplate(templateData);
    const text = saleReceiptEmailText(templateData);

    const attachments = pdfBuffer
        ? [{
            filename: `comprobante-${saleNumber || "venta"}.pdf`,
            content: pdfBuffer,
        }]
        : undefined;

    const tags = saleId && businessId
        ? { sale_id: saleId, business_id: businessId }
        : undefined;

    await sendEmail({
        to: recipient,
        from: getQuotationSenderFrom(businessName),
        replyTo: replyTo.trim(),
        subject,
        html,
        text,
        attachments,
        tags,
    });

    return { sent: true, to: recipient, replyTo: replyTo.trim(), publicReceiptUrl };
}
