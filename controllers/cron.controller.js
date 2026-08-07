import { runAllDueEmailCampaigns } from "../services/adminEmailCampaign/adminEmailCampaignScheduler.js";
import { reconcileMercadoPagoSubscriptionRenewals } from "../services/mercadopago/mpRenewalReconcileService.js";

function getCronSecret(req) {
    const header = req.headers.authorization;
    if (header?.startsWith("Bearer ")) {
        return header.slice("Bearer ".length).trim();
    }
    return req.headers["x-cron-secret"]?.trim() ?? null;
}

function assertCronAuthorized(req, res) {
    const expected = process.env.CRON_SECRET?.trim();
    if (!expected) {
        res.status(503).json({
            message: "CRON_SECRET no configurado en el servidor.",
        });
        return false;
    }

    const provided = getCronSecret(req);
    if (!provided || provided !== expected) {
        res.status(401).json({ message: "No autorizado." });
        return false;
    }

    return true;
}

export async function cronEmailCampaignsController(req, res) {
    try {
        if (!assertCronAuthorized(req, res)) return;

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

/** Reconciliación diaria de renovaciones MP no aplicadas por webhook perdido. */
export async function cronMpSubscriptionRenewalsController(req, res) {
    try {
        if (!assertCronAuthorized(req, res)) return;

        const result = await reconcileMercadoPagoSubscriptionRenewals();
        return res.status(200).json({
            message: "Reconciliación de renovaciones Mercado Pago completada.",
            ...result,
        });
    } catch (error) {
        console.error("(cron.mpSubscriptionRenewals):", error);
        return res.status(500).json({
            message: "Error al reconciliar renovaciones Mercado Pago.",
            error: error.message,
        });
    }
}
