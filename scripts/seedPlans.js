/**
 * Alinea P001–P004 con el catálogo vigente en producción (CLP).
 *
 * No inserta Start, Pro ni Élite. Esas tarifas en UF están pendientes de
 * aprobación en services/billing/opticsPlanCatalog.ts y no deben cobrarse.
 *
 * Uso:
 *   cd backend && node scripts/seedPlans.js
 *   npm run seed:plans
 *
 * Si un plan ya tiene pagos, el script aborta antes de cambiar su precio.
 */
import dotenv from "dotenv";
import { PrismaClient } from "../src/generated/general/index.js";

dotenv.config();

const prisma = new PrismaClient();

const BASE_FEATURES = ["5 usuarios", "Compras y Ventas", "Inventario", "Reportes", "Soporte 24/7"];

const PRO_FEATURES = [
  ...BASE_FEATURES,
  "Boletas electrónicas",
  "Facturas electrónicas",
  "Asistente con IA",
  "Envío de correos a clientes",
];

const OPTICS_FEATURES = [
  "5 usuarios",
  "Clientes y recetas OD/OI",
  "Ventas y cotizaciones",
  "Órdenes de trabajo (OT)",
  "Laboratorios y despachos",
  "Productos e inventario de óptica",
  "Certificados de compra",
  "Cierres diarios y gastos",
  "Reportes",
  "Soporte 24/7",
];

/** Planes requeridos por el flujo de suscripción en frontend/backend */
const PLANS = [
  {
    planId: "P001",
    planName: "Plan Básico",
    planDescription:
      "Plan Básico — promoción de lanzamiento: 2 meses gratis para negocios sin historial de suscripción. Luego aplica el plan de pago correspondiente a tu modalidad.",
    planPrice: 0,
    planDuration: 2,
    planCurrency: "CLP",
    planFeatures: BASE_FEATURES,
    planActive: true,
    planDatabaseMode: "SHARED",
  },
  {
    planId: "P002",
    planName: "Plan Comercial",
    planDescription:
      "Suscripción mensual recurrente vía Mercado Pago Chile. Precio neto + IVA (19%).",
    planPrice: 9990,
    planDuration: 1,
    planCurrency: "CLP",
    planFeatures: BASE_FEATURES,
    planActive: true,
    planDatabaseMode: "SHARED",
  },
  {
    planId: "P003",
    planName: "Plan Profesional",
    planDescription:
      "Facturación electrónica, asistente con IA y comunicación por correo con tus clientes. Precio neto + IVA (19%).",
    planPrice: 39990,
    planDuration: 1,
    planCurrency: "CLP",
    planFeatures: PRO_FEATURES,
    planActive: true,
    planDatabaseMode: "SHARED",
  },
  {
    planId: "P004",
    planName: "Plan Óptica",
    planDescription:
      "Plan exclusivo para ópticas: recetas, OT, laboratorios, inventario y ventas. Precio neto $19.990/mes + IVA (19%).",
    planPrice: 19990,
    planDuration: 1,
    planCurrency: "CLP",
    planFeatures: OPTICS_FEATURES,
    planActive: true,
    planDatabaseMode: "SHARED",
  },
];

async function main() {
  console.log("Este script ya no escribe planes.");
  console.log("Usa: npx tsx scripts/applyOpticsCatalog.ts");
  return;

  for (const plan of PLANS) {
    const existing = await prisma.plan.findUnique({ where: { planId: plan.planId } });
    if (existing && Number(existing.planPrice) !== Number(plan.planPrice)) {
      const payments = await prisma.subscriptionPayment.count({
        where: { subscriptionPlanId: plan.planId },
      });
      if (payments > 0) {
        throw new Error(
          `No se cambia el precio de ${plan.planId}: ya tiene ${payments} pago(s) y el cobro recurrente quedaría desalineado.`,
        );
      }
    }

    const result = await prisma.plan.upsert({
      where: { planId: plan.planId },
      create: plan,
      update: {
        planName: plan.planName,
        planDescription: plan.planDescription,
        planPrice: plan.planPrice,
        planDuration: plan.planDuration,
        planCurrency: plan.planCurrency,
        planFeatures: plan.planFeatures,
        planActive: plan.planActive,
        planDatabaseMode: plan.planDatabaseMode,
      },
    });

    console.log(
      `✓ ${result.planId} — ${result.planName} ($${result.planPrice.toLocaleString("es-CL")} / ${result.planDuration} mes(es))`,
    );
  }

  console.log("\nListo. Catálogo CLP vigente: P001 trial, P002 comercial, P003 profesional, P004 óptica.");
}

main()
  .catch((err) => {
    console.error("Error en seedPlans:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
