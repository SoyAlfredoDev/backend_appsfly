/**
 * Compatibilidad: reexporta helpers de zona horaria de negocio.
 * Preferir importar desde businessTimezone.js en código nuevo.
 */
export {
    DEFAULT_BUSINESS_TIMEZONE as BUSINESS_TIMEZONE,
    getTodayBusinessDate,
    toBusinessDateKey as getBusinessDateFromDate,
    formatDateKeyLabel as formatBusinessDateLabel,
    resolveBusinessTimezone,
    businessDayBoundsUtc,
    parseBusinessDateOnly,
} from "./businessTimezone.js";
