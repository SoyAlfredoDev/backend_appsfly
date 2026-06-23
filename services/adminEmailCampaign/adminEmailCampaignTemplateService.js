import {
    escapeHtml,
    getFrontendBaseUrl,
    primaryButton,
    wrapEmailLayout,
} from "../../emails/shared/layout.js";
import {
    renderProspectOutreachEmail,
} from "./adminEmailCampaignProspectTemplate.js";
import { buildProspectRegisterClickUrl } from "../emailProspect/emailProspectService.js";



const SAMPLE = {

    firstName: "María",

    lastName: "González",

    businessName: "Óptica Visión Clara",

    profileUrl: `${getFrontendBaseUrl()}/profile`,

    planName: "Plan Profesional",

    expiryDateFormatted: "viernes, 18 de junio de 2026",

    daysUntilExpiry: 5,

    registerUrl: `${getFrontendBaseUrl()}/register`,

    unsubscribeUrl: `${getFrontendBaseUrl()}/prospect-unsubscribe/ejemplo`,

};



function applyTokens(template, data) {

    if (!template) return "";

    return String(template)

        .replace(/\{\{firstName\}\}/g, data.firstName ?? "")

        .replace(/\{\{lastName\}\}/g, data.lastName ?? "")

        .replace(/\{\{businessName\}\}/g, data.businessName ?? "")

        .replace(/\{\{profileUrl\}\}/g, data.profileUrl ?? SAMPLE.profileUrl)

        .replace(/\{\{planName\}\}/g, data.planName ?? "")

        .replace(/\{\{expiryDate\}\}/g, data.expiryDateFormatted ?? "")

        .replace(/\{\{daysUntilExpiry\}\}/g, String(data.daysUntilExpiry ?? ""))
        .replace(/\{\{registerUrl\}\}/g, data.registerUrl ?? `${getFrontendBaseUrl()}/register`)
        .replace(/\{\{unsubscribeUrl\}\}/g, data.unsubscribeUrl ?? "#");
}



function getTemplateVariant(campaign) {

    switch (campaign?.audienceType) {

        case "BUSINESS_ADMINS_PLAN_EXPIRING_5D":

            return "plan_expiry_warning";

        case "BUSINESS_ADMINS_PLAN_EXPIRING_TODAY":

            return "plan_expiry_today";

        case "PLATFORM_PROSPECTS":

            return "prospect_outreach";

        default:

            return "suspended";

    }

}



function suspendedHtmlBody(data) {

    const name = escapeHtml(data.firstName);

    const business = escapeHtml(data.businessName);

    const profileUrl = data.profileUrl;



    const bodyHtml = `

      <h1 class="email-heading" style="margin:0 0 16px;font-size:22px;line-height:1.3;color:#021f41;font-family:Arial,Helvetica,sans-serif;">

        Tu negocio está suspendido

      </h1>

      <p class="email-body-text" style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#374151;font-family:Arial,Helvetica,sans-serif;">

        Hola <strong>${name}</strong>,

      </p>

      <p class="email-body-text" style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#374151;font-family:Arial,Helvetica,sans-serif;">

        El negocio <strong>${business}</strong> no tiene un plan activo en AppsFly en este momento.

        Por eso el acceso a ventas, inventario y reportes está suspendido.

      </p>

      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 20px;">

        <tr>

          <td class="box-alert" style="background-color:#fff7ed;border:1px solid #fdba74;border-radius:8px;padding:16px;">

            <p class="box-alert-title" style="margin:0 0 6px;font-size:14px;font-weight:700;color:#c2410c;font-family:Arial,Helvetica,sans-serif;">

              ¿Qué puedes hacer?

            </p>

            <p style="margin:0;font-size:14px;line-height:1.5;color:#9a3412;font-family:Arial,Helvetica,sans-serif;">

              Activa o renueva tu suscripción desde tu perfil para volver a operar con normalidad.

            </p>

          </td>

        </tr>

      </table>

      ${primaryButton(profileUrl, "Activar mi plan en AppsFly")}

      <p class="email-muted" style="margin:0;font-size:13px;line-height:1.5;color:#6b7280;font-family:Arial,Helvetica,sans-serif;">

        Si ya realizaste un pago recientemente, ignora este mensaje o contáctanos por soporte.

      </p>`;



    return wrapEmailLayout({

        title: applyTokens("Activa tu negocio en AppsFly", data),

        preheader: `Activa el plan de ${data.businessName} y recupera el acceso completo.`,

        bodyHtml,

    });

}



