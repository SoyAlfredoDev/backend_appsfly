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
    };

    const subject = saleReceiptEmailSubject({
        businessName,
        saleNumber,
        documentLabel,
    });
    const html = saleReceiptEmailTemplate(templateData);
    const text = saleReceiptEmailText(templateData);

    await sendEmail({
        to: recipient,
        from: getQuotationSenderFrom(businessName),
        replyTo: replyTo.trim(),
        subject,
        html,
        text,
    });

    return { sent: true, to: recipient, replyTo: replyTo.trim() };
}
