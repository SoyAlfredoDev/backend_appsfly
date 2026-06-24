export function normalizeRut(rut) {
    return String(rut ?? "")
        .trim()
        .toUpperCase()
        .replace(/\./g, "")
        .replace(/\s+/g, "")
        .replace(/-/g, "");
}

export function formatRut(rut) {
    const clean = normalizeRut(rut);
    if (clean.length < 2) return clean;
    const body = clean.slice(0, -1);
    const dv = clean.slice(-1);
    return `${body}-${dv}`;
}

export function isValidRut(rut) {
    const clean = normalizeRut(rut);
    if (!/^\d{7,8}[0-9K]$/.test(clean)) return false;

    const body = clean.slice(0, -1);
    const dv = clean.slice(-1);
    let sum = 0;
    let multiplier = 2;

    for (let i = body.length - 1; i >= 0; i -= 1) {
        sum += Number(body[i]) * multiplier;
        multiplier = multiplier === 7 ? 2 : multiplier + 1;
    }

    const mod = 11 - (sum % 11);
    const expected =
        mod === 11 ? "0" : mod === 10 ? "K" : String(mod);

    return expected === dv;
}
