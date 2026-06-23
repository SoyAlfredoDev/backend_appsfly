/** Metadatos de campañas de email de plataforma (admin). No mezclar con ASMR tenant. */

export const PLATFORM_EMAIL_CAMPAIGN_STATUSES = [
    "DRAFT",
    "SCHEDULED",
    "SENDING",
    "SENT",
    "FAILED",
    "ARCHIVED",
];

export const PLATFORM_EMAIL_AUDIENCE_TYPES = [
    "ALL_USERS",
    "CONFIRMED_EMAIL",
    "PENDING_EMAIL",
    "ACTIVE_SUBSCRIPTION",
    "EXPIRED_SUBSCRIPTION",
    "NEWSLETTER_SUBSCRIBERS",
    "SUSPENDED_BUSINESS_ADMINS",
    "BUSINESS_ADMINS_PLAN_EXPIRING_5D",
    "BUSINESS_ADMINS_PLAN_EXPIRING_TODAY",
    "PLATFORM_PROSPECTS",
    "CUSTOM_SEGMENT",
];

export const PLATFORM_EMAIL_AUDIENCE_LABELS = {
    ALL_USERS: "Todos los usuarios registrados",
    CONFIRMED_EMAIL: "Usuarios con email confirmado",
    PENDING_EMAIL: "Usuarios con email pendiente de confirmación",
    ACTIVE_SUBSCRIPTION: "Negocios con suscripción activa",
    EXPIRED_SUBSCRIPTION: "Negocios con suscripción vencida",
    NEWSLETTER_SUBSCRIBERS: "Suscriptores del newsletter",
    SUSPENDED_BUSINESS_ADMINS:
        "Admins de negocios suspendidos (sin plan activo)",
    BUSINESS_ADMINS_PLAN_EXPIRING_5D:
        "Admins — plan vence en 5 días",
    BUSINESS_ADMINS_PLAN_EXPIRING_TODAY:
        "Admins — plan vence hoy",
    PLATFORM_PROSPECTS:
        "Prospectos (no usuarios AppsFly)",
    CUSTOM_SEGMENT: "Segmento personalizado (próximamente)",
};

export const PLATFORM_EMAIL_STATUS_LABELS = {
    DRAFT: "Borrador",
    SCHEDULED: "Programada",
    SENDING: "Enviando",
    SENT: "Enviada",
    FAILED: "Fallida",
    ARCHIVED: "Archivada",
};

export const EDITABLE_CAMPAIGN_STATUSES = ["DRAFT", "SCHEDULED"];

/** Cupo diario Resend (plan gratuito) y reserva para otras campañas (avisos de plan, etc.) */
export const RESEND_FREE_DAILY_EMAIL_LIMIT = 100;
export const OTHER_CAMPAIGNS_DAILY_EMAIL_RESERVE = 30;
export const PROSPECT_OUTREACH_DEFAULT_MAX_PER_RUN =
    RESEND_FREE_DAILY_EMAIL_LIMIT - OTHER_CAMPAIGNS_DAILY_EMAIL_RESERVE;

/** Días de la semana para outreach prospectos: 1=lun, 3=mié, 5=vie */
export const PROSPECT_OUTREACH_WEEKDAYS = [1, 3, 5];

export const MONTHLY_CAMPAIGN_MIN_DAYS = 28;

/** Campaña predefinida #1 — reactivación mensual */
export const SYSTEM_CAMPAIGN_MONTHLY_SUSPENDED = {
    campaignKey: "monthly-suspended-reactivation",
    campaignName: "Reactivación mensual — negocios suspendidos",
    campaignDescription:
        "Correo mensual a administradores de negocios que no tienen suscripción activa y ven la pantalla de cuenta suspendida en AppsFly. Objetivo: invitarlos a activar o renovar su plan.",
    audienceType: "SUSPENDED_BUSINESS_ADMINS",
    scheduleFrequency: "MONTHLY",
    autoRunDay: 5,
    messageIntent:
        "Recordar al administrador que su negocio está suspendido por falta de plan activo e invitarlo a activar la suscripción desde su perfil.",
    emailSubject: "{{firstName}}, activa tu negocio en AppsFly",
    senderName: "AppsFly Cuentas",
    senderEmail: "reactivacion@appsfly.app",
};

