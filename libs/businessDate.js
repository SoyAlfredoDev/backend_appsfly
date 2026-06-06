const BUSINESS_TIMEZONE = 'America/Santiago';

/** Fecha de negocio en formato YYYY-MM-DD (alineado al frontend en-CA). */
export function getTodayBusinessDate() {
    return new Date().toLocaleDateString('en-CA', { timeZone: BUSINESS_TIMEZONE });
}

export function getBusinessDateFromDate(date) {
    return new Date(date).toLocaleDateString('en-CA', { timeZone: BUSINESS_TIMEZONE });
}

/** Etiqueta legible para UI (es-CL). */
export function formatBusinessDateLabel(dateStr) {
    const [year, month, day] = dateStr.split('-').map(Number);
    const d = new Date(year, month - 1, day);
    return d.toLocaleDateString('es-CL', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}
