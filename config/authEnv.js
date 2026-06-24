/**
 * Configuración global Auth.cl (YAMT API).
 * @see https://auth.cl
 * @see https://yamt.com/api
 */

export function getAuthApiBaseUrl() {
    const env = process.env.AUTH_API_ENVIRONMENT || "sandbox";
    if (env === "production") {
        return (
            process.env.AUTH_API_BASE_URL_PRODUCTION ||
            process.env.AUTH_API_BASE_URL ||
            "https://api.yamt.com"
        );
    }
    return (
        process.env.AUTH_API_BASE_URL_SANDBOX ||
        process.env.AUTH_API_BASE_URL ||
        "https://api.yamt.com"
    );
}

/** API Key / Bearer token global (fallback si la empresa no tiene credenciales propias). */
export function getAuthApiKey() {
    return process.env.AUTH_API_KEY?.trim() || null;
}

export function getAuthApiSecret() {
    return process.env.AUTH_API_SECRET?.trim() || null;
}

export function isAuthGloballyConfigured() {
    return Boolean(getAuthApiKey());
}

export function getTaxRetryMaxAttempts() {
    const n = Number(process.env.TAX_DOCUMENT_RETRY_MAX || 3);
    return Number.isFinite(n) && n > 0 ? n : 3;
}

export function getAuthEncryptionKey() {
    return process.env.AUTH_CREDENTIALS_ENCRYPTION_KEY?.trim() || null;
}
