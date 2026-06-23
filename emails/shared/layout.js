/**
 * Logo blanco de AppsFly — frontend/public/logo-appsfly-white.png
 * Debe ser accesible públicamente en el host del frontend (Vercel / appsfly.app).
 */
export function getFrontendBaseUrl() {
    const base = (
        process.env.FRONTEND_URL_PRODUCTION ||
        process.env.FRONTEND_URL ||
        "https://appsfly.app"
    ).replace(/\/+$/, "");
    return base;
}

export function getBackendBaseUrl() {
    const isProduction =
        process.env.APP_ENV === "production"
        || process.env.NODE_ENV === "production"
        || process.env.VERCEL === "1";

    const base = isProduction
        ? (process.env.BACKEND_URL_PRODUCTION || "https://api.appsfly.app")
        : (process.env.BACKEND_URL || "http://localhost:3000");

    return String(base).replace(/\/+$/, "");
}

export function getAppsFlyEmailLogoUrl() {
    if (process.env.APPSFLY_EMAIL_LOGO_URL?.trim()) {
        return process.env.APPSFLY_EMAIL_LOGO_URL.trim();
    }
    const base = (process.env.FRONTEND_URL_PRODUCTION || "https://appsfly.app").replace(/\/+$/, "");
    return `${base}/logo-appsfly-white.png`;
}

export function formatCurrency(amount, currency = "CLP") {
    const value = Number(amount ?? 0);
    if (currency === "CLP") {
        return `$${Math.round(value).toLocaleString("es-CL")} CLP`;
    }
    return `${value.toLocaleString("es-CL")} ${currency}`;
}

