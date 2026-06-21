/**
 * Crea campañas de email del sistema (ej. reactivación mensual suspendidos).
 * Uso: cd backend && node scripts/seedEmailCampaigns.js
 */
import dotenv from "dotenv";
import { PrismaClient } from "../src/generated/general/index.js";
import { ensureSystemEmailCampaigns } from "../services/adminEmailCampaign/adminEmailCampaignSendService.js";

dotenv.config();

const prisma = new PrismaClient();

async function main() {
    const superAdminId = process.env.SUPER_ADMIN_IDS?.split(",")?.[0]?.trim();
    if (!superAdminId) {
        throw new Error("Define SUPER_ADMIN_IDS en .env con al menos un userId.");
    }

    const user = await prisma.user.findUnique({ where: { userId: superAdminId } });
    if (!user) {
        throw new Error(`No existe usuario super admin: ${superAdminId}`);
    }

    const results = await ensureSystemEmailCampaigns(superAdminId);
    for (const row of results) {
        console.info(
            row.created ? "✓ Creada" : "· Ya existía",
            row.campaignKey,
            "→",
            row.campaign.campaignId,
        );
    }
}

main()
    .catch((err) => {
        console.error(err);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
