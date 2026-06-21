/**
 * Envía un correo de prueba por cada campaña de plataforma al destinatario indicado.
 * Verifica remitentes distintos (reactivacion@, avisos@, pagos@, etc.).
 *
 * Uso:
 *   node scripts/testCampaignSenderEmails.js
 *   node scripts/testCampaignSenderEmails.js --to=otro@email.com
 */
import dotenv from "dotenv";
import { PrismaClient } from "../src/generated/general/index.js";
import { ensureSystemEmailCampaigns } from "../services/adminEmailCampaign/adminEmailCampaignSendService.js";
import { renderCampaignEmail, getSamplePreviewRecipient } from "../services/adminEmailCampaign/adminEmailCampaignTemplateService.js";
import { resolveCampaignSenderFrom } from "../services/adminEmailCampaign/adminEmailCampaignSenderService.js";
import { getDefaultSenderFrom } from "../emails/core/emailFrom.js";
import { sendEmail } from "../emails/core/sendEmail.js";

dotenv.config();

const prisma = new PrismaClient();
const DEFAULT_TEST_TO = "appsfly.cl@gmail.com";

function parseToArg() {
    const arg = process.argv.find((a) => a.startsWith("--to="));
    if (arg) return arg.slice("--to=".length).trim().toLowerCase();
    return DEFAULT_TEST_TO;
}

async function main() {
    const to = parseToArg();
    if (!process.env.RESEND_API_KEY?.trim()) {
        throw new Error("RESEND_API_KEY no configurada en backend/.env");
    }

    const superAdminId = process.env.SUPER_ADMIN_IDS?.split(",")?.[0]?.trim();
    if (!superAdminId) {
        throw new Error("Define SUPER_ADMIN_IDS en backend/.env");
    }

    console.info(`\n📧 Prueba de remitentes de campañas → ${to}\n`);

    await ensureSystemEmailCampaigns(superAdminId);

    const campaigns = await prisma.platformEmailCampaign.findMany({
        orderBy: { campaignName: "asc" },
    });

    if (!campaigns.length) {
        console.warn("No hay campañas en la base de datos.");
        return;
    }

    const sampleRecipient = {
        ...getSamplePreviewRecipient(),
        firstName: "AppsFly",
        lastName: "Test",
        businessName: "Negocio de prueba AppsFly",
        planName: "Plan Profesional",
        expiryDateFormatted: "viernes, 20 de junio de 2026",
        daysUntilExpiry: 5,
    };

    const results = [];

    for (const campaign of campaigns) {
        const from = resolveCampaignSenderFrom(campaign);
        const rendered = renderCampaignEmail(campaign, sampleRecipient);
        const subject = `[TEST] ${rendered.subject}`;

        try {
            const data = await sendEmail({
                to,
                subject,
                html: rendered.html,
                text: rendered.text,
                from,
            });
            results.push({
                ok: true,
                campaignKey: campaign.campaignKey ?? campaign.campaignId,
                campaignName: campaign.campaignName,
                from,
                messageId: data?.id,
            });
            console.info(`✓ ${campaign.campaignName}`);
            console.info(`  Desde: ${from}`);
            console.info(`  ID Resend: ${data?.id ?? "—"}\n`);
        } catch (error) {
            results.push({
                ok: false,
                campaignKey: campaign.campaignKey ?? campaign.campaignId,
                campaignName: campaign.campaignName,
                from,
                error: error.message,
            });
            console.error(`✗ ${campaign.campaignName}`);
            console.error(`  Desde: ${from}`);
            console.error(`  Error: ${error.message}\n`);
        }

        await new Promise((r) => setTimeout(r, 400));
    }

    // Remitente por defecto (correos transaccionales, no campaña)
    const defaultFrom = getDefaultSenderFrom();
    try {
        const data = await sendEmail({
            to,
            from: defaultFrom,
            subject: "[TEST] Remitente por defecto AppsFly",
            html: `<p>Prueba del remitente por defecto: <strong>${defaultFrom}</strong></p>`,
            text: `Prueba del remitente por defecto: ${defaultFrom}`,
        });
        console.info(`✓ Remitente por defecto (no campaña)`);
        console.info(`  Desde: ${defaultFrom}`);
        console.info(`  ID Resend: ${data?.id ?? "—"}\n`);
        results.push({ ok: true, campaignKey: "default-from", from: defaultFrom, messageId: data?.id });
    } catch (error) {
        console.error(`✗ Remitente por defecto: ${error.message}\n`);
        results.push({ ok: false, campaignKey: "default-from", from: defaultFrom, error: error.message });
    }

    const ok = results.filter((r) => r.ok).length;
    const fail = results.filter((r) => !r.ok).length;
    console.info("── Resumen ──");
    console.info(`Enviados OK: ${ok} · Fallidos: ${fail} · Total: ${results.length}`);

    if (fail > 0) {
        process.exit(1);
    }
}

main()
    .catch((err) => {
        console.error(err);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
