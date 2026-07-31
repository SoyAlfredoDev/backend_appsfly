/**
 * Caché en memoria por tenant para datos de baja frecuencia de cambio
 * (categorías, laboratorios, settings). TTL corto; invalidar en writes.
 *
 * En serverless (Vercel) el caché es por instancia/warm — reduce hits
 * repetidos en la misma invocación o warm starts consecutivos.
 */

const store = new Map();

function makeKey(businessId, namespace, extra = "") {
    return `${businessId || "global"}:${namespace}:${extra}`;
}

export function cacheGet(businessId, namespace, extra = "") {
    const key = makeKey(businessId, namespace, extra);
    const entry = store.get(key);
    if (!entry) return undefined;
    if (Date.now() > entry.expiresAt) {
        store.delete(key);
        return undefined;
    }
    return entry.value;
}

export function cacheSet(businessId, namespace, value, ttlMs = 60_000, extra = "") {
    const key = makeKey(businessId, namespace, extra);
    store.set(key, {
        value,
        expiresAt: Date.now() + Math.max(1_000, ttlMs),
    });
    // Evitar crecimiento indefinido en warm instances
    if (store.size > 500) {
        const oldest = store.keys().next().value;
        store.delete(oldest);
    }
    return value;
}

export function cacheInvalidate(businessId, namespace) {
    const prefix = `${businessId || "global"}:${namespace}:`;
    for (const key of store.keys()) {
        if (key.startsWith(prefix)) store.delete(key);
    }
}

export function cacheInvalidateBusiness(businessId) {
    const prefix = `${businessId || "global"}:`;
    for (const key of store.keys()) {
        if (key.startsWith(prefix)) store.delete(key);
    }
}

export async function cacheGetOrSet(
    businessId,
    namespace,
    loader,
    ttlMs = 60_000,
    extra = "",
) {
    const hit = cacheGet(businessId, namespace, extra);
    if (hit !== undefined) return hit;
    const value = await loader();
    return cacheSet(businessId, namespace, value, ttlMs, extra);
}
