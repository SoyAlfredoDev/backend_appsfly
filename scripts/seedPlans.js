/**
 * Inserta o actualiza los planes base de AppsFly (P001 trial + P002 comercial).
 *
 * Uso:
 *   cd backend && node scripts/seedPlans.js
 *   npm run seed:plans
 *
 * Idempotente: puede ejecutarse varias veces sin duplicar registros.
 */
import dotenv from "dotenv";
import { PrismaClient } from "../src/generated/general/index.js";

dotenv.config();

const prisma = new PrismaClient();

const DEFAULT_FEATURES = [
    "5 usuarios",
    "Compras y Ventas",
    "Inventario",
    "Reportes",
    "Soporte 24/7",
];

/** Planes requeridos por el flujo de suscripción en frontend/backend */
const PLANS = [
    {
        planId: "P001",
        planName: "Plan Básico",
        planDescription:
            "Promoción de lanzamiento — 2 meses gratis para negocios sin historial de suscripción.",
        planPrice: 0,
        planDuration: 2,
        planCurrency: "CLP",
        planFeatures: DEFAULT_FEATURES,
        planActive: true,
    },
    {
        planId: "P002",
        planName: "Plan Comercial",
        planDescription: "Suscripción mensual recurrente vía Mercado Pago Chile.",
        planPrice: 9990,
        planDuration: 1,
        planCurrency: "CLP",
        planFeatures: DEFAULT_FEATURES,
        planActive: true,
    },
];

async function main() {
    console.log("Sembrando planes AppsFly…\n");

    for (const plan of PLANS) {
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
            },
        });

        console.log(
            `✓ ${result.planId} — ${result.planName} ($${result.planPrice.toLocaleString("es-CL")} / ${result.planDuration} mes(es))`,
        );
    }

    console.log("\nListo. P001 habilita el trial; P002 el plan de pago.");
}

main()
    .catch((err) => {
        console.error("Error en seedPlans:", err);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
