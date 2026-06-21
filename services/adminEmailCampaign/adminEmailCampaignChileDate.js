export const CHILE_TZ = "America/Santiago";

export function getChileDateParts(date = new Date()) {
    const fmt = new Intl.DateTimeFormat("en-CA", {
        timeZone: CHILE_TZ,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        hour12: false,
    });
    const parts = fmt.formatToParts(date);
    const get = (type) => parts.find((p) => p.type === type)?.value;
    return {
        year: Number(get("year")),
        month: Number(get("month")),
        day: Number(get("day")),
        hour: Number(get("hour")),
    };
}

export function getDayKey(date = new Date()) {
    const { year, month, day } = getChileDateParts(date);
    return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function getMonthKey(date = new Date()) {
    const { year, month } = getChileDateParts(date);
    return `${year}-${String(month).padStart(2, "0")}`;
}

/** 0 = domingo … 6 = sábado (calendario Chile). */
export function getChileWeekday(date = new Date()) {
    const weekday = new Intl.DateTimeFormat("en-US", {
        timeZone: CHILE_TZ,
        weekday: "short",
    }).format(date);
    const map = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    return map[weekday] ?? 0;
}

export function wasContactedInChileMonth(lastContactAt, referenceDate = new Date()) {
    if (!lastContactAt) return false;
    return getMonthKey(new Date(lastContactAt)) === getMonthKey(referenceDate);
}

export function addDaysToDateParts(parts, daysToAdd) {
    const utcMid = new Date(Date.UTC(parts.year, parts.month - 1, parts.day));
    utcMid.setUTCDate(utcMid.getUTCDate() + daysToAdd);
    return {
        year: utcMid.getUTCFullYear(),
        month: utcMid.getUTCMonth() + 1,
        day: utcMid.getUTCDate(),
    };
}

export function formatExpiryDateSpanish(date) {
    return new Intl.DateTimeFormat("es-CL", {
        timeZone: CHILE_TZ,
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(new Date(date));
}
