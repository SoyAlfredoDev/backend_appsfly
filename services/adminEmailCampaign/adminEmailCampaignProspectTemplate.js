import {
    escapeHtml,
    getFrontendBaseUrl,
    primaryButton,
    wrapEmailLayout,
} from "../../emails/shared/layout.js";
import {
    describeVariantPickStrategy,
    pickProspectTemplateVariant,
} from "./adminEmailCampaignProspectVariantPicker.js";

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
    const registerUrl = data.registerUrl ?? `${getFrontendBaseUrl()}/register?from=prospect-email`;
    const unsubscribeUrl = data.unsubscribeUrl ?? "#";

    const bodyHtml = `
      <h1 class="email-heading" style="margin:0 0 16px;font-size:22px;line-height:1.3;color:#021f41;font-family:Arial,Helvetica,sans-serif;">
        Deja de perder ventas por desorden
      </h1>
      <p class="email-body-text" style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#374151;font-family:Arial,Helvetica,sans-serif;">
        Hola <strong>${name}</strong>,
      </p>
      <p class="email-body-text" style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#374151;font-family:Arial,Helvetica,sans-serif;">
        Muchos negocios pierden dinero cada día porque venden en un lado, el stock lo llevan en otro
        y las compras en una planilla distinta. <strong>AppsFly</strong> concentra ventas, inventario,
        compras y finanzas en un solo sistema — desde el celular o la web, con datos seguros en la nube.
      </p>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 20px;">
        <tr>
          <td style="background-color:#eff6ff;border:1px solid #93c5fd;border-radius:8px;padding:16px;">
            <p style="margin:0 0 10px;font-size:14px;font-weight:700;color:#1d4ed8;font-family:Arial,Helvetica,sans-serif;">
              Lo que resuelve AppsFly desde el día uno
            </p>
            <ul style="margin:0;padding-left:18px;font-size:14px;line-height:1.6;color:#1e3a8a;font-family:Arial,Helvetica,sans-serif;">
              <li>Registrar cada venta y saber cuánto vendiste hoy</li>
              <li>Controlar stock antes de quedarte sin producto</li>
              <li>Ordenar compras y proveedores sin planillas</li>
              <li>Ver reportes claros para decidir con datos</li>
            </ul>
          </td>
        </tr>
      </table>
      <p class="email-body-text" style="margin:0 0 20px;font-size:14px;line-height:1.6;color:#4b5563;font-family:Arial,Helvetica,sans-serif;">
        Sin instalaciones complicadas. Empiezas en minutos y tu equipo puede sumarse cuando quieras.
      </p>
      ${primaryButton(registerUrl, "Quiero probar AppsFly gratis")}
      ${unsubscribeFooter(unsubscribeUrl)}`;

    return wrapEmailLayout({
        title: "AppsFly — ordena tu negocio",
        preheader: "Ventas, stock y reportes en un solo lugar. Empieza gratis.",
        bodyHtml,
    });
}

function variantOfferHtml(data) {
    const name = escapeHtml(data.firstName);
    const registerUrl = data.registerUrl ?? `${getFrontendBaseUrl()}/register?from=prospect-email`;
    const unsubscribeUrl = data.unsubscribeUrl ?? "#";

    const bodyHtml = `
      <h1 class="email-heading" style="margin:0 0 16px;font-size:22px;line-height:1.3;color:#021f41;font-family:Arial,Helvetica,sans-serif;">
        2 meses gratis para ordenar tu negocio
      </h1>
      <p class="email-body-text" style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#374151;font-family:Arial,Helvetica,sans-serif;">
        Hola <strong>${name}</strong>,
      </p>
      <p class="email-body-text" style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#374151;font-family:Arial,Helvetica,sans-serif;">
        Queremos que pruebes AppsFly con calma: <strong>2 meses sin costo</strong> para manejar ventas,
        inventario y reportes. Después, el plan es de solo <strong>$9.990 al mes</strong> — menos que un
        error de inventario mal anotado.
      </p>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 20px;">
        <tr>
          <td style="background-color:#fef3c7;border:1px solid #fcd34d;border-radius:8px;padding:16px;">
            <p style="margin:0 0 8px;font-size:15px;font-weight:700;color:#92400e;font-family:Arial,Helvetica,sans-serif;">
              Oferta de bienvenida
            </p>
            <p style="margin:0;font-size:14px;line-height:1.6;color:#78350f;font-family:Arial,Helvetica,sans-serif;">
              Regístrate hoy, opera desde celular o computador y decide con datos reales
              si AppsFly es para tu negocio. Sin tarjeta para empezar.
            </p>
          </td>
        </tr>
      </table>
      ${primaryButton(registerUrl, "Activar mis 2 meses gratis")}
      ${unsubscribeFooter(unsubscribeUrl)}`;

    return wrapEmailLayout({
        title: "AppsFly — 2 meses gratis",
        preheader: "Prueba 2 meses sin costo. Luego $9.990/mes.",
        bodyHtml,
    });
}