function planExpiryWarningHtmlBody(data) {

    const name = escapeHtml(data.firstName);

    const business = escapeHtml(data.businessName);

    const plan = escapeHtml(data.planName);

    const expiry = escapeHtml(data.expiryDateFormatted);

    const profileUrl = data.profileUrl;



    const bodyHtml = `

      <h1 class="email-heading" style="margin:0 0 16px;font-size:22px;line-height:1.3;color:#021f41;font-family:Arial,Helvetica,sans-serif;">

        Tu plan vence en 5 días

      </h1>

      <p class="email-body-text" style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#374151;font-family:Arial,Helvetica,sans-serif;">

        Hola <strong>${name}</strong>,

      </p>

      <p class="email-body-text" style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#374151;font-family:Arial,Helvetica,sans-serif;">

        El plan <strong>${plan}</strong> del negocio <strong>${business}</strong> vence el

        <strong>${expiry}</strong> (en 5 días). Para seguir usando ventas, inventario y reportes sin interrupciones,

        debes pagar o renovar tu suscripción antes de esa fecha.

      </p>

      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 20px;">

        <tr>

          <td style="background-color:#eff6ff;border:1px solid #93c5fd;border-radius:8px;padding:16px;">

            <p style="margin:0 0 8px;font-size:14px;font-weight:700;color:#1d4ed8;font-family:Arial,Helvetica,sans-serif;">

              Resumen de tu suscripción

            </p>

            <p style="margin:0 0 4px;font-size:14px;line-height:1.5;color:#1e3a8a;font-family:Arial,Helvetica,sans-serif;">

              <strong>Negocio:</strong> ${business}

            </p>

            <p style="margin:0 0 4px;font-size:14px;line-height:1.5;color:#1e3a8a;font-family:Arial,Helvetica,sans-serif;">

              <strong>Plan:</strong> ${plan}

            </p>

            <p style="margin:0;font-size:14px;line-height:1.5;color:#1e3a8a;font-family:Arial,Helvetica,sans-serif;">

              <strong>Vencimiento:</strong> ${expiry}

            </p>

          </td>

        </tr>

      </table>

      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 20px;">

        <tr>

          <td class="box-alert" style="background-color:#fff7ed;border:1px solid #fdba74;border-radius:8px;padding:16px;">

            <p class="box-alert-title" style="margin:0 0 6px;font-size:14px;font-weight:700;color:#c2410c;font-family:Arial,Helvetica,sans-serif;">

              ¿Qué pasa si no pagas?

            </p>

            <p style="margin:0;font-size:14px;line-height:1.5;color:#9a3412;font-family:Arial,Helvetica,sans-serif;">

              Al vencer el plan, el acceso a AppsFly se suspenderá y tu equipo no podrá operar el negocio en la plataforma.

            </p>

          </td>

        </tr>

      </table>

      ${primaryButton(profileUrl, "Renovar mi plan ahora")}

      <p class="email-muted" style="margin:0;font-size:13px;line-height:1.5;color:#6b7280;font-family:Arial,Helvetica,sans-serif;">

        Si ya renovaste tu plan, puedes ignorar este mensaje.

      </p>`;



    return wrapEmailLayout({

        title: applyTokens("Tu plan vence pronto — AppsFly", data),

        preheader: `El plan de ${data.businessName} vence en 5 días. Renueva antes del ${data.expiryDateFormatted}.`,

        bodyHtml,

    });

}



