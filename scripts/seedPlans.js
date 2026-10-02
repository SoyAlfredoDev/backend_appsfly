/**
 * Inserta o actualiza el catálogo legado y los planes de óptica.
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

const BASE_FEATURES = [
    "5 usuarios",
    "Compras y Ventas",
    "Inventario",
    "Reportes",
    "Soporte 24/7",
];

const PRO_FEATURES = [
    ...BASE_FEATURES,
    "Boletas electrónicas",
    "Facturas electrónicas",
    "Asistente con IA",
    "Envío de correos a clientes",
];

const OPTICS_START_FEATURES = [
    "1 usuario y 1 sucursal",
    "Clientes y recetas",
    "Cotizaciones y ventas",
    "Abonos y saldos",
    "Órdenes de trabajo",
    "Inventario básico",
    "Soporte estándar",
];
const OPTICS_STANDARD_FEATURES = [
    "Hasta 5 usuarios y 1 sucursal",
    ...OPTICS_START_FEATURES.slice(1),
    "Agenda de citas",
    "Laboratorios y despachos",
    "Compras, gastos y proveedores",
    "Caja y cierre diario",
    "Reportes completos",
    "WhatsApp y correo",
];
const OPTICS_PRO_FEATURES = [
    "Hasta 10 usuarios y 2 sucursales",
    ...OPTICS_STANDARD_FEATURES.slice(1),
    "Control e inventario por sucursal",
    "Reportes por vendedor",
    "Soporte prioritario",
];
const START_MODULES = [
    "customers", "prescriptions", "quotations", "sales", "payments",
    "work_orders", "inventory", "products", "support",
];
const STANDARD_MODULES = [
    ...START_MODULES,
    "appointments", "laboratories", "lab_dispatches", "purchases", "providers",
    "expenses", "daily_closures", "reports", "communications", "transactions", "finance",
];
const OFFER_END = new Date("2027-01-01T03:00:00.000Z");

/** Planes requeridos por el flujo de suscripción en frontend/backend */
const PLANS = [
    {
        planId: "P001",
        planName: "Plan Básico",
        planDescription:
            "Plan Básico — valor neto $9.990/mes (+ IVA). Promoción de lanzamiento: 2 meses gratis para negocios sin historial de suscripción.",
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
        planDescription: "Suscripción mensual recurrente vía Mercado Pago Chile. Precio neto + IVA (19%).",
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
        planId: "OPT-TRIAL",
        planName: "Prueba gratuita Óptica",
        planDescription: "Dos meses de acceso Estándar, una vez por negocio.",
        planPrice: 0,
        planDuration: 2,
        planCurrency: "CLP",
        planFeatures: OPTICS_STANDARD_FEATURES,
        planActive: true,
        planDatabaseMode: "SHARED",
        planBusinessType: "optics",
        planTier: "TRIAL",
        planCapabilities: { modules: STANDARD_MODULES, maxUsers: 5, maxBranches: 1 },
    },
    {
        planId: "OPT-START",
        planName: "Óptica Start",
        planDescription: "Precio mensual en UF, más IVA. Oferta 2026 conservada mientras la suscripción siga activa.",
        planPrice: 0,
        planDuration: 1,
        planCurrency: "UF",
        planFeatures: OPTICS_START_FEATURES,
        planActive: false,
        planDatabaseMode: "SHARED",
        planBusinessType: "optics",
        planTier: "START",
        planCapabilities: { modules: START_MODULES, maxUsers: 1, maxBranches: 1 },
        planListPriceUf: "0.700",
        planOfferPriceUf: "0.600",
        planOfferEndsAt: OFFER_END,
    },
    {
        planId: "OPT-STANDARD",
        planName: "Óptica Estándar",
        planDescription: "Precio mensual en UF, más IVA. Oferta 2026 conservada mientras la suscripción siga activa.",
        planPrice: 0,
        planDuration: 1,
        planCurrency: "UF",
        planFeatures: OPTICS_STANDARD_FEATURES,
        planActive: false,
        planDatabaseMode: "SHARED",
        planBusinessType: "optics",
        planTier: "STANDARD",
        planCapabilities: { modules: STANDARD_MODULES, maxUsers: 5, maxBranches: 1 },
        planListPriceUf: "1.200",
        planOfferPriceUf: "1.000",
        planOfferEndsAt: OFFER_END,
    },
    {
        planId: "OPT-PRO",
        planName: "Óptica Pro",
        planDescription: "Propuesta pendiente de aprobación comercial y de la función de sucursales.",
        planPrice: 0,
        planDuration: 1,
        planCurrency: "UF",
        planFeatures: OPTICS_PRO_FEATURES,
        planActive: false,
        planDatabaseMode: "SHARED",
        planBusinessType: "optics",
        planTier: "PRO",
        planCapabilities: { modules: [...STANDARD_MODULES, "branches", "branch_inventory", "salesperson_reports"], maxUsers: 10, maxBranches: 2 },
        planListPriceUf: "2.000",
        planOfferPriceUf: "1.700",
        planOfferEndsAt: OFFER_END,
    },
];

async function main() {
    console.log("Sembrando planes AppsFly…\n");

    for (const plan of PLANS) {
        const result = await prisma.plan.upsert({
            where: { planId: plan.planId },
            create: plan,
            // Keep existing legacy contracts and admin edits untouched.
            update: !plan.planId.startsWith("OPT-") ? {} : {
                planName: plan.planName,
                planDescription: plan.planDescription,
                planPrice: plan.planPrice,
                planDuration: plan.planDuration,
                planCurrency: plan.planCurrency,
                planFeatures: plan.planFeatures,
                planActive: plan.planActive,
                planDatabaseMode: plan.planDatabaseMode,
                planBusinessType: plan.planBusinessType,
                planTier: plan.planTier,
                planCapabilities: plan.planCapabilities,
                planListPriceUf: plan.planListPriceUf,
                planOfferPriceUf: plan.planOfferPriceUf,
                planOfferEndsAt: plan.planOfferEndsAt,
            },
        });

        console.log(
            `✓ ${result.planId} — ${result.planName} (${result.planCurrency} / ${result.planDuration} mes(es))`,
        );
    }

    console.log("\nListo. Los planes legados se conservan; Pro óptica permanece inactivo.");
}

main()
    .catch((err) => {
        console.error("Error en seedPlans:", err);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
