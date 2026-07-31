/**
 * Zona horaria de negocio — fuente de verdad para “día operativo”.
 * Default Chile; cada Business.businessTimezone puede sobreescribirlo.
 *
 * Instantes (createdAt, issuedAt, etc.): se guardan con new Date() / @default(now())
 * en reloj del servidor (idealmente UTC). Los “días de negocio” y rangos
 * se interpretan siempre en la TZ del negocio, no en la del navegador.
 */

export const DEFAULT_BUSINESS_TIMEZONE = "America/Santiago";

/** IANA válidos para interpolación SQL segura (ampliar cuando haya más países). */
const ALLOWED_TIMEZONES = new Set([
    "America/Santiago",
    "America/Punta_Arenas",
    "Pacific/Easter",
    "America/Argentina/Buenos_Aires",
    "America/Bogota",
    "America/Lima",
    "America/Mexico_City",
    "America/Sao_Paulo",
    "America/New_York",
    "Europe/Madrid",
    "UTC",
]);

export function resolveBusinessTimezone(timezoneOrBusiness) {
    if (!timezoneOrBusiness) return DEFAULT_BUSINESS_TIMEZONE;
    if (typeof timezoneOrBusiness === "string") {
        return sanitizeTimezone(timezoneOrBusiness);
    }
    return sanitizeTimezone(
        timezoneOrBusiness.businessTimezone || DEFAULT_BUSINESS_TIMEZONE,
    );
}

export function sanitizeTimezone(tz) {
    const value = String(tz || "").trim() || DEFAULT_BUSINESS_TIMEZONE;
    if (ALLOWED_TIMEZONES.has(value)) return value;
    // Patrón IANA conservador: Area/Location
    if (/^[A-Za-z_]+\/[A-Za-z0-9_+\-]+(?:\/[A-Za-z0-9_+\-]+)?$/.test(value)) {
        return value;
    }
    return DEFAULT_BUSINESS_TIMEZONE;
}

/**
 * Convierte componentes de calendario en una TZ a un instante UTC.
 * Técnica: asumir UTC y restar el offset real de esa TZ en ese momento.
 */
export function zonedDateTimeToUtc(
    dateKey,
    timeZone = DEFAULT_BUSINESS_TIMEZONE,
    { hour = 0, minute = 0, second = 0, millisecond = 0 } = {},
) {
    const tz = sanitizeTimezone(timeZone);
    const [year, month, day] = String(dateKey).split("-").map(Number);
    if (!year || !month || !day) {
        throw new Error(`INVALID_DATE_KEY:${dateKey}`);
    }

    const utcGuess = Date.UTC(year, month - 1, day, hour, minute, second, millisecond);
    const offset = getTimeZoneOffsetMs(new Date(utcGuess), tz);
    // Re-check around DST transitions
    let utc = utcGuess - offset;
    const offset2 = getTimeZoneOffsetMs(new Date(utc), tz);
    if (offset2 !== offset) {
        utc = utcGuess - offset2;
    }
    return new Date(utc);
}

function getTimeZoneOffsetMs(date, timeZone) {
    const dtf = new Intl.DateTimeFormat("en-US", {
        timeZone,
        hour12: false,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });
    const parts = Object.fromEntries(
        dtf
            .formatToParts(date)
            .filter((p) => p.type !== "literal")
            .map((p) => [p.type, p.value]),
    );
    const asUtc = Date.UTC(
        Number(parts.year),
        Number(parts.month) - 1,
        Number(parts.day),
        Number(parts.hour) % 24,
        Number(parts.minute),
        Number(parts.second),
    );
    return asUtc - date.getTime();
}

/** True si el instante cae exactamente en medianoche UTC (patrón date-only legacy). */
export function isUtcMidnightDate(date) {
    const d = date instanceof Date ? date : new Date(date);
    if (Number.isNaN(d.getTime())) return false;
    return (
        d.getUTCHours() === 0 &&
        d.getUTCMinutes() === 0 &&
        d.getUTCSeconds() === 0 &&
        d.getUTCMilliseconds() === 0
    );
}

/**
 * YYYY-MM-DD del instante en la TZ del negocio.
 * Compatibilidad: medianoche UTC exacta se trata como fecha calendario UTC
 * (registros date-only antiguos creados con `new Date("YYYY-MM-DD")`).
 */
export function toBusinessDateKey(date = new Date(), timeZone = DEFAULT_BUSINESS_TIMEZONE) {
    const d = date instanceof Date ? date : new Date(date);
    if (Number.isNaN(d.getTime())) return null;
    if (isUtcMidnightDate(d)) {
        return d.toISOString().slice(0, 10);
    }
    return d.toLocaleDateString("en-CA", {
        timeZone: sanitizeTimezone(timeZone),
    });
}

