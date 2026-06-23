import { processAssistantChat, getAssistantStatus } from "../services/assistant/assistantService.js";
import { AssistantSecurityError } from "../services/assistant/assistantSecurity.js";
import { getBusinessByIdService } from "../services/businessService.js";

function mapAssistantError(error) {
    const message = error.message ?? "";

    if (error instanceof AssistantSecurityError) {
        return {
            status: error.code === "MESSAGE_BLOCKED" ? 403 : 400,
            error: message,
            code: error.code,
        };
    }

    if (error.message === "INVALID_MESSAGES") {
        return {
            status: 400,
            error: "Envía al menos un mensaje del usuario.",
        };
    }

    if (error.message === "GEMINI_NOT_CONFIGURED") {
        return {
            status: 503,
            error: "El asistente no está configurado en el servidor.",
        };
    }

    const isQuota =
        error.status === 429 ||
        /quota|rate limit|resource exhausted|prepayment credits are depleted/i.test(
            message,
        );

    if (isQuota) {
        return {
            status: 429,
            error:
                "El proveedor de IA no tiene créditos disponibles. Revisa la facturación en Google AI Studio e intenta de nuevo.",
        };
    }

    if (/GEMINI_BLOCKED|GEMINI_SAFETY_BLOCK/i.test(message)) {
        return {
            status: 400,
            error: "No pude responder por restricciones de contenido. Reformula tu consulta.",
        };
    }

    if (
        /INVALID_ARGUMENT|malformed|GEMINI_EMPTY_RESPONSE/i.test(message) ||
        error.geminiCode === "INVALID_ARGUMENT"
    ) {
        return {
            status: 502,
            error:
                "Error de comunicación con el proveedor de IA. Intenta de nuevo en unos segundos.",
        };
    }

    return {
        status: 500,
        error: "No se pudo procesar tu consulta. Intenta de nuevo.",
    };
}

export const assistantStatusController = async (req, res) => {
    try {
        const status = getAssistantStatus();
        return res.status(200).json({
            ...status,
            role: req.tenantRole,
            canAccess: req.tenantRole === "ADMIN",
        });
    } catch (error) {
        console.error("(assistant.status):", error);
        return res.status(500).json({ error: "No se pudo obtener el estado del asistente." });
    }
};

export const assistantChatController = async (req, res) => {
    try {
        const { messages } = req.body ?? {};
        const userId = req.user?.payload?.id;

        if (!req.prisma || !req.tenantBusinessId) {
            return res.status(403).json({
                error: "No se pudo resolver el negocio activo.",
                code: "TENANT_FORBIDDEN",
            });
        }

        let businessName = null;
        try {
            const business = await getBusinessByIdService(req.tenantBusinessId);
            businessName = business?.businessName ?? null;
        } catch {
            businessName = null;
        }

        const result = await processAssistantChat({
            messages,
            prisma: req.prisma,
            userId,
            businessId: req.tenantBusinessId,
            businessName,
        });

        return res.status(200).json(result);
    } catch (error) {
        const mapped = mapAssistantError(error);
        if (mapped.status >= 500) {
            console.error("(assistant.chat):", error);
        } else {
            console.warn("(assistant.chat):", error.message);
        }
        return res.status(mapped.status).json({
            error: mapped.error,
            ...(mapped.code ? { code: mapped.code } : {}),
        });
    }
};
