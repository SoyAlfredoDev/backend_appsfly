/** Header que debe enviar el frontend de la PC autorizada. */
export const AGENT_TASKS_TOKEN_HEADER = "x-appsfly-agent-token";

export function getAgentTasksLocalToken() {
    return process.env.AGENT_TASKS_LOCAL_TOKEN?.trim() ?? "";
}

export function isAgentTasksLocalTokenConfigured() {
    return getAgentTasksLocalToken().length > 0;
}

function readRequestToken(req) {
    const raw = req.headers[AGENT_TASKS_TOKEN_HEADER];
    return typeof raw === "string" ? raw.trim() : "";
}

export function hasValidAgentTasksLocalToken(req) {
    const expected = getAgentTasksLocalToken();
    if (!expected) return true;
    return readRequestToken(req) === expected;
}

/**
 * Si AGENT_TASKS_LOCAL_TOKEN está definido, exige el header correcto.
 * POST crear tareas queda fuera de este middleware (móvil puede agregar).
 */
export function agentTasksLocalTokenRequired(req, res, next) {
    if (!isAgentTasksLocalTokenConfigured()) {
        return next();
    }

    if (hasValidAgentTasksLocalToken(req)) {
        return next();
    }

    return res.status(403).json({
        error: "AGENT_TASKS_LOCAL_TOKEN_REQUIRED",
        message:
            "Gestión de la cola solo disponible desde la PC autorizada. Puedes agregar tareas desde el móvil.",
    });
}
