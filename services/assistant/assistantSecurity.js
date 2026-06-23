const UUID_RE =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

const MAX_USER_MESSAGE_LENGTH = 4000;
const MAX_SEARCH_QUERY_LENGTH = 120;

/** Patrones de prompt-injection o intentos de salir del tenant. */
const BLOCKED_MESSAGE_PATTERNS = [
    /ignore\s+(all\s+)?(previous|prior|above)\s+instructions/i,
    /olvida\s+(las\s+)?instrucciones/i,
    /act\s+as\s+(if\s+you\s+are|a)\s+/i,
    /pretend\s+you\s+are/i,
    /system\s*prompt/i,
    /jailbreak/i,
    /\bsql\b/i,
    /\bprisma\b/i,
    /\braw\s+query\b/i,
    /base\s+de\s+datos\s+(general|global|de\s+otro)/i,
    /otro\s+negocio/i,
    /otra\s+empresa/i,
    /todos\s+los\s+negocios/i,
    /all\s+business(es)?/i,
    /cross[\s-]?tenant/i,
    /DATABASE_GENERAL/i,
    /getPrismaForBusinessId/i,
    /ejecuta\s+(un\s+)?comando/i,
    /run\s+(this\s+)?code/i,
];

const FORBIDDEN_ARG_KEYS = new Set([
    "prisma",
    "sql",
    "query",
    "raw",
    "database",
    "databaseUrl",
    "businessId",
    "tenantBusinessId",
    "userId",
    "__proto__",
    "constructor",
    "prototype",
]);

export class AssistantSecurityError extends Error {
    constructor(code, message) {
        super(message);
        this.name = "AssistantSecurityError";
        this.code = code;
    }
}

/**
 * @param {string} content
 */
export function assertSafeUserMessage(content) {
    const text = String(content ?? "").trim();
    if (!text) {
        throw new AssistantSecurityError(
            "EMPTY_MESSAGE",
            "Envía al menos un mensaje del usuario.",
        );
    }
    if (text.length > MAX_USER_MESSAGE_LENGTH) {
        throw new AssistantSecurityError(
            "MESSAGE_TOO_LONG",
            "El mensaje es demasiado largo.",
        );
    }
    for (const pattern of BLOCKED_MESSAGE_PATTERNS) {
        if (pattern.test(text)) {
            throw new AssistantSecurityError(
                "MESSAGE_BLOCKED",
                "Solo puedo ayudarte con datos del negocio actual. Reformula tu consulta.",
            );
        }
    }
}

/**
 * @param {string} toolName
 * @param {object} args
 */
export function sanitizeToolArgs(toolName, args) {
    const input = args && typeof args === "object" ? { ...args } : {};

    for (const key of Object.keys(input)) {
        if (FORBIDDEN_ARG_KEYS.has(key)) {
            delete input[key];
        }
    }

    switch (toolName) {
        case "search_customers":
        case "search_products": {
            input.query = String(input.query ?? "")
                .trim()
                .slice(0, MAX_SEARCH_QUERY_LENGTH);
            break;
        }
        case "get_customer_detail": {
            const id = String(input.customerId ?? "").trim();
            if (!UUID_RE.test(id)) {
                return { error: "ID de cliente inválido." };
            }
            input.customerId = id;
            break;
        }
        case "get_monthly_sales_report": {
            input.month = clampInt(input.month, 1, 12);
            input.year = clampInt(input.year, 2000, 2100);
            if (!input.month || !input.year) {
                return { error: "Mes (1-12) y año válidos son requeridos." };
            }
            break;
        }
        case "get_yearly_sales_report": {
            input.year = clampInt(input.year, 2000, 2100);
            if (!input.year) {
                return { error: "Año válido requerido." };
            }
            break;
        }
        case "get_low_stock_products": {
            input.limit = clampInt(input.limit, 1, 15) ?? 15;
            break;
        }
        case "get_recent_sales": {
            input.limit = clampInt(input.limit, 1, 20) ?? 10;
            break;
        }
        case "get_inventory_movements": {
            const start = String(input.startDate ?? "").trim();
            const end = String(input.endDate ?? "").trim();
            if (!DATE_RE.test(start) || !DATE_RE.test(end)) {
                return { error: "Usa fechas en formato YYYY-MM-DD." };
            }
            input.startDate = start;
            input.endDate = end;
            break;
        }
        default:
            break;
    }

    return input;
}

/**
 * Contexto inmutable: solo Prisma del tenant actual.
 * @param {import('@prisma/client').PrismaClient} prisma
 * @param {string} businessId
 */
export function createTenantToolContext(prisma, businessId) {
    if (!prisma || typeof prisma !== "object") {
        throw new AssistantSecurityError(
            "TENANT_CONTEXT_INVALID",
            "Contexto de negocio inválido.",
        );
    }
    const id = String(businessId ?? "").trim();
    if (!UUID_RE.test(id)) {
        throw new AssistantSecurityError(
            "TENANT_CONTEXT_INVALID",
            "Contexto de negocio inválido.",
        );
    }
    return Object.freeze({ prisma, businessId: id });
}

function clampInt(value, min, max) {
    const n = Number.parseInt(String(value ?? ""), 10);
    if (!Number.isFinite(n) || n < min || n > max) return null;
    return n;
}

/**
 * Limita tamaño de respuestas enviadas de vuelta al modelo.
 * @param {unknown} payload
 */
export function truncateToolResponseForModel(payload) {
    const json = JSON.stringify(payload ?? {});
    if (json.length <= 12000) return payload;

    return {
        error: "La respuesta es demasiado grande. Pide un filtro más específico.",
        truncated: true,
    };
}
