import {
    escapeHtml,
    getFrontendBaseUrl,
    primaryButton,
    wrapEmailLayout,
} from "../../emails/shared/layout.js";

function applyProspectTokens(template, data) {
    return String(template ?? "")
        .replace(/\{\{firstName\}\}/g, data.firstName ?? "")
        .replace(/\{\{businessName\}\}/g, data.businessName ?? "");
}

function unsubscribeFooter(unsubscribeUrl) {
    return `
      <p class="email-muted" style="margin:0 0 12px;font-size:13px;line-height:1.5;color:#6b7280;font-family:Arial,Helvetica,sans-serif;">
        Si ya usas AppsFly, puedes ignorar este mensaje.
      </p>
      <p style="margin:0;font-size:12px;line-height:1.5;color:#9ca3af;font-family:Arial,Helvetica,sans-serif;">
        <a href="${unsubscribeUrl}" style="color:#6b7280;text-decoration:underline;">Darme de baja</a>
        y no recibir más correos de este tipo.
      </p>`;
}

function variantOverviewHtml(data) {
    const name = escapeHtml(data.firstName);
    const registerUrl = data.registerUrl ?? `${getFrontendBaseUrl()}/register`;
    const unsubscribeUrl = data.unsubscribeUrl ?? "#";

    const bodyHtml = `
      <h1 class="email-heading" style="margin:0 0 16px;font-size:22px;line-height:1.3;color:#021f41;font-family:Arial,Helvetica,sans-serif;">
        Gestiona tu negocio con AppsFly
      </h1>
      <p class="email-body-text" style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#374151;font-family:Arial,Helvetica,sans-serif;">
        Hola <strong>${name}</strong>,
      </p>
      <p class="email-body-text" style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#374151;font-family:Arial,Helvetica,sans-serif;">
        <strong>AppsFly</strong> es un sistema en la nube para gestionar <strong>ventas, inventario, compras y finanzas</strong>
        de tu negocio. Trabaja desde <strong>teléfono móvil o web</strong>, con varios usuarios en el mismo negocio,
        con acceso seguro y datos protegidos.
      </p>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 20px;">
        <tr>
          <td style="background-color:#eff6ff;border:1px solid #93c5fd;border-radius:8px;padding:16px;">
            <p style="margin:0 0 10px;font-size:14px;font-weight:700;color:#1d4ed8;font-family:Arial,Helvetica,sans-serif;">
              ¿Qué puedes hacer con AppsFly?
            </p>
            <ul style="margin:0;padding-left:18px;font-size:14px;line-height:1.6;color:#1e3a8a;font-family:Arial,Helvetica,sans-serif;">
              <li>Registrar y controlar ventas en tiempo real</li>
              <li>Gestionar inventario y stock de productos</li>
              <li>Registrar compras y proveedores</li>
              <li>Ver reportes y finanzas de tu negocio</li>
            </ul>
          </td>
        </tr>
      </table>
      ${primaryButton(registerUrl, "Crear mi cuenta en AppsFly")}
      ${unsubscribeFooter(unsubscribeUrl)}`;

    return wrapEmailLayout({
        title: "AppsFly — software para tu negocio",
        preheader: "Ventas, inventario y reportes en un solo lugar.",
        bodyHtml,
    });
}

function variantOfferHtml(data) {
    const name = escapeHtml(data.firstName);
    const registerUrl = data.registerUrl ?? `${getFrontendBaseUrl()}/register`;
    const unsubscribeUrl = data.unsubscribeUrl ?? "#";

    const bodyHtml = `
      <h1 class="email-heading" style="margin:0 0 16px;font-size:22px;line-height:1.3;color:#021f41;font-family:Arial,Helvetica,sans-serif;">
        Prueba AppsFly 2 meses sin costo
      </h1>
      <p class="email-body-text" style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#374151;font-family:Arial,Helvetica,sans-serif;">
        Hola <strong>${name}</strong>,
      </p>
      <p class="email-body-text" style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#374151;font-family:Arial,Helvetica,sans-serif;">
        Queremos que conozcas AppsFly con calma: <strong>2 meses gratis</strong> para probar ventas, inventario,
        compras y reportes. Después, el plan es de <strong>$9.990 por mes</strong> — sin tarjeta para empezar.
      </p>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 20px;">
        <tr>
          <td style="background-color:#fef3c7;border:1px solid #fcd34d;border-radius:8px;padding:16px;">
            <p style="margin:0 0 8px;font-size:15px;font-weight:700;color:#92400e;font-family:Arial,Helvetica,sans-serif;">
              Oferta de bienvenida
            </p>
            <p style="margin:0;font-size:14px;line-height:1.6;color:#78350f;font-family:Arial,Helvetica,sans-serif;">
              Regístrate hoy y opera tu negocio online desde celular o computador, con datos seguros en la nube.
            </p>
          </td>
        </tr>
      </table>
      ${primaryButton(registerUrl, "Empezar mis 2 meses gratis")}
      ${unsubscribeFooter(unsubscribeUrl)}`;

    return wrapEmailLayout({
        title: "AppsFly — 2 meses gratis",
        preheader: "2 meses gratis, luego $9.990/mes. Sin tarjeta para empezar.",
        bodyHtml,
    });
}