function planExpiryTodayHtmlBody(data) {

    const name = escapeHtml(data.firstName);

    const business = escapeHtml(data.businessName);

    const plan = escapeHtml(data.planName);

    const expiry = escapeHtml(data.expiryDateFormatted);

    const profileUrl = data.profileUrl;



    const bodyHtml = `

      <h1 class="email-heading" style="margin:0 0 16px;font-size:22px;line-height:1.3;color:#b91c1c;font-family:Arial,Helvetica,sans-serif;">

        Tu plan vence hoy

      </h1>

      <p class="email-body-text" style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#374151;font-family:Arial,Helvetica,sans-serif;">

        Hola <strong>${name}</strong>,

      </p>

      <p class="email-body-text" style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#374151;font-family:Arial,Helvetica,sans-serif;">

        El plan <strong>${plan}</strong> del negocio <strong>${business}</strong> <strong>vence hoy</strong>

        (${expiry}). Debes pagar o renovar hoy para mantener el acceso completo a AppsFly.

      </p>

      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 20px;">

        <tr>

          <td style="background-color:#fef2f2;border:1px solid #fca5a5;border-radius:8px;padding:16px;">

            <p style="margin:0 0 8px;font-size:14px;font-weight:700;color:#b91c1c;font-family:Arial,Helvetica,sans-serif;">

              Acción requerida hoy

            </p>

            <p style="margin:0 0 4px;font-size:14px;line-height:1.5;color:#991b1b;font-family:Arial,Helvetica,sans-serif;">

              <strong>Negocio:</strong> ${business}

            </p>

            <p style="margin:0 0 4px;font-size:14px;line-height:1.5;color:#991b1b;font-family:Arial,Helvetica,sans-serif;">

              <strong>Plan:</strong> ${plan}

            </p>

            <p style="margin:0;font-size:14px;line-height:1.5;color:#991b1b;font-family:Arial,Helvetica,sans-serif;">

              <strong>Vence:</strong> hoy — ${expiry}

            </p>

          </td>

        </tr>

      </table>

      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 20px;">

        <tr>

          <td class="box-alert" style="background-color:#fff7ed;border:1px solid #fdba74;border-radius:8px;padding:16px;">

            <p class="box-alert-title" style="margin:0 0 6px;font-size:14px;font-weight:700;color:#c2410c;font-family:Arial,Helvetica,sans-serif;">

              Sin pago, el acceso se suspende

            </p>

            <p style="margin:0;font-size:14px;line-height:1.5;color:#9a3412;font-family:Arial,Helvetica,sans-serif;">

              Al finalizar el día, tu negocio quedará suspendido y no podrás usar ventas, inventario ni reportes hasta renovar.

            </p>

          </td>

        </tr>

      </table>

      ${primaryButton(profileUrl, "Pagar mi plan hoy")}

      <p class="email-muted" style="margin:0;font-size:13px;line-height:1.5;color:#6b7280;font-family:Arial,Helvetica,sans-serif;">

        Si ya pagaste hoy, ignora este mensaje. El acceso se mantiene activo hasta confirmar el pago.

      </p>`;



    return wrapEmailLayout({

        title: applyTokens("Tu plan vence hoy — AppsFly", data),

        preheader: `El plan de ${data.businessName} vence hoy. Paga ahora para no perder el acceso.`,

        bodyHtml,

    });

}



function defaultHtmlBody(campaign, data, recipientEmail = null, renderOptions = {}) {

    const variant = getTemplateVariant(campaign);

    if (variant === "prospect_outreach") {
        return renderProspectOutreachEmail(
            { ...data, email: recipientEmail ?? data.email },
            recipientEmail ?? data.email,
            renderOptions,
        ).html;
    }

    if (variant === "plan_expiry_warning") return planExpiryWarningHtmlBody(data);

    if (variant === "plan_expiry_today") return planExpiryTodayHtmlBody(data);

    return suspendedHtmlBody(data);

}



