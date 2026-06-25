import { runAllDueEmailCampaigns } from "../services/adminEmailCampaign/adminEmailCampaignScheduler.js";

function getCronSecret(req) {
    const header = req.headers.authorization;
    if (header?.startsWith("Bearer ")) {
        return header.slice("Bearer ".length).trim();
    }
    return req.headers["x-cron-secret"]?.trim() ?? null;
}

export async function cronEmailCampaignsController(req, res) {
    try {
        const expected = process.env.CRON_SECRET?.trim();
        if (!expected) {
            return res.status(503).json({
                message: "CRON_SECRET no configurado en el servidor.",
            });
        }

        const provided = getCronSecret(req);
        if (!provided || provided !== expected) {
            return res.status(401).json({ message: "No autorizado." });
        }

        const result = await runAllDueEmailCampaigns();
        return res.status(200).json({
            message: result.ran
                ? "Campañas pendientes procesadas."
                : "No había campañas pendientes en este ciclo.",
            ...result,
        });
    } catch (error) {
        console.error("(cron.emailCampaigns):", error);
        return res.status(500).json({
            message: "Error al ejecutar campañas programadas.",
            error: error.message,
        });
    }
}