/** Campaña predefinida #2 — aviso 5 días antes del vencimiento */
export const SYSTEM_CAMPAIGN_DAILY_PLAN_EXPIRY_5D = {
    campaignKey: "daily-plan-expiry-warning-5d",
    campaignName: "Aviso de vencimiento — 5 días antes",
    campaignDescription:
        "Correo diario automático a administradores de negocios cuyo plan vence en 5 días (calendario Chile). Informa que deben pagar para renovar y evitar la suspensión del acceso.",
    audienceType: "BUSINESS_ADMINS_PLAN_EXPIRING_5D",
    scheduleFrequency: "DAILY",
    daysBeforeExpiry: 5,
    messageIntent:
        "Advertir al administrador que su plan vence en 5 días, recordar el beneficio del servicio y dirigirlo a pagar o renovar desde su perfil.",
    emailSubject: "{{firstName}}, el plan de {{businessName}} vence en 5 días",
    senderName: "AppsFly Avisos",
    senderEmail: "avisos@appsfly.app",
};

/** Campaña predefinida #3 — aviso el día del vencimiento */
export const SYSTEM_CAMPAIGN_DAILY_PLAN_EXPIRY_TODAY = {
    campaignKey: "daily-plan-expiry-today",
    campaignName: "Aviso de vencimiento — día de hoy",
    campaignDescription:
        "Correo diario automático a administradores de negocios cuyo plan vence hoy (calendario Chile). Mensaje de urgencia para pagar antes de perder el acceso.",
    audienceType: "BUSINESS_ADMINS_PLAN_EXPIRING_TODAY",
    scheduleFrequency: "DAILY",
    daysBeforeExpiry: 0,
    messageIntent:
        "Informar al administrador que su plan vence hoy y que debe pagar inmediatamente para mantener el acceso a AppsFly.",
    emailSubject: "{{firstName}}, el plan de {{businessName}} vence hoy",
    senderName: "AppsFly Pagos",
    senderEmail: "pagos@appsfly.app",
};

/** Campaña predefinida #4 — outreach semanal a prospectos (lun, mié, vie) */
export const SYSTEM_CAMPAIGN_WEEKLY_PROSPECTS = {
    campaignKey: "monthly-prospect-outreach",
    campaignName: "Outreach prospectos — lun, mié, vie",
    campaignDescription:
        `Correo automático lun/mié/vie a prospectos que aún no son clientes. Hasta ${PROSPECT_OUTREACH_DEFAULT_MAX_PER_RUN} correos por ciclo (de ${RESEND_FREE_DAILY_EMAIL_LIMIT}/día en Resend; ${OTHER_CAMPAIGNS_DAILY_EMAIL_RESERVE} reservados para avisos de plan). Máximo 1 correo por prospecto al mes, cola justa y rotación de mensajes y remitentes.`,
    audienceType: "PLATFORM_PROSPECTS",
    scheduleFrequency: "WEEKLY",
    autoRunWeekdays: PROSPECT_OUTREACH_WEEKDAYS,
    messageIntent:
        "Invitar a negocios que no usan AppsFly a registrarse, explicando ventas, inventario, compras, reportes, acceso multi-usuario y seguridad.",
    emailSubject: "{{firstName}}, gestiona ventas e inventario con AppsFly",
    senderName: "AppsFly",
    senderEmail: "hola@appsfly.app",
};

/** @deprecated alias */
export const SYSTEM_CAMPAIGN_MONTHLY_PROSPECTS = SYSTEM_CAMPAIGN_WEEKLY_PROSPECTS;

export const SYSTEM_CAMPAIGN_DEFINITIONS = [
    SYSTEM_CAMPAIGN_MONTHLY_SUSPENDED,
    SYSTEM_CAMPAIGN_DAILY_PLAN_EXPIRY_5D,
    SYSTEM_CAMPAIGN_DAILY_PLAN_EXPIRY_TODAY,
    SYSTEM_CAMPAIGN_WEEKLY_PROSPECTS,
];
