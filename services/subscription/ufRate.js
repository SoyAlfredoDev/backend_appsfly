// Generated from services/subscription/ufRate.ts by npm run build:runtime.
export function chileDateKey(at = new Date()) {
    const parts = new Intl.DateTimeFormat("en-CA", {
        timeZone: "America/Santiago",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).formatToParts(at);
    const value = (type) => parts.find((part) => part.type === type)?.value;
    return `${value("year")}-${value("month")}-${value("day")}`;
}
export function parseUfValue(value) {
    if (typeof value !== "string" || !/^\d{1,3}(?:\.\d{3})*,\d{2}$/.test(value)) {
        throw new Error("UF_RATE_INVALID");
    }
    const parsed = Number(value.replaceAll(".", "").replace(",", "."));
    if (!Number.isFinite(parsed) || parsed <= 0)
        throw new Error("UF_RATE_INVALID");
    return parsed;
}
export async function fetchOfficialUfRate(at = new Date(), options = {}) {
    const date = chileDateKey(at);
    const apiKey = options.apiKey ?? process.env.CMF_API_KEY;
    if (!apiKey)
        throw new Error("UF_RATE_NOT_CONFIGURED");
    const [year, month, day] = date.split("-");
    const url = new URL(`https://api.cmfchile.cl/api-sbifv3/recursos_api/uf/${year}/${month}/dias/${day}`);
    url.searchParams.set("apikey", apiKey);
    url.searchParams.set("formato", "json");
    const response = await (options.fetchImpl ?? fetch)(url, { signal: AbortSignal.timeout(8000) });
    if (!response.ok)
        throw new Error("UF_RATE_UNAVAILABLE");
    const payload = (await response.json());
    const entry = payload.UFs?.find((item) => item.Fecha === date);
    if (!entry)
        throw new Error("UF_RATE_UNAVAILABLE");
    return { date, valueClp: parseUfValue(entry.Valor), source: "CMF" };
}
