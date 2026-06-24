export class TaxBillingError extends Error {
    constructor(code, message, status = 400) {
        super(message);
        this.name = "TaxBillingError";
        this.code = code;
        this.status = status;
    }
}

export class TaxProviderError extends Error {
    constructor(message, { status, providerCode, raw } = {}) {
        super(message);
        this.name = "TaxProviderError";
        this.status = status ?? 502;
        this.providerCode = providerCode ?? null;
        this.raw = raw ?? null;
    }
}
