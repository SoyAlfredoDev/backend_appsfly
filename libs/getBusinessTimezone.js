import { getBusinessByIdService } from "../services/businessService.js";
import {
    DEFAULT_BUSINESS_TIMEZONE,
    resolveBusinessTimezone,
} from "./businessTimezone.js";

/**
 * Resuelve la TZ operativa de un negocio (generalDB).
 * Fallback Chile si el negocio no existe o aún no migró la columna.
 */
export async function getBusinessTimezoneById(businessId) {
    if (!businessId) return DEFAULT_BUSINESS_TIMEZONE;
    try {
        const business = await getBusinessByIdService(businessId);
        return resolveBusinessTimezone(business);
    } catch (error) {
        console.error("(getBusinessTimezoneById):", error);
        return DEFAULT_BUSINESS_TIMEZONE;
    }
}

/** Helper para controllers: usa req.businessTimezone si ya está, o carga por tenant. */
export async function ensureRequestBusinessTimezone(req) {
    if (req.businessTimezone) return req.businessTimezone;
    const tz = await getBusinessTimezoneById(req.tenantBusinessId);
    req.businessTimezone = tz;
    return tz;
}
