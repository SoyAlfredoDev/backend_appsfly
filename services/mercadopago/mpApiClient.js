const MP_API_BASE = "https://api.mercadopago.com";

function getMercadoPagoAccessToken() {
    return process.env.MERCADO_PAGO_ACCESS_TOKEN?.trim() || null;
}

function isLocalhostUrl(url) {
    return /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/i.test(String(url || ""));
}

function normalizeBaseUrl(url) {
    return String(url || "").replace(/\/+$/, "");
}

function getFrontendBaseUrl() {
    const isProduction =
        process.env.APP_ENV === "production" ||
        process.env.NODE_ENV === "production" ||
        process.env.VERCEL === "1";

    if (isProduction) {
        return normalizeBaseUrl(process.env.FRONTEND_URL_PRODUCTION || "https://appsfly.app");
    }
    return normalizeBaseUrl(process.env.FRONTEND_URL || "http://localhost:5173");
}

/** MP exige URLs públicas en back_urls; localhost provoca "back_url.success must be defined". */
function getPreferenceFrontendBaseUrl() {
    const configured = getFrontendBaseUrl();
    if (isLocalhostUrl(configured)) {
        return normalizeBaseUrl(
            process.env.FRONTEND_URL_PRODUCTION || "https://appsfly.app",
        );
    }
    return configured;
}

function buildPreferenceBackUrls() {
    const base = getPreferenceFrontendBaseUrl();
    return {
        success: `${base}/subscription/payment/return?status=success`,
        failure: `${base}/subscription/payment/return?status=failure`,
        pending: `${base}/subscription/payment/return?status=pending`,
    };
}

function getBackendBaseUrl() {
    const isProduction =
        process.env.APP_ENV === "production" ||
        process.env.NODE_ENV === "production" ||
        process.env.VERCEL === "1";

    if (isProduction) {
        return process.env.BACKEND_URL_PRODUCTION || "https://api.appsfly.app";
    }
    return process.env.BACKEND_URL || "http://localhost:3000";
}

/** MP rechaza localhost en notification_url; en local apuntamos al backend público. */
function getWebhookBaseUrl() {
    const configured = normalizeBaseUrl(getBackendBaseUrl());
    if (isLocalhostUrl(configured)) {
        return normalizeBaseUrl(
            process.env.BACKEND_URL_PRODUCTION || "https://api.appsfly.app",
        );
    }
    return configured;
}

function buildWebhookUrl() {
    return `${getWebhookBaseUrl()}/api/subscriptions/mercadopago/webhook`;
}

export function isMercadoPagoConfigured() {
    return Boolean(getMercadoPagoAccessToken());
}

export async function createMercadoPagoPreference({
    title,
    amount,
    currency = "CLP",
    externalReference,
    payerEmail,
}) {
    const token = getMercadoPagoAccessToken();
    if (!token) {
        throw new Error("Mercado Pago no está configurado. Define MERCADO_PAGO_ACCESS_TOKEN.");
    }

    const frontendBase = getFrontendBaseUrl();
    const backUrls = buildPreferenceBackUrls();

    const preferencePayload = {
        items: [
            {
                id: externalReference,
                title,
                quantity: 1,
                unit_price: Number(amount),
                currency_id: currency,
            },
        ],
        payer: payerEmail ? { email: payerEmail } : undefined,
        external_reference: externalReference,
        back_urls: backUrls,
        notification_url: buildWebhookUrl(),
        statement_descriptor: "APPSFLY",
    };

    // auto_return requiere back_urls.success HTTPS públicas; en local usamos Payment Brick sin redirect.
    if (!isLocalhostUrl(frontendBase)) {
        preferencePayload.auto_return = "approved";
    }

    const response = await fetch(`${MP_API_BASE}/checkout/preferences`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(preferencePayload),
    });

    const data = await response.json();
    if (!response.ok) {
        console.error("[mercadopago/mpApiClient] preference error:", data);
        throw new Error(data?.message || "No se pudo crear la preferencia de Mercado Pago.");
    }

    return {
        preferenceId: data.id,
        initPoint: data.init_point,
        sandboxInitPoint: data.sandbox_init_point,
    };
}

export async function getMercadoPagoPayment(paymentId) {
    const token = getMercadoPagoAccessToken();
    if (!token) {
        throw new Error("Mercado Pago no está configurado.");
    }

    const response = await fetch(`${MP_API_BASE}/v1/payments/${paymentId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();
    if (!response.ok) {
        console.error("[mercadopago/mpApiClient] payment fetch error:", data);
        throw new Error(data?.message || "No se pudo consultar el pago en Mercado Pago.");
    }

    return data;
}

export function mapMercadoPagoStatus(mpStatus) {
    const normalized = String(mpStatus || "").toLowerCase();
    if (normalized === "approved") return "APPROVED";
    if (["rejected", "cancelled", "refunded", "charged_back"].includes(normalized)) {
        return "REJECTED";
    }
    return "PENDING";
}

/**
 * Procesa pago desde Payment Brick (token generado en cliente).
 * @see https://www.mercadopago.cl/developers/es/docs/checkout-bricks/payment-brick/default-rendering
 */
export async function createMercadoPagoPaymentFromBrick({
    formData,
    externalReference,
    description,
    idempotencyKey,
}) {
    const token = getMercadoPagoAccessToken();
    if (!token) {
        throw new Error("Mercado Pago no está configurado.");
    }

    const payload = {
        token: formData.token,
        transaction_amount: Number(formData.transaction_amount),
        installments: Number(formData.installments ?? 1),
        payment_method_id: formData.payment_method_id,
        payer: formData.payer,
        external_reference: externalReference,
        description,
        notification_url: buildWebhookUrl(),
    };

    if (formData.issuer_id != null && formData.issuer_id !== "") {
        payload.issuer_id = formData.issuer_id;
    }

    const response = await fetch(`${MP_API_BASE}/v1/payments`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "X-Idempotency-Key": idempotencyKey || externalReference,
        },
        body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (!response.ok) {
        console.error("[mercadopago/mpApiClient] brick payment error:", data);
        throw new Error(
            data?.message
            || data?.cause?.[0]?.description
            || "No se pudo procesar el pago con Mercado Pago.",
        );
    }

    return data;
}

export { getFrontendBaseUrl, getBackendBaseUrl };
