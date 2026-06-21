import { processAssistantChat, getAssistantStatus } from "../services/assistant/assistantService.js";
import { getBusinessByIdService } from "../services/businessService.js";

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
        if (error.message === "INVALID_MESSAGES") {
            return res.status(400).json({
                error: "Envía al menos un mensaje del usuario.",
            });
        }

        console.error("(assistant.chat):", error);

        if (error.message === "GEMINI_NOT_CONFIGURED") {
            return res.status(503).json({
                error: "El asistente no está configurado en el servidor.",
            });
        }

        const isRateLimit =
            error.status === 429 ||
            /quota|rate limit|resource exhausted/i.test(error.message ?? "");

        if (isRateLimit) {
            return res.status(429).json({
                error: "El proveedor de IA alcanzó su límite gratuito. Intenta más tarde.",
            });
        }

        return res.status(500).json({
            error: "No se pudo procesar tu consulta. Intenta de nuevo.",
        });
    }
};
