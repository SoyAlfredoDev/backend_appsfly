const UUID_RE =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

const MAX_USER_MESSAGE_LENGTH = 4000;
const MAX_SEARCH_QUERY_LENGTH = 120;

/** Patrones de prompt-injection o intentos de salir del tenant. */
const BLOCKED_MESSAGE_PATTERNS = [
    /ignore\s+(all\s+)?(previous|prior|above)\s+instructions/i,
    /olvida\s+(las\s+)?instrucciones/i,
    /ignora\s+(las\s+)?instrucciones/i,
    /act\s+as\s+(if\s+you\s+are|a)\s+/i,
    /pretend\s+you\s+are/i,
    /system\s*prompt/i,
    /instrucciones\s+(internas|del\s+sistema|ocultas)/i,
    /jailbreak/i,
    /\bsql\b/i,
    /\bprisma\b/i,
    /\braw\s+query\b/i,
    /base\s+de\s+datos\s+(general|global|de\s+otro)/i,
    /base\s+general/i,
    /general\s*db/i,
    /otro\s+negocio/i,
    /otra\s+empresa/i,
    /otros\s+negocios/i,
    /otras\s+empresas/i,
    /todos\s+los\s+negocios/i,
    /all\s+business(es)?/i,
    /cross[\s-]?tenant/i,
    /DATABASE_/i,
    /GEMINI_API_KEY/i,
    /businessConnectionDB/i,
    /getPrismaForBusinessId/i,
    /api[_\s-]?key/i,
    /connection\s*string/i,
    /cadena\s+de\s+conexi[oó]n/i,
    /variables?\s+de\s+entorno/i,
    /ejecuta\s+(un\s+)?comando/i,
    /run\s+(this\s+)?code/i,
    /otro\s+cliente\s+de\s+(apps\s*)?fly/i,
    /otros\s+clientes\s+de\s+(apps\s*)?fly/i,
    /clientes\s+de\s+otros\s+negocios/i,
    /usuarios\s+de\s+(la\s+)?plataforma/i,
    /dato\s+privado\s+de\s+(apps\s*)?fly/i,
    /informaci[oó]n\s+privada\s+de\s+(apps\s*)?fly/i,
    /secreto(s)?\s+de\s+(apps\s*)?fly/i,
    /esquema\s+(de\s+la\s+)?(base|bd|db)/i,
    /lista(r|me)?\s+(las\s+)?tablas/i,
    /dump\s+(de\s+)?(la\s+)?(base|db|bd)/i,
];

/** El historial lo escribe el cliente. Solo bloquea intentos de cambiar las reglas. */
const HISTORY_INJECTION_PATTERNS = [
    /ignore\s+(all\s+)?(previous|prior|above)\s+instructions/i,
    /olvida\s+(las\s+)?instrucciones/i,
    /ignora\s+(las\s+)?instrucciones/i,
    /act\s+as\s+(if\s+you\s+are|a)\s+/i,
    /pretend\s+you\s+are/i,
    /system\s*prompt/i,
    /instrucciones\s+(internas|del\s+sistema|ocultas)/i,
    /jailbreak/i,
    /DATABASE_/i,
    /GEMINI_API_KEY/i,
    /businessConnectionDB/i,
    /api[_\s-]?key/i,
    /connection\s*string/i,
    /cadena\s+de\s+conexi[oó]n/i,
    /otro\s+negocio/i,
    /otra\s+empresa/i,
    /todos\s+los\s+negocios/i,
    /base\s+de\s+datos\s+(general|global)/i,
    /dato\s+privado\s+de\s+(apps\s*)?fly/i,
];

const WRITE_METHODS = new Set([
    "create",
    "createMany",
    "createManyAndReturn",
    "update",
    "updateMany",
    "updateManyAndReturn",
    "upsert",
    "delete",
    "deleteMany",
]);

const BLOCKED_ROOT_METHODS = new Set([
    "$executeRaw",
    "$executeRawUnsafe",
    "$disconnect",
    "$connect",
    "$on",
    "$use",
    "$extends",
    "$transaction",
]);

const INTERNAL_FIELD_KEYS = new Set([
    "businessId",
    "businessConnectionDB",
    "businessDatabaseSecretRef",
    "databaseUrl",
    "connectionString",
    "password",
    "secret",
    "apiKey",
    "token",
    "accessToken",
    "refreshToken",
]);

