import {
    escapeHtml,
    getFrontendBaseUrl,
    primaryButton,
    wrapEmailLayout,
} from "../../shared/layout.js";

export function buildConfirmEmailUrl(userId) {
    return `${getFrontendBaseUrl()}/users/${userId}/confirm-email`;
}

export function confirmEmailSubject() {
    return "Confirma tu cuenta — AppsFly";
}

export function confirmEmailTemplate({ firstName, lastName, confirmationUrl }) {
    const safeName = escapeHtml(
        [firstName, lastName].filter(Boolean).join(" ").trim() || "Usuario",
    );
    const actionUrl = confirmationUrl || "#";

    const bodyHtml = `
      <p class="email-body-text" style="margin:0 0 16px;font-size:16px;line-height:1.65;color:#374151;font-family:Arial,Helvetica,sans-serif;">
        Hola <strong class="email-heading" style="color:#021f41;">${safeName}</strong>,
      </p>
      <p class="email-body-text" style="margin:0 0 24px;font-size:16px;line-height:1.65;color:#374151;font-family:Arial,Helvetica,sans-serif;">
        Gracias por registrarte en AppsFly. Confirma tu correo electrónico para activar tu cuenta y acceder a todas las funciones.
      </p>

      ${primaryButton(actionUrl, "Confirmar mi cuenta")}

      <p class="email-muted" style="margin:24px 0 0;font-size:14px;line-height:1.65;color:#6b7280;font-family:Arial,Helvetica,sans-serif;">
        Si no creaste esta cuenta, puedes ignorar este mensaje de forma segura.
      </p>`;

    return wrapEmailLayout({
        title: "Confirma tu cuenta",
        preheader: "Confirma tu correo para activar tu cuenta en AppsFly.",
        bodyHtml,
    });
}

export function confirmEmailText({ firstName, lastName, confirmationUrl }) {
    const name = [firstName, lastName].filter(Boolean).join(" ").trim() || "Usuario";
    const actionUrl = confirmationUrl || buildConfirmEmailUrl("");

    return `Hola ${name},

Gracias por registrarte en AppsFly. Confirma tu correo visitando el siguiente enlace:

${actionUrl}

Si no creaste esta cuenta, ignora este mensaje.

— AppsFly`;
}
