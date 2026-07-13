#!/usr/bin/env node
/**
 * Reporte y ejecución opcional de campaña de prospectos.
 * Uso:
 *   node scripts/reportProspectCampaign.js
 *   node scripts/reportProspectCampaign.js --send
 *   node scripts/reportProspectCampaign.js --send --force
 */
import dotenv from "dotenv";
import { PrismaClient } from "../src/generated/general/index.js";
import { ensureSystemEmailCampaigns, executePlatformEmailCampaign, recoverStuckCampaignRuns } from "../services/adminEmailCampaign/adminEmailCampaignSendService.js";
import { resolveAudienceRecipients } from "../services/adminEmailCampaign/adminEmailCampaignAudienceService.js";
import { evaluateCampaignDue } from "../services/adminEmailCampaign/adminEmailCampaignSchedulerDue.js";
import { isProspectOutreachCampaign, prepareProspectOutreachBatch } from "../services/adminEmailCampaign/adminEmailCampaignProspectSendPolicy.js";

dotenv.config();

const general = new PrismaClient();
const SEND = process.argv.includes("--send");
const FORCE = process.argv.includes("--force");
const CAMPAIGN_KEY = "monthly-prospect-outreach";

async function main() {
    console.log("=== REPORTE CAMPAÑA PROSPECTOS ===\n");
    console.log("Fecha:", new Date().toISOString());
    console.log("RESEND_API_KEY:", process.env.RESEND_API_KEY ? "configurada" : "NO CONFIGURADA");
    console.log("");

    await ensureSystemEmailCampaigns(null);
    const recovered = await recoverStuckCampaignRuns();
    if (recovered.recoveredRuns || recovered.recoveredCampaigns) {
        console.log("Recuperación runs colgados:", JSON.stringify(recovered));
        console.log("");
    }

    const campaign = await general.platformEmailCampaign.findUnique({
        where: { campaignKey: CAMPAIGN_KEY },
    });

    if (!campaign) {
        console.error("Campaña no encontrada:", CAMPAIGN_KEY);
        process.exit(1);
    }

    const prospectStats = await general.platformEmailProspect.groupBy({
        by: ["status"],
        _count: { prospectId: true },
    });

    const totalProspects = await general.platformEmailProspect.count();
    const activeProspects = await general.platformEmailProspect.count({
        where: { status: "ACTIVE" },
    });

    console.log("--- Prospectos ---");
    console.log("Total:", totalProspects);
    for (const row of prospectStats) {
        console.log(`  ${row.status}: ${row._count.prospectId}`);
    }

    const allRecipients = await resolveAudienceRecipients(
        campaign.audienceType,
        campaign.audienceParams,
    );
    const prepared = prepareProspectOutreachBatch(allRecipients, campaign);

    console.log("\n--- Campaña ---");
    console.log("ID:", campaign.campaignId);
    console.log("Nombre:", campaign.campaignName);
    console.log("Estado:", campaign.campaignStatus);
    console.log("Último run:", campaign.lastRunAt?.toISOString() ?? "nunca");
    console.log("Total enviados (histórico):", campaign.totalSent);
    console.log("Total entregados:", campaign.totalDelivered);
    console.log("Total fallidos:", campaign.totalFailed);

    const due = evaluateCampaignDue(campaign, new Date());
    console.log("\n--- Programación ---");
    console.log("¿Debe correr hoy?:", due.isDue ? "SÍ" : "NO");
    if (due.reason) console.log("Motivo:", due.reason);
    console.log("Elegibles en audiencia:", allRecipients.length);
    console.log("Lote preparado para envío:", prepared.recipients.length);
    if (prepared.meta) {
        console.log("Meta lote:", JSON.stringify(prepared.meta, null, 2));
    }

    const recentRuns = await general.platformEmailCampaignRun.findMany({
        where: { campaignId: campaign.campaignId },
        orderBy: { startedAt: "desc" },
        take: 5,
        include: {
            _count: { select: { recipients: true } },
        },
    });

    console.log("\n--- Últimos 5 runs ---");
    if (!recentRuns.length) {
        console.log("  (ninguno)");
    }
    for (const run of recentRuns) {
        console.log(
            `  ${run.startedAt?.toISOString()} | ${run.runStatus} | recipients=${run.recipientCount} sent=${run.sentCount} failed=${run.failedCount} delivered=${run.deliveredCount}`,
        );
    }

    const recentRecipients = await general.platformEmailCampaignRecipient.findMany({
        where: {
            run: { campaignId: campaign.campaignId },
        },
        orderBy: { createdAt: "desc" },
        take: 15,
        select: {
            recipientEmail: true,
            deliveryStatus: true,
            sentAt: true,
            deliveredAt: true,
            errorMessage: true,
            messageVariantId: true,
            createdAt: true,
        },
    });

    console.log("\n--- Últimos 15 envíos ---");
    if (!recentRecipients.length) {
        console.log("  (ninguno)");
    }
    for (const r of recentRecipients) {
        console.log(
            `  ${r.createdAt?.toISOString()} | ${r.recipientEmail} | ${r.deliveryStatus} | variant=${r.messageVariantId ?? "-"}${r.errorMessage ? ` | err=${r.errorMessage}` : ""}`,
        );
    }

    const neverContacted = await general.platformEmailProspect.count({
        where: { status: "ACTIVE", lastOutreachAt: null },
    });
    const contactedThisMonth = activeProspects - neverContacted;

    console.log("\n--- Resumen elegibilidad ---");
    console.log("Activos sin contacto previo:", neverContacted);
    console.log("Activos ya contactados (alguna vez):", contactedThisMonth);
    console.log("Listos para este lote:", prepared.recipients.length);

    if (SEND) {
        console.log("\n=== EJECUTANDO CAMPAÑA ===");
        if (!prepared.recipients.length && !FORCE) {
            console.log("No hay destinatarios elegibles. Usa --force solo si quieres reintentar igual.");
            process.exit(0);
        }
        try {
            const result = await executePlatformEmailCampaign(campaign.campaignId, {
                force: FORCE || !due.isDue,
                source: "manual",
            });
            console.log("Resultado:", JSON.stringify(result, null, 2));
        } catch (err) {
            console.error("Error al ejecutar:", err.message);
            if (err.details) console.error("Detalles:", err.details);
            process.exit(1);
        }
    } else if (prepared.recipients.length > 0) {
        console.log("\n→ Hay prospectos listos. Ejecuta con --send para enviar.");
    } else {
        console.log("\n→ No hay prospectos elegibles en este momento.");
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await general.$disconnect();
    });