function defaultTextBody(campaign, data, recipientEmail = null, renderOptions = {}) {

    const variant = getTemplateVariant(campaign);



    if (variant === "prospect_outreach") {
        return renderProspectOutreachEmail(
            { ...data, email: recipientEmail ?? data.email },
            recipientEmail ?? data.email,
            renderOptions,
        ).text;
    }

    if (variant === "plan_expiry_warning") {

        return applyTokens(

            `Hola {{firstName}},



El plan "{{planName}}" del negocio "{{businessName}}" vence el {{expiryDate}} (en 5 días).



Renueva o paga tu suscripción antes de esa fecha para evitar la suspensión del acceso:

{{profileUrl}}



Equipo AppsFly`,

            data,

        );

    }



    if (variant === "plan_expiry_today") {

        return applyTokens(

            `Hola {{firstName}},



El plan "{{planName}}" del negocio "{{businessName}}" vence HOY ({{expiryDate}}).



Paga o renueva hoy para mantener el acceso a AppsFly:

{{profileUrl}}



Equipo AppsFly`,

            data,

        );

    }



    return applyTokens(

        `Hola {{firstName}},



El negocio "{{businessName}}" no tiene un plan activo en AppsFly y tu cuenta está suspendida.



Activa o renueva tu suscripción aquí: {{profileUrl}}



Equipo AppsFly`,

        data,

    );

}



function buildRecipientData(recipient) {

    return {

        firstName: recipient.firstName,

        lastName: recipient.lastName,

        businessName: recipient.businessName,

        planName: recipient.planName ?? SAMPLE.planName,

        expiryDateFormatted: recipient.expiryDateFormatted ?? SAMPLE.expiryDateFormatted,

        daysUntilExpiry: recipient.daysUntilExpiry ?? SAMPLE.daysUntilExpiry,

        registerUrl: recipient.registerUrl ?? SAMPLE.registerUrl,

        unsubscribeUrl: recipient.unsubscribeUrl ?? SAMPLE.unsubscribeUrl,

    };

}



/**

 * @param {object} campaign

 * @param {object} [recipient] - datos para preview o envío

 */

export function renderCampaignEmail(campaign, recipient = null, renderOptions = {}) {

    const data = {

        ...SAMPLE,

        profileUrl: `${getFrontendBaseUrl()}/profile`,

        ...(recipient ? buildRecipientData(recipient) : {}),

    };

    const recipientEmail = recipient?.email ?? null;
    const isProspect = campaign?.audienceType === "PLATFORM_PROSPECTS";

    if (isProspect) {
        const prospectPickOptions = {
            sendIndexInBatch: renderOptions.sendIndexInBatch ?? 0,
            outreachEmailsSent: recipient?.outreachEmailsSent ?? 0,
            variantStats: renderOptions.variantStats ?? null,
            forcedVariantId: renderOptions.forcedVariantId ?? null,
        };
        const prospectData = {
            ...data,
            email: recipientEmail ?? data.email,
        };
        if (renderOptions.campaignRecipientId) {
            prospectData.registerUrl = buildProspectRegisterClickUrl(
                renderOptions.campaignRecipientId,
            );
        }
        const rendered = renderProspectOutreachEmail(
            prospectData,
            recipientEmail,
            prospectPickOptions,
        );
        return {
            subject: rendered.subject,
            html: rendered.html,
            text: rendered.text,
            variantId: rendered.variantId,
            variantName: rendered.variantName,
            pickStrategy: rendered.pickStrategy,
            sampleData: data,
        };
    }

    const subject = applyTokens(campaign.emailSubject, data) ||
          applyTokens("Mensaje de AppsFly", data);



    const html = campaign.emailHtml?.trim()

        ? applyTokens(campaign.emailHtml, data)

        : defaultHtmlBody(campaign, data, recipientEmail, renderOptions);



    const text = campaign.emailText?.trim()

        ? applyTokens(campaign.emailText, data)

        : defaultTextBody(campaign, data, recipientEmail, renderOptions);



    return { subject, html, text, sampleData: data };

}



export function getSamplePreviewRecipient() {

    return { ...SAMPLE };

}

