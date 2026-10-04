/**
 * Aplica el catálogo vigente de ópticas en GeneralDB.
 * No modifica suscripciones, pagos ni preapprovals de Mercado Pago.
 * Si un plan ya tiene pagos, aborta antes de cambiar su precio.
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import dotenv from "dotenv";
import { PrismaClient } from "../src/generated/general/index.js";
import {
  LEGACY_PLAN_IDS,
  OPTICS_PLANS,
  publicFeatureLabels,
} from "../services/billing/opticsPlanCatalog.ts";

dotenv.config();

const prisma = new PrismaClient();

function planDescription(plan: (typeof OPTICS_PLANS)[number]): string {
  if (plan.tier === "trial") {
    return "Prueba de 2 meses con las funciones de Pro. Una vez por negocio. No inicia un cobro al terminar.";
  }
  return `${plan.displayName} para ópticas. Precio neto $${plan.price?.netAmount.toLocaleString("es-CL")}/mes + IVA (19%).`;
}

async function main() {
  const before = await prisma.plan.findMany({ orderBy: { planId: "asc" } });
  const backupDir = path.resolve("tmp");
  await mkdir(backupDir, { recursive: true });
  const backupPath = path.join(backupDir, "plan-backup-2026-10-04.json");
  await writeFile(backupPath, JSON.stringify(before, null, 2));
  console.log(`Respaldo de planes: ${backupPath}`);

  for (const plan of OPTICS_PLANS) {
    const price = plan.price?.netAmount ?? 0;
    const existing = await prisma.plan.findUnique({ where: { planId: plan.planId } });
    if (existing && Number(existing.planPrice) !== price) {
      const payments = await prisma.subscriptionPayment.count({
        where: { subscriptionPlanId: plan.planId },
      });
      if (payments > 0) {
        throw new Error(`No se cambia el precio de ${plan.planId}: ya tiene ${payments} pago(s).`);
      }
    }

    const data = {
      planName: plan.displayName,
      planDescription: planDescription(plan),
      planFeatures: publicFeatureLabels(plan),
      planPrice: price,
      planDuration: plan.durationMonths,
      planCurrency: "CLP",
      planActive: true,
      planDatabaseMode: plan.databaseMode,
    };

    await prisma.plan.upsert({
      where: { planId: plan.planId },
      create: { planId: plan.planId, ...data },
      update: data,
    });
    console.log(`✓ ${plan.planId} ${plan.displayName} $${price}`);
  }

  for (const planId of LEGACY_PLAN_IDS) {
    const existing = await prisma.plan.findUnique({ where: { planId } });
    if (!existing) continue;
    await prisma.plan.update({
      where: { planId },
      data: { planActive: false },
    });
    console.log(
      `· ${planId} queda inactivo para nuevas contrataciones. Precio conservado: ${existing.planPrice}`,
    );
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
