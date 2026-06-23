import {
    ASSISTANT_TOOL_DECLARATIONS,
    executeAssistantTool,
} from "./assistantTools.js";
import {
    assertSafeUserMessage,
    AssistantSecurityError,
} from "./assistantSecurity.js";
import {
    appendFunctionResponse,
    appendModelFunctionCalls,
    buildSystemInstruction,
    generateWithTools,
    isGeminiConfigured,
    toGeminiContents,
} from "./geminiClient.js";

const MAX_MESSAGES = 20;
const MAX_TOOL_ROUNDS = 6;
const RATE_LIMIT_MAX = 30;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

const rateLimitBuckets = new Map();

function checkRateLimit(userId) {
    const now = Date.now();
    const bucket = rateLimitBuckets.get(userId);

    if (!bucket || now >= bucket.resetAt) {
        rateLimitBuckets.set(userId, {
            count: 1,
            resetAt: now + RATE_LIMIT_WINDOW_MS,
        });
        return null;
    }

    if (bucket.count >= RATE_LIMIT_MAX) {
        const minutesLeft = Math.ceil((bucket.resetAt - now) / 60000);
        return `Has alcanzado el límite de consultas (${RATE_LIMIT_MAX}/hora). Intenta en ${minutesLeft} min.`;
    }

    bucket.count += 1;
    return null;
}

function auditLog({ userId, businessId, toolName, success, error }) {
    console.info(
        JSON.stringify({
            event: "assistant_audit",
            userId,
            businessId,
            tool: toolName ?? null,
            success,
            error: error ?? null,
            at: new Date().toISOString(),
        }),
    );
}

function sanitizeMessages(messages) {
    if (!Array.isArray(messages)) return [];
    return messages
        .filter((m) => m && (m.role === "user" || m.role === "assistant"))
        .map((m) => ({
            role: m.role,
            content: String(m.content ?? "").slice(0, 4000),
        }))
        .slice(-MAX_MESSAGES);
}

export function getAssistantStatus() {
    return {
        enabled: isGeminiConfigured(),
        provider: "gemini",
        model: process.env.GEMINI_MODEL || "gemini-flash-latest",
        readOnly: true,
    };
}

/**
 * @param {object} params
 * @param {object[]} params.messages
 * @param {import('@prisma/client').PrismaClient} params.prisma - tenant only
 * @param {string} params.userId
 * @param {string} params.businessId
 * @param {string} [params.businessName]
 */
export async function processAssistantChat({
    messages,
    prisma,
    userId,
    businessId,
    businessName,
}) {
    if (!isGeminiConfigured()) {
        return {
            reply:
                "El asistente no está configurado. El administrador del sistema debe agregar GEMINI_API_KEY en el servidor.",
            toolsUsed: [],
        };
    }

    if (!prisma || !businessId) {
        throw new AssistantSecurityError(
            "TENANT_CONTEXT_INVALID",
            "Contexto de negocio inválido.",
        );
    }

    const rateError = checkRateLimit(userId);
    if (rateError) {
        return { reply: rateError, toolsUsed: [], rateLimited: true };
    }

    const safeMessages = sanitizeMessages(messages);
    if (!safeMessages.length || safeMessages.at(-1)?.role !== "user") {
        throw new Error("INVALID_MESSAGES");
    }

    assertSafeUserMessage(safeMessages.at(-1).content);

    const systemInstruction = buildSystemInstruction(businessName, businessId);
    const { contents, systemInstruction: systemPayload } = toGeminiContents(
        systemInstruction,
        safeMessages,
    );

    const tenantCtx = { prisma, businessId };
    const toolsUsed = [];
    let lastToolError = null;

    for (let round = 0; round < MAX_TOOL_ROUNDS; round += 1) {
        const result = await generateWithTools(
            contents,
            ASSISTANT_TOOL_DECLARATIONS,
            systemPayload,
        );

        if (!result.functionCalls.length) {
            auditLog({
                userId,
                businessId,
                toolName: null,
                success: true,
            });
            return {
                reply:
                    result.text ||
                    "No pude generar una respuesta. Intenta reformular tu consulta.",
                toolsUsed,
            };
        }

        appendModelFunctionCalls(contents, result.functionCalls);

        for (const call of result.functionCalls) {
            let toolResult;
            try {
                toolResult = await executeAssistantTool(
                    call.name,
                    call.args,
                    tenantCtx,
                );
                toolsUsed.push(call.name);
                auditLog({
                    userId,
                    businessId,
                    toolName: call.name,
                    success: !toolResult?.error,
                    error: toolResult?.error ?? null,
                });
            } catch (toolError) {
                lastToolError = toolError.message;
                toolResult = { error: "Error al ejecutar la consulta." };
                auditLog({
                    userId,
                    businessId,
                    toolName: call.name,
                    success: false,
                    error: toolError.message,
                });
            }
            appendFunctionResponse(contents, call.name, toolResult);
        }
    }

    return {
        reply:
            lastToolError != null
                ? "Hubo un problema al consultar los datos. Intenta de nuevo."
                : "La consulta requirió demasiados pasos. Sé más específico en tu pregunta.",
        toolsUsed,
    };
}