function variantTeamHtml(data) {
    const name = escapeHtml(data.firstName);
    const business = escapeHtml(data.businessName);
    const registerUrl = data.registerUrl ?? `${getFrontendBaseUrl()}/register`;
    const unsubscribeUrl = data.unsubscribeUrl ?? "#";

    const bodyHtml = `
      <h1 class="email-heading" style="margin:0 0 16px;font-size:22px;line-height:1.3;color:#021f41;font-family:Arial,Helvetica,sans-serif;">
        Tu equipo en un solo sistema
      </h1>
      <p class="email-body-text" style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#374151;font-family:Arial,Helvetica,sans-serif;">
        Hola <strong>${name}</strong>,
      </p>
      <p class="email-body-text" style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#374151;font-family:Arial,Helvetica,sans-serif;">
        Con AppsFly, <strong>${business}</strong> puede trabajar con varios usuarios al mismo tiempo: ventas en caja,
        control de stock, compras y reportes — todo sincronizado y accesible desde móvil o web.
      </p>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 20px;">
        <tr>
          <td style="background-color:#f0fdf4;border:1px solid #86efac;border-radius:8px;padding:16px;">
            <p style="margin:0;font-size:14px;line-height:1.6;color:#166534;font-family:Arial,Helvetica,sans-serif;">
              <strong>Seguro y protegido:</strong> roles y permisos por usuario, datos en servidores confiables
              y buenas prácticas de seguridad en la plataforma.
            </p>
          </td>
        </tr>
      </table>
      ${primaryButton(registerUrl, "Invitar a mi equipo a AppsFly")}
      ${unsubscribeFooter(unsubscribeUrl)}`;

    return wrapEmailLayout({
        title: "AppsFly — equipo multi-usuario",
        preheader: "Varios usuarios, un solo negocio. Ventas e inventario online.",
        bodyHtml,
    });
}

export const PROSPECT_OUTREACH_VARIANTS = [
    {
        id: "overview",
        subject: "{{firstName}}, gestiona ventas e inventario con AppsFly",
        buildHtml: variantOverviewHtml,
        buildText: (data) => `Hola ${data.firstName ?? ""},

AppsFly es un sistema en la nube para gestionar ventas, inventario, compras y finanzas de tu negocio.
Trabaja desde teléfono móvil o web, con varios usuarios y acceso seguro.

Crea tu cuenta: ${data.registerUrl ?? `${getFrontendBaseUrl()}/register`}

Darme de baja: ${data.unsubscribeUrl ?? "#"}

Equipo AppsFly`,
    },
    {
        id: "offer",
        subject: "{{firstName}}, prueba AppsFly 2 meses sin costo",
        buildText: (data) => `Hola ${data.firstName ?? ""},

Prueba AppsFly 2 meses gratis: ventas, inventario, compras y reportes.
Luego $9.990/mes. No necesitas tarjeta para empezar.

Empezar: ${data.registerUrl ?? `${getFrontendBaseUrl()}/register`}

Darme de baja: ${data.unsubscribeUrl ?? "#"}

Equipo AppsFly`,
        buildHtml: variantOfferHtml,
    },
    {
        id: "team",
        subject: "{{firstName}}, tu equipo en un solo sistema para {{businessName}}",
        buildText: (data) => `Hola ${data.firstName ?? ""},

Con AppsFly, ${data.businessName ?? "tu negocio"} puede operar con varios usuarios: ventas, stock, compras y reportes sincronizados.

Regístrate: ${data.registerUrl ?? `${getFrontendBaseUrl()}/register`}

Darme de baja: ${data.unsubscribeUrl ?? "#"}

Equipo AppsFly`,
        buildHtml: variantTeamHtml,
    },
];

function hashEmailForVariant(email) {
    const normalized = String(email ?? "").trim().toLowerCase();
    let hash = 0;
    for (let i = 0; i < normalized.length; i += 1) {
        hash = (hash * 31 + normalized.charCodeAt(i)) >>> 0;
    }
    return hash;
}

/** Elige variante estable por email (mismo prospecto = mismo ángulo). */
export function pickProspectTemplateVariant(email) {
    const index = hashEmailForVariant(email) % PROSPECT_OUTREACH_VARIANTS.length;
    return PROSPECT_OUTREACH_VARIANTS[index];
}

export function renderProspectOutreachEmail(data, email) {
    const variant = pickProspectTemplateVariant(email ?? data?.email);
    return {
        variantId: variant.id,
        subject: applyProspectTokens(variant.subject, data),
        html: variant.buildHtml(data),
        text: variant.buildText(data),
    };
}

/** @deprecated Usar renderProspectOutreachEmail */
export function buildProspectOutreachHtml(data) {
    return renderProspectOutreachEmail(data, data?.email).html;
}

/** @deprecated Usar renderProspectOutreachEmail */
export function buildProspectOutreachText(data) {
    return renderProspectOutreachEmail(data, data?.email).text;
}
