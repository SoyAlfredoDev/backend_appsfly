import {
    escapeHtml,
    getFrontendBaseUrl,
    primaryButton,
    wrapEmailLayout,
} from "../../shared/layout.js";
import { getTenantRoleLabel } from "../../../libs/tenantRoleLabels.js";

function formatRoleLabel(role) {
    return getTenantRoleLabel(role);
}

export function invitationEmailSubject({ businessName }) {
    const name = businessName?.trim() || "un negocio en AppsFly";
    return `Invitación a AppsFly — únete a ${name}`;
}

export function invitationEmailTemplate({
    businessName,
    inviterName,
    role,
    registerUrl,
}) {
    const safeBusiness = escapeHtml(businessName || "tu equipo");
    const safeInviter = escapeHtml(inviterName || "Un administrador");
    const roleLabel = escapeHtml(formatRoleLabel(role));
    const actionUrl = registerUrl || `${getFrontendBaseUrl()}/register`;

    const bodyHtml = `
      <p class="email-body-text" style="margin:0 0 16px;font-size:16px;line-height:1.65;color:#374151;font-family:Arial,Helvetica,sans-serif;">
        Hola,
      </p>
      <p class="email-body-text" style="margin:0 0 24px;font-size:16px;line-height:1.65;color:#374151;font-family:Arial,Helvetica,sans-serif;">
        <strong class="email-heading" style="color:#021f41;">${safeInviter}</strong> te invitó a colaborar en
        <strong class="email-heading" style="color:#021f41;">${safeBusiness}</strong> dentro de AppsFly.
      </p>

      <table role="presentation" class="box-success" width="100%" cellspacing="0" cellpadding="0" border="0"
             bgcolor="#ecfdf5" style="margin-bottom:28px;background-color:#ecfdf5;border-radius:10px;border:1px solid #a7f3d0;">
        <tr>
          <td style="padding:22px 24px;">
            <p class="box-success-title" style="margin:0 0 8px;font-size:11px;font-weight:700;color:#047857;text-transform:uppercase;letter-spacing:0.5px;font-family:Arial,Helvetica,sans-serif;">
              Tu rol asignado
            </p>
            <p class="email-heading" style="margin:0;font-size:20px;font-weight:700;color:#021f41;font-family:Arial,Helvetica,sans-serif;">
              ${roleLabel}
            </p>
          </td>
        </tr>
      </table>

      <p class="email-body-text" style="margin:0 0 24px;font-size:15px;line-height:1.65;color:#374151;font-family:Arial,Helvetica,sans-serif;">
        Usa el botón siguiente para crear tu cuenta. Tu correo ya vendrá completado en el formulario; debes registrarte con el mismo email al que llegó esta invitación.
      </p>

      ${primaryButton(actionUrl, "Crear cuenta o iniciar sesión")}

      <p class="email-muted" style="margin:0;font-size:14px;line-height:1.65;color:#6b7280;font-family:Arial,Helvetica,sans-serif;">
        Si no esperabas esta invitación, puedes ignorar este mensaje. ¿Dudas? Escríbenos a
        <a href="mailto:soporte@appsfly.app" style="color:#094fd1;text-decoration:underline;">soporte@appsfly.app</a>.
      </p>`;

    return wrapEmailLayout({
        title: "Invitación a AppsFly",
        preheader: `${inviterName || "Un administrador"} te invitó a ${businessName || "AppsFly"}.`,
        bodyHtml,
    });
}

export function invitationEmailText({
    businessName,
    inviterName,
    role,
    registerUrl,
}) {
    const roleLabel = formatRoleLabel(role);
    const actionUrl = registerUrl || `${getFrontendBaseUrl()}/register`;

    return `Hola,

${inviterName || "Un administrador"} te invitó a colaborar en ${businessName || "un negocio"} en AppsFly.

Rol asignado: ${roleLabel}

Crea tu cuenta con el enlace siguiente (tu correo ya estará en el formulario):
${actionUrl}

Si no esperabas esta invitación, ignora este mensaje.

— AppsFly`;
}
