import { PrismaClient as PrismaGeneral } from "../../../src/generated/general/index.js";
import {
    decryptCredential,
    encryptCredential,
} from "../../../libs/taxCredentialCipher.js";

const general = new PrismaGeneral();

function decryptAccountRow(row) {
    if (!row) return null;
    return {
        ...row,
        companyId: row.companyId ?? row.businessId,
        authApiKey: decryptCredential(row.authApiKey),
        authApiSecret: decryptCredential(row.authApiSecret),
    };
}

/**
 * TaxProviderAccount por empresa (tenant).
 * Persistido en generalDB — tabla TaxProviderAccount (companyId = businessId).
 */
export function createTaxProviderAccountRepository() {
    return {
        async findByCompanyId(companyId) {
            const row = await general.taxProviderAccount.findUnique({
                where: { companyId },
            });
            return decryptAccountRow(row);
        },

        /** @deprecated alias */
        findByBusinessId(companyId) {
            return this.findByCompanyId(companyId);
        },

        async upsert(companyId, data) {
            const payload = {
                provider: data.provider,
                authApiKey: data.authApiKey
                    ? encryptCredential(data.authApiKey)
                    : data.authApiKey === null
                      ? null
                      : undefined,
                authApiSecret: data.authApiSecret
                    ? encryptCredential(data.authApiSecret)
                    : data.authApiSecret === null
                      ? null
                      : undefined,
                environment: data.environment,
                businessActivity: data.businessActivity,
                businessAddress: data.businessAddress,
                businessCommune: data.businessCommune,
                businessCity: data.businessCity,
                certificateStatus: data.certificateStatus,
                certificateRef: data.certificateRef,
                isEnabled: data.isEnabled,
            };

            Object.keys(payload).forEach((key) => {
                if (payload[key] === undefined) delete payload[key];
            });

            const row = await general.taxProviderAccount.upsert({
                where: { companyId },
                create: { companyId, ...payload },
                update: payload,
            });
            return decryptAccountRow(row);
        },

        async reserveFolio(companyId, documentType) {
            const field =
                documentType === "FACTURA"
                    ? "folioFacturaNext"
                    : "folioBoletaNext";

            const updated = await general.taxProviderAccount.update({
                where: { companyId },
                data: { [field]: { increment: 1 } },
            });

            return documentType === "FACTURA"
                ? updated.folioFacturaNext - 1
                : updated.folioBoletaNext - 1;
        },
    };
}

/** @deprecated use createTaxProviderAccountRepository */
export function createBusinessTaxConfigRepository() {
    return createTaxProviderAccountRepository();
}