export function formatDateLong(date) {
    return new Date(date).toLocaleDateString("es-CL", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

export function formatDateTime(date) {
    return new Date(date).toLocaleString("es-CL", {
        timeZone: "America/Santiago",
        dateStyle: "long",
        timeStyle: "short",
    });
}

export function escapeHtml(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

/** Estilos embebidos: legibles en modo claro y oscuro del sistema/dispositivo. */
function emailStyles() {
    return `<style>
    :root { color-scheme: light; supported-color-schemes: light; }
    body, table, td, p, a, span { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    img { border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; display: block; }
    .email-outer { background-color: #eef2f6 !important; }
    .email-card { background-color: #ffffff !important; }
    .email-header { background-color: #021f41 !important; }
    .email-body-text { color: #374151 !important; }
    .email-muted { color: #6b7280 !important; }
    .email-heading { color: #021f41 !important; }
    .email-footer-text { color: #9ca3af !important; }
    .receipt-label { color: #6b7280 !important; }
    .receipt-value { color: #021f41 !important; }
    .box-success { background-color: #ecfdf5 !important; border: 1px solid #a7f3d0 !important; }
    .box-alert { background-color: #fff7ed !important; border: 1px solid #fdba74 !important; }
    .box-success-title { color: #047857 !important; }
    .box-alert-title { color: #c2410c !important; }
    .btn-primary { background-color: #01c676 !important; color: #ffffff !important; }
    @media (prefers-color-scheme: dark) {
      .email-outer { background-color: #eef2f6 !important; }
      .email-card { background-color: #ffffff !important; }
      .email-header { background-color: #021f41 !important; }
      .email-body-text { color: #374151 !important; }
      .email-muted { color: #6b7280 !important; }
      .email-heading { color: #021f41 !important; }
      .email-footer-text { color: #9ca3af !important; }
      .receipt-label { color: #6b7280 !important; }
      .receipt-value { color: #021f41 !important; }
      .box-success { background-color: #ecfdf5 !important; border-color: #a7f3d0 !important; }
      .box-alert { background-color: #fff7ed !important; border-color: #fdba74 !important; }
      .box-success-title { color: #047857 !important; }
      .box-alert-title { color: #c2410c !important; }
      .btn-primary { background-color: #01c676 !important; color: #ffffff !important; }
    }
    [data-ogsc] .email-card { background-color: #ffffff !important; }
    [data-ogsc] .email-body-text { color: #374151 !important; }
    u + .body .email-card { background-color: #ffffff !important; mix-blend-mode: normal !important; }
  </style>`;
}

/** Layout base con logo oficial y colores estables en cualquier tema del dispositivo. */
export function wrapEmailLayout({ title, preheader, bodyHtml }) {
    const year = new Date().getFullYear();
    const logoUrl = getAppsFlyEmailLogoUrl();

    return `<!DOCTYPE html>
<html lang="es" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>${escapeHtml(title)}</title>
  ${emailStyles()}
  <!--[if mso]>
  <style>table,td{font-family:Arial,Helvetica,sans-serif!important}</style>
  <![endif]-->
</head>
<body class="body" style="margin:0;padding:0;background-color:#eef2f6;font-family:Arial,Helvetica,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">${escapeHtml(preheader)}&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;</div>
  <table role="presentation" class="email-outer" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#eef2f6" style="background-color:#eef2f6;padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" class="email-card" width="600" cellspacing="0" cellpadding="0" border="0" bgcolor="#ffffff" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;">
          <!-- Header con logo (imagen: no se invierte en dark mode) -->
          <tr>
            <td class="email-header" align="center" bgcolor="#021f41" style="background-color:#021f41;padding:32px 24px;">
              <img
                src="${escapeHtml(logoUrl)}"
                alt="AppsFly"
                width="168"
                height="48"
                style="width:168px;max-width:168px;height:auto;margin:0 auto 12px;display:block;"
              />
              <p style="margin:0;font-size:13px;line-height:1.4;color:#cbd5e1;font-family:Arial,Helvetica,sans-serif;">
                Gestión inteligente para tu negocio
              </p>
            </td>
          </tr>
          <!-- Cuerpo -->
          <tr>
            <td bgcolor="#ffffff" style="background-color:#ffffff;padding:32px 28px 24px;">
              ${bodyHtml}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td bgcolor="#ffffff" style="background-color:#ffffff;padding:16px 28px 28px;border-top:1px solid #e5e7eb;text-align:center;">
              <p class="email-footer-text" style="margin:0 0 6px;font-size:12px;line-height:1.5;color:#9ca3af;font-family:Arial,Helvetica,sans-serif;">
                Este es un mensaje automático. Por favor no respondas a este correo.
              </p>
              <p class="email-footer-text" style="margin:0;font-size:12px;color:#9ca3af;font-family:Arial,Helvetica,sans-serif;">
                &copy; ${year} AppsFly. Todos los derechos reservados.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function receiptRow(label, value, isLast = false) {
    const border = isLast ? "none" : "1px solid #eef2f7";
    return `<tr>
      <td class="receipt-label" style="padding:12px 8px 12px 0;border-bottom:${border};font-size:14px;color:#6b7280;width:40%;vertical-align:top;font-family:Arial,Helvetica,sans-serif;">${escapeHtml(label)}</td>
      <td class="receipt-value" style="padding:12px 0 12px 8px;border-bottom:${border};font-size:14px;color:#021f41;font-weight:600;text-align:right;vertical-align:top;word-break:break-word;font-family:Arial,Helvetica,sans-serif;">${value}</td>
    </tr>`;
}

export function primaryButton(href, label) {
    return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
      <tr>
        <td align="center" style="padding:8px 0 20px;">
          <!--[if mso]>
          <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" href="${escapeHtml(href)}" style="height:48px;v-text-anchor:middle;width:260px;" arcsize="12%" strokecolor="#01c676" fillcolor="#01c676">
            <w:anchorlock/>
            <center style="color:#ffffff;font-family:Arial,sans-serif;font-size:15px;font-weight:bold;">${escapeHtml(label)}</center>
          </v:roundrect>
          <![endif]-->
          <!--[if !mso]><!-->
          <a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer" class="btn-primary"
             style="display:inline-block;background-color:#01c676;color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;padding:14px 28px;border-radius:8px;font-family:Arial,Helvetica,sans-serif;mso-padding-alt:0;">
            ${escapeHtml(label)}
          </a>
          <!--<![endif]-->
        </td>
      </tr>
    </table>`;
}
