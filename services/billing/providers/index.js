import { TaxProviderType } from "../domain/enums.js";
import { AuthProvider } from "./auth/AuthProvider.js";
import { TaxBillingError } from "../errors.js";

/**
 * Factory: resuelve el proveedor tributario según configuración de la empresa.
 * @param {{ business: object, taxAccount: object|null }} ctx
 * @returns {import("./TaxProvider.js").TaxProvider}
 */
export function createTaxProvider({ business, taxAccount }) {
    const provider = taxAccount?.provider ?? TaxProviderType.AUTH_CL;

    switch (provider) {
        case TaxProviderType.AUTH_CL:
            return new AuthProvider({ business, taxAccount });
        case TaxProviderType.INTERNAL:
            throw new TaxBillingError(
                "INTERNAL_PROVIDER",
                "El proveedor interno no emite DTE.",
                501,
            );
        default:
            throw new TaxBillingError(
                "UNSUPPORTED_PROVIDER",
                `Proveedor tributario no soportado: ${provider}`,
                501,
            );
    }
}
