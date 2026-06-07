import { sendEmail } from "../core/sendEmail.js";
import {
    invitationEmailSubject,
    invitationEmailTemplate,
    invitationEmailText,
} from "../users/invitations/invitation.template.js";
import { getFrontendBaseUrl } from "../shared/layout.js";

/**
 * Envía correo de invitación a un usuario invitado al negocio.
 */
export async function sendUserInvitationEmail({
    to,
    businessName,
    inviterName,
    role,
    registerUrl,
}) {
    if (!to?.trim()) {
        console.warn("[emails/invitation] Sin destinatario; se omite envío.");
        return { sent: false };
    }

    const resolvedRegisterUrl = registerUrl || `${getFrontendBaseUrl()}/register`;
    const subject = invitationEmailSubject({ businessName });
    const html = invitationEmailTemplate({
        businessName,
        inviterName,
        role,
        registerUrl: resolvedRegisterUrl,
    });
    const text = invitationEmailText({
        businessName,
        inviterName,
        role,
        registerUrl: resolvedRegisterUrl,
    });

    await sendEmail({ to: to.trim().toLowerCase(), subject, html, text });
    console.info("[emails/invitation] Invitación enviada a:", to);
    return { sent: true };
}
