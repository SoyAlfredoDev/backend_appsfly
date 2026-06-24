/**
 * Mapeo dominio Company ↔ Business (generalDB).
 * En AppsFly cada tenant es un Business con su propia BD operacional.
 *
 * @typedef {object} Company
 * @property {string} id
 * @property {string} tenantId
 * @property {string} rut
 * @property {string} businessName
 * @property {string} [email]
 * @property {string} [businessActivity]
 * @property {string} [address]
 * @property {string} [commune]
 * @property {string} [city]
 */

/**
 * @param {object} business - registro Business de generalDB
 * @returns {Company}
 */
export function mapBusinessToCompany(business) {
    return {
        id: business.businessId,
        tenantId: business.businessId,
        rut: business.businessDocumentNumber,
        businessName: business.businessName,
        email: business.businessEmail,
        businessActivity: business.businessType,
        address: null,
        commune: null,
        city: business.businessCountry,
    };
}

/**
 * @typedef {object} TaxProviderAccount
 * @property {string} id
 * @property {string} companyId
 * @property {string} provider
 * @property {string|null} apiKey
 * @property {string|null} apiSecret
 * @property {string} certificateStatus
 * @property {boolean} isEnabled
 */

/**
 * @param {object} account - TaxProviderAccount / BusinessTaxConfig row
 * @returns {TaxProviderAccount}
 */
export function mapTaxProviderAccount(account) {
    if (!account) return null;
    return {
        id: account.companyId ?? account.businessId,
        companyId: account.companyId ?? account.businessId,
        provider: account.provider,
        apiKey: account.authApiKey ?? null,
        apiSecret: account.authApiSecret ?? null,
        certificateStatus: account.certificateStatus ?? "PENDING",
        isEnabled: Boolean(account.isEnabled),
        environment: account.environment ?? "sandbox",
        businessActivity: account.businessActivity,
        businessAddress: account.businessAddress,
        businessCommune: account.businessCommune,
        businessCity: account.businessCity,
    };
}
