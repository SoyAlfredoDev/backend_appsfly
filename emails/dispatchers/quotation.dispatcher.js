import { sendEmail } from "../core/sendEmail.js";
import { getQuotationSenderFrom } from "../core/emailFrom.js";
import {
    quotationEmailSubject,
    quotationEmailTemplate,
    quotationEmailText,
} from "../users/quotations/quotationEmail.template.js";

/**
 * Envía cotización al cliente.
 * From: cuenta no-reply de la plataforma. Reply-To: correo de la empresa.
 */
export async function sendQuotationEmail({
    to,
    replyTo,
    businessName,
    contactEmail,
    contactPhone,
    contactAddress,
    contactDocument,
    customerName,
    quotationNumber,
    quotationDate,
    quotationExpiresAt,
    quotationComment,
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
        quotationNumber,
        quotationDate,
        quotationExpiresAt,
        quotationComment,
        items,
        netTotal,
        ivaTotal,
        total,
    };

    const subject = quotationEmailSubject({ businessName, quotationNumber });
    const html = quotationEmailTemplate(templateData);
    const text = quotationEmailText(templateData);

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
