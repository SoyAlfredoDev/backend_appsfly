/**
 * Elige el membership del usuario para el tenant activo.
 * Si se envía businessId, debe coincidir con un negocio al que el usuario pertenece.
 *
 * @param {object[]} memberships
 * @param {string | undefined} requestedBusinessId
 */
export function resolveTenantMembership(memberships, requestedBusinessId) {
    if (!memberships?.length) {
        return { error: "NO_MEMBERSHIP" };
    }

    const requested = String(requestedBusinessId ?? "").trim();
    if (requested) {
        const match = memberships.find(
            (m) => m.userBusinessBusinessId === requested,
        );
        if (!match) {
            return { error: "FORBIDDEN_BUSINESS" };
        }
        return { membership: match };
    }

    return { membership: memberships[0] };
}