function variantTeamHtml(data) {
    const name = escapeHtml(data.firstName);
    const business = escapeHtml(data.businessName);
    const registerUrl = data.registerUrl ?? `${getFrontendBaseUrl()}/register?from=prospect-email`;
    const unsubscribeUrl = data.unsubscribeUrl ?? "#";

    const bodyHtml = `
      <h1 class="email-heading" style="margin:0 0 16px;font-size:22px;line-height:1.3;color:#021f41;font-family:Arial,Helvetica,sans-serif;">
        Tu equipo, un solo sistema
      </h1>
      <p class="email-body-text" style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#374151;font-family:Arial,Helvetica,sans-serif;">
        Hola <strong>${name}</strong>,
      </p>
      <p class="email-body-text" style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#374151;font-family:Arial,Helvetica,sans-serif;">
        Si en <strong>${business}</strong> vende una persona, compra otra y tú revisas los números a mano,
        AppsFly les da a todos la misma información en tiempo real: caja, stock, compras y reportes
        sincronizados desde móvil o web.
      </p>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 20px;">
        <tr>
          <td style="background-color:#f0fdf4;border:1px solid #86efac;border-radius:8px;padding:16px;">
            <p style="margin:0 0 8px;font-size:14px;font-weight:700;color:#166534;font-family:Arial,Helvetica,sans-serif;">
              Pensado para equipos pequeños
            </p>
            <p style="margin:0;font-size:14px;line-height:1.6;color:#166534;font-family:Arial,Helvetica,sans-serif;">
              Roles y permisos por usuario, historial de movimientos y datos protegidos en la nube.
              Menos WhatsApps preguntando «¿cuánto queda?».
            </p>
          </td>
        </tr>
      </table>
      ${primaryButton(registerUrl, "Crear cuenta para mi equipo")}
      ${unsubscribeFooter(unsubscribeUrl)}`;

    return wrapEmailLayout({
        title: "AppsFly — equipo conectado",
        preheader: "Varios usuarios, un negocio. Ventas e inventario al día.",
        bodyHtml,
    });
}

export const PROSPECT_OUTREACH_VARIANTS = [
    {
        id: "overview",
        name: "Propuesta de valor",
        marketingAngle: "Dolor: desorden entre ventas, stock y planillas",
        goal: "Despertar interés mostrando el problema que AppsFly resuelve",
        subject: "{{firstName}}, ¿sigues llevando ventas e inventario aparte?",
        preheader: "Un solo sistema para vender, controlar stock y ver reportes.",
        buildHtml: variantOverviewHtml,
        buildText: (data) => `Hola ${data.firstName ?? ""},

¿Sigues llevando ventas, inventario y compras en lugares distintos? AppsFly los concentra en un solo sistema en la nube — celular o web, con datos seguros.

• Registrar ventas en tiempo real
• Controlar stock
• Ordenar compras y proveedores
• Ver reportes para decidir mejor

Prueba gratis: ${data.registerUrl ?? `${getFrontendBaseUrl()}/register?from=prospect-email`}

Darme de baja: ${data.unsubscribeUrl ?? "#"}

Equipo AppsFly`,
    },
    {
        id: "offer",
        name: "Oferta 2 meses gratis",
        marketingAngle: "Incentivo de bajo riesgo + precio accesible",
        goal: "Convertir con prueba gratuita y urgencia suave",
        subject: "{{firstName}}, 2 meses gratis para probar AppsFly",
        preheader: "Sin tarjeta para empezar. Luego $9.990/mes.",
        buildText: (data) => `Hola ${data.firstName ?? ""},

Prueba AppsFly 2 meses sin costo: ventas, inventario, compras y reportes.
Después $9.990/mes. Sin tarjeta para empezar.

Activar oferta: ${data.registerUrl ?? `${getFrontendBaseUrl()}/register?from=prospect-email`}

Darme de baja: ${data.unsubscribeUrl ?? "#"}

Equipo AppsFly`,
        buildHtml: variantOfferHtml,
    },
    {
        id: "team",
        name: "Equipo multi-usuario",
        marketingAngle: "Dolor: varias personas sin la misma información",
        goal: "Atraer negocios con más de una persona operando",
        subject: "{{firstName}}, conecta a tu equipo en {{businessName}}",
        preheader: "Ventas, stock y reportes sincronizados para todo el equipo.",
        buildText: (data) => `Hola ${data.firstName ?? ""},

Con AppsFly, ${data.businessName ?? "tu negocio"} puede operar con varios usuarios: ventas, stock, compras y reportes sincronizados desde móvil o web.

Crear cuenta: ${data.registerUrl ?? `${getFrontendBaseUrl()}/register?from=prospect-email`}

Darme de baja: ${data.unsubscribeUrl ?? "#"}

Equipo AppsFly`,
        buildHtml: variantTeamHtml,
    },
];

export function getProspectVariantById(variantId) {
    return PROSPECT_OUTREACH_VARIANTS.find((variant) => variant.id === variantId) ?? null;
}

export function renderProspectOutreachEmail(data, email, pickOptions = {}) {
    const variant = pickProspectTemplateVariant({
        ...pickOptions,
    });

    return {
        variantId: variant.id,
        variantName: variant.name,
        marketingAngle: variant.marketingAngle,
        subject: applyProspectTokens(variant.subject, data),
        html: variant.buildHtml(data),
        text: variant.buildText(data),
        pickStrategy: describeVariantPickStrategy({
            outreachEmailsSent: pickOptions.outreachEmailsSent ?? 0,
            variantStats: pickOptions.variantStats ?? null,
        }),
    };
}

export function renderProspectOutreachPreview(variantId, data) {
    const variant = getProspectVariantById(variantId);
    if (!variant) return null;

    return {
        variantId: variant.id,
        variantName: variant.name,
        marketingAngle: variant.marketingAngle,
        goal: variant.goal,
        subject: applyProspectTokens(variant.subject, data),
        preheader: variant.preheader,
        html: variant.buildHtml(data),
        text: variant.buildText(data),
    };
}

