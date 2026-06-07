import { sendEmail } from "../core/sendEmail.js";
import {
    buildConfirmEmailUrl,
    confirmEmailSubject,
    confirmEmailTemplate,
    confirmEmailText,
} from "../users/auth/confirmEmail.template.js";

export async function sendConfirmEmail({ to, userId, firstName, lastName }) {
    if (!to?.trim() || !userId) {
        console.warn("[emails/confirmEmail] Destinatario o userId faltante; se omite envío.");
        return { sent: false };
    }

    const confirmationUrl = buildConfirmEmailUrl(userId);
    const subject = confirmEmailSubject();
    const html = confirmEmailTemplate({ firstName, lastName, confirmationUrl });
    const text = confirmEmailText({ firstName, lastName, confirmationUrl });

    await sendEmail({ to: to.trim().toLowerCase(), subject, html, text });
    console.info("[emails/confirmEmail] Correo de confirmación enviado a:", to);
    return { sent: true, confirmationUrl };
}