/** Lista IANA permitidos (settings / UI). */
export function listAllowedBusinessTimezones() {
    return [...ALLOWED_TIMEZONES];
}

export function getTodayBusinessDate(timeZone = DEFAULT_BUSINESS_TIMEZONE) {
    return toBusinessDateKey(new Date(), timeZone);
}

/** Suma días a un YYYY-MM-DD (calendario gregoriano, sin TZ). */
export function addDaysToDateKey(dateKey, days) {
    const [y, m, d] = String(dateKey).split("-").map(Number);
    const dt = new Date(Date.UTC(y, m - 1, d + days));
    const yy = dt.getUTCFullYear();
    const mm = String(dt.getUTCMonth() + 1).padStart(2, "0");
    const dd = String(dt.getUTCDate()).padStart(2, "0");
    return `${yy}-${mm}-${dd}`;
}

/**
 * Límites UTC inclusivos/exclusivos de un día de negocio.
 * Usar: createdAt >= start && createdAt < endExclusive
 */
export function businessDayBoundsUtc(dateKey, timeZone = DEFAULT_BUSINESS_TIMEZONE) {
    const tz = sanitizeTimezone(timeZone);
    const start = zonedDateTimeToUtc(dateKey, tz, { hour: 0, minute: 0, second: 0, millisecond: 0 });
    const endExclusive = zonedDateTimeToUtc(addDaysToDateKey(dateKey, 1), tz, {
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0,
    });
    return {
        start,
        endExclusive,
        /** Compatibilidad con consultas lte al final del día */
        endInclusive: new Date(endExclusive.getTime() - 1),
    };
}

/**
 * Rango de varios días [startKey, endKey] inclusivo en calendario de negocio.
 */
export function businessDateRangeBoundsUtc(
    startKey,
    endKey,
    timeZone = DEFAULT_BUSINESS_TIMEZONE,
) {
    const { start } = businessDayBoundsUtc(startKey, timeZone);
    const { endInclusive, endExclusive } = businessDayBoundsUtc(endKey, timeZone);
    return { start, endInclusive, endExclusive };
}

/** Mes calendario en TZ del negocio → bounds UTC [start, endExclusive) */
export function businessMonthBoundsUtc(
    year,
    month,
    timeZone = DEFAULT_BUSINESS_TIMEZONE,
) {
    const y = Number(year);
    const m = Number(month);
    const startKey = `${y}-${String(m).padStart(2, "0")}-01`;
    const nextMonth = m === 12 ? 1 : m + 1;
    const nextYear = m === 12 ? y + 1 : y;
    const endKey = `${nextYear}-${String(nextMonth).padStart(2, "0")}-01`;
    const start = zonedDateTimeToUtc(startKey, timeZone);
    const endExclusive = zonedDateTimeToUtc(endKey, timeZone);
    return { start, endExclusive, endInclusive: new Date(endExclusive.getTime() - 1) };
}

/**
 * Parsea YYYY-MM-DD (o ISO) a instante representativo del día de negocio.
 * Evita `new Date("YYYY-MM-DD")` (= medianoche UTC → día anterior en Chile).
 * Usa mediodía local del negocio para estabilidad al mostrar solo la fecha.
 */
export function parseBusinessDateOnly(
    value,
    timeZone = DEFAULT_BUSINESS_TIMEZONE,
) {
    if (value === undefined) return undefined;
    if (value === null || value === "") return null;

    if (value instanceof Date) {
        if (Number.isNaN(value.getTime())) return null;
        return value;
    }

    const raw = String(value).trim();
    const dateOnly = raw.match(/^(\d{4})-(\d{2})-(\d{2})/)?.[0];
    if (dateOnly) {
        return zonedDateTimeToUtc(dateOnly, timeZone, {
            hour: 12,
            minute: 0,
            second: 0,
            millisecond: 0,
        });
    }

    const parsed = new Date(raw);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function formatDateKeyLabel(dateKey, locale = "es-CL") {
    const [year, month, day] = String(dateKey).split("-").map(Number);
    const d = new Date(year, month - 1, day);
    return d.toLocaleDateString(locale, {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

export function hourInTimezone(date, timeZone = DEFAULT_BUSINESS_TIMEZONE) {
    const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: sanitizeTimezone(timeZone),
        hour: "numeric",
        hour12: false,
    }).formatToParts(new Date(date));
    return Number(parts.find((p) => p.type === "hour")?.value ?? 0) % 24;
}
