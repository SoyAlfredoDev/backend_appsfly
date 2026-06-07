/**
 * Credenciales Mercado Pago — único punto de lectura en backend.
 * Nunca importar este módulo desde el frontend.
 *
 * Variables oficiales:
 * - MERCADO_PAGO_ACCESS_TOKEN
 * - MERCADO_PAGO_CLIENT_ID
 * - MERCADO_PAGO_CLIENT_SECRET
 * - MERCADO_PAGO_WEBHOOK_SECRET (firma x-signature, panel Webhooks)
 */

function trimEnv(name) {
    return process.env[name]?.trim() || null;
}

export function getMercadoPagoAccessToken() {
    return trimEnv("MERCADO_PAGO_ACCESS_TOKEN");
}

export function getMercadoPagoClientId() {
    return trimEnv("MERCADO_PAGO_CLIENT_ID");
}

export function getMercadoPagoClientSecret() {
    return trimEnv("MERCADO_PAGO_CLIENT_SECRET");
}

/** Secreto de firma Webhooks — panel MP → Webhooks → Secret signature */
export function getMercadoPagoWebhookSecret() {
    return trimEnv("MERCADO_PAGO_WEBHOOK_SECRET");
}

export function isMercadoPagoBackendConfigured() {
    return Boolean(getMercadoPagoAccessToken());
}

/** Para OAuth / flujos que requieran client credentials (futuro) */
export function hasMercadoPagoOAuthCredentials() {
    return Boolean(getMercadoPagoClientId() && getMercadoPagoClientSecret());
}