const FORBIDDEN_ARG_KEYS = new Set([
    "prisma",
    "sql",
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
    assertAgainstPatterns(text);
}

/**
 * Revisa usuario e historial. El cliente puede falsificar mensajes anteriores.
 * @param {Array<{ role?: string, content?: string }>} messages
 */
export function assertSafeConversation(messages) {
    const list = Array.isArray(messages) ? messages : [];
    const userMessages = list.filter(
        (message) => message?.role === "user" && String(message.content ?? "").trim(),
    );

    if (!userMessages.length) {
        throw new AssistantSecurityError(
            "EMPTY_MESSAGE",
            "Envía al menos un mensaje del usuario.",
        );
    }

    for (const message of userMessages) {
        assertSafeUserMessage(message.content);
    }

    for (const message of list) {
        if (message?.role !== "assistant") continue;
        const text = String(message.content ?? "").trim();
        if (!text) continue;
        assertSafeHistoryMessage(text);
    }
}

/**
 * @param {string} content
 */
export function assertSafeHistoryMessage(content) {
    assertAgainstPatterns(String(content ?? ""), HISTORY_INJECTION_PATTERNS);
}

/**
 * El nombre del negocio se incrusta en la instrucción del sistema.
 * @param {string | null | undefined} businessName
 */
export function sanitizeBusinessLabel(businessName) {
    const text = String(businessName ?? "")
        .replace(/[\r\n\t]+/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 80);

    if (!text) return "tu negocio";

    const blocked = [...BLOCKED_MESSAGE_PATTERNS, ...HISTORY_INJECTION_PATTERNS].some(
        (pattern) => pattern.test(text),
    );
    return blocked ? "tu negocio" : text;
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
 * @param {string} text
 * @param {RegExp[]} [patterns]
 */
function assertAgainstPatterns(text, patterns = BLOCKED_MESSAGE_PATTERNS) {
    for (const pattern of patterns) {
        if (pattern.test(text)) {
            throw new AssistantSecurityError(
                "MESSAGE_BLOCKED",
                "Solo puedo ayudarte con datos del negocio actual. Reformula tu consulta.",
            );
        }
    }
}

const SECRET_REPLY_PATTERNS = [
    /postgres(?:ql)?:\/\/\S+/gi,
    /mongodb(?:\+srv)?:\/\/\S+/gi,
    /GEMINI_API_KEY/gi,
    /DATABASE_[A-Z0-9_]+/g,
    /businessConnectionDB/gi,
    /businessDatabaseSecretRef/gi,
];

/**
 * Quita identificadores internos y secretos si el modelo intenta repetirlos.
 * @param {string} text
 * @param {{ businessId?: string }} [context]
 */
export function sanitizeAssistantReply(text, context = {}) {
    let output = String(text ?? "");
    const businessId = String(context.businessId ?? "").trim();

    if (businessId && output.includes(businessId)) {
        output = output.split(businessId).join("[dato interno]");
    }

    for (const pattern of SECRET_REPLY_PATTERNS) {
        pattern.lastIndex = 0;
        output = output.replace(pattern, "[dato privado]");
    }

    if (/REGLAS DE SEGURIDAD \(OBLIGATORIAS\)/.test(output)) {
        return "No puedo compartir información interna de AppsFly. Puedo ayudarte con consultas de tu negocio.";
    }

    const trimmed = output.trim();
    return (
        trimmed || "No pude generar una respuesta. Intenta reformular tu consulta."
    );
}

/**
 * @param {unknown} value
 */
export function stripInternalFields(value) {
    if (Array.isArray(value)) {
        return value.map((item) => stripInternalFields(item));
    }
    if (!value || typeof value !== "object") return value;

    /** @type {Record<string, unknown>} */
    const output = {};
    for (const [key, child] of Object.entries(value)) {
        if (INTERNAL_FIELD_KEYS.has(key)) continue;
        output[key] = stripInternalFields(child);
    }
    return output;
}

/**
 * Impide que una herramienta cree, edite o borre, aunque el cliente Prisma sí pueda.
 * @param {import('@prisma/client').PrismaClient} prisma
 */
export function createReadOnlyPrisma(prisma) {
    return new Proxy(prisma, {
        get(target, property, receiver) {
            if (typeof property === "string" && BLOCKED_ROOT_METHODS.has(property)) {
                return () => {
                    throw new AssistantSecurityError(
                        "WRITE_FORBIDDEN",
                        "El asistente solo puede consultar.",
                    );
                };
            }

            const value = Reflect.get(target, property, receiver);
            if (typeof value === "function") {
                return value.bind(target);
            }
            if (!value || typeof value !== "object" || typeof property !== "string") {
                return value;
            }
            if (property.startsWith("$")) return value;

            return new Proxy(value, {
                get(model, method, methodReceiver) {
                    if (WRITE_METHODS.has(String(method))) {
                        return () => {
                            throw new AssistantSecurityError(
                                "WRITE_FORBIDDEN",
                                "El asistente solo puede consultar.",
                            );
                        };
                    }
                    const operation = Reflect.get(model, method, methodReceiver);
                    return typeof operation === "function"
                        ? operation.bind(model)
                        : operation;
                },
            });
        },
    });
}

/**
 * Limita tamaño de respuestas enviadas de vuelta al modelo.
 * @param {unknown} payload
 */
export function truncateToolResponseForModel(payload) {
    const safePayload = stripInternalFields(payload);
    const json = JSON.stringify(safePayload ?? {});
    if (json.length <= 12000) return safePayload;

    return {
        error: "La respuesta es demasiado grande. Pide un filtro más específico.",
        truncated: true,
    };
}
