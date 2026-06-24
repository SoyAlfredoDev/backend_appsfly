import {
    getAuthApiBaseUrl,
    getAuthApiKey,
    getAuthApiSecret,
} from "../../../../config/authEnv.js";
import { decryptCredential } from "../../../../libs/taxCredentialCipher.js";
import { TaxProviderError } from "../../errors.js";

function resolveCredentials(taxAccount) {
    const apiKey =
        decryptCredential(taxAccount?.authApiKey) ||
        getAuthApiKey();
    const apiSecret =
        decryptCredential(taxAccount?.authApiSecret) ||
        getAuthApiSecret();

    return { apiKey, apiSecret };
}

export function isAuthConfigured(taxAccount) {
    const { apiKey } = resolveCredentials(taxAccount);
    return Boolean(apiKey);
}

/**
 * Cliente HTTP Auth.cl (API REST YAMT).
 * @see https://auth.cl — POST /v1/dte, GET /v1/dte/{id}, GET /v1/dte/{id}/pdf
 */
async function authFetch(path, { method = "POST", body, taxAccount } = {}) {
    const { apiKey, apiSecret } = resolveCredentials(taxAccount);

    if (!apiKey) {
        throw new TaxProviderError("Auth.cl no está configurado.", {
            status: 503,
            providerCode: "NOT_CONFIGURED",
        });
    }

    const url = `${getAuthApiBaseUrl().replace(/\/+$/, "")}${path}`;
    const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
    };

    if (apiSecret) {
        headers["X-Auth-Secret"] = apiSecret;
    }

    const response = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
    });

    const text = await response.text();
    let data = null;
    try {
        data = text ? JSON.parse(text) : null;
    } catch {
        data = { raw: text };
    }

    if (!response.ok) {
        throw new TaxProviderError(
            data?.message || data?.error || `Auth.cl respondió ${response.status}`,
            {
                status: response.status,
                providerCode: data?.code ?? null,
                raw: data,
            },
        );
    }

    return data;
}

export function createAuthClient(taxAccount) {
    return {
        isConfigured: () => isAuthConfigured(taxAccount),

        /** Emite DTE (boleta 39 o factura 33). */
        emitDte(payload) {
            return authFetch("/v1/dte", { body: payload, taxAccount });
        },

        getDteStatus(documentId) {
            return authFetch(`/v1/dte/${encodeURIComponent(documentId)}`, {
                method: "GET",
                taxAccount,
            });
        },

        getDtePdf(documentId) {
            return authFetch(`/v1/dte/${encodeURIComponent(documentId)}/pdf`, {
                method: "GET",
                taxAccount,
            });
        },
    };
}
