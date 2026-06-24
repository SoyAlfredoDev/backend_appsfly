/**
 * Aplica migraciones pendientes en:
 * 1) Base de datos GENERAL (DATABASE_GENERAL_URL) — tabla Business, usuarios, etc.
 * 2) Cada base de datos de NEGOCIO (businessConnectionDB por tenant) — ventas, productos, etc.
 *
 * Uso: npm run migrate:all
 */
import { exec } from "child_process";
import { promisify } from "util";
import { fileURLToPath } from "url";
import path from "path";
import { getBusinessService } from "../services/businessService.js";

const execAsync = promisify(exec);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const GENERAL_SCHEMA = path.join(ROOT, "prisma/generalDB/schema.prisma");
const BUSINESS_SCHEMA = path.join(ROOT, "prisma/businessDB/schema.prisma");

async function deployGeneralMigrations() {
    console.log("\n🌐 Migrando base GENERAL (DATABASE_GENERAL_URL)...");
    const { stdout, stderr } = await execAsync(
        `npx prisma migrate deploy --schema "${GENERAL_SCHEMA}"`,
        { cwd: ROOT, env: process.env },
    );
    if (stdout) console.log(stdout);
    if (stderr) console.log(stderr);
    console.log("✅ Base general actualizada.\n");
}

async function deployTenantMigrations() {
    const businesses = await getBusinessService();
    const updateStatus = [];

    console.log(`🏢 Migrando ${businesses.length} base(s) de negocio...\n`);

    for (const business of businesses) {
        const { businessId, businessConnectionDB: connection } = business;

        if (!connection) {
            updateStatus.push({ businessId, status: "⚠ Sin conexión" });
            continue;
        }

        try {
            const failedMigration = "20260625150000_migrate_auth_cl";
            await execAsync(
                `npx prisma migrate resolve --rolled-back "${failedMigration}" --schema "${BUSINESS_SCHEMA}"`,
                {
                    cwd: ROOT,
                    env: { ...process.env, DATABASE_URL: connection },
                },
            ).catch(() => {
                // Ignorar si no había migración fallida pendiente de resolver.
            });

            const { stdout, stderr } = await execAsync(
                `npx prisma migrate deploy --schema "${BUSINESS_SCHEMA}"`,
                {
                    cwd: ROOT,
                    env: { ...process.env, DATABASE_URL: connection },
                },
            );

            if (stdout) console.log(`[${businessId}]\n${stdout}`);
            if (stderr) console.log(stderr);

            updateStatus.push({ businessId, status: "✅ OK" });
        } catch (error) {
            console.error(`❌ Error en negocio ${businessId}:`, error.message);
            updateStatus.push({
                businessId,
                status: "❌ Error",
                error: error.message?.slice(0, 200),
            });
        }
    }

    console.log("\n📊 Resumen bases de negocio:");
    console.table(updateStatus);
    return updateStatus;
}

async function main() {
    await deployGeneralMigrations();
    await deployTenantMigrations();
}

main().catch((error) => {
    console.error("❌ migrate:all falló:", error);
    process.exit(1);
});
