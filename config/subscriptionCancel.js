/**
 * Frase de confirmación para baja de suscripción (perfil).
 * Mismo valor en frontend y backend.
 */
export const SUBSCRIPTION_CANCEL_CONFIRMATION_PHRASE = "SÍ, ELIMINAR";

export function normalizeConfirmationInput(value) {
    return String(value ?? "")
        .trim()
        .toUpperCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

export function isValidCancellationConfirmation(value) {
    const normalized = normalizeConfirmationInput(value);
    const expected = normalizeConfirmationInput(SUBSCRIPTION_CANCEL_CONFIRMATION_PHRASE);
    return normalized === expected;
}
