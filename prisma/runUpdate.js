import { exec } from "child_process";
import { promisify } from "util";
import { fileURLToPath } from "url";
import path from "path";
import { PrismaClient as PrismaBusiness } from "../src/generated/business/index.js";
import { getBusinessService } from "../services/businessService.js";
import { seedOpticsCatalog } from "../libs/opticsCatalogSeed.js";

const execAsync = promisify(exec);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SCHEMA_PATH = path.join(__dirname, "businessDB", "schema.prisma");

async function runUpdate() {
    const updateStatus = [];

    try {
        const businesses = await getBusinessService();

        for (const b of businesses) {
            const connection = b.businessConnectionDB;

            if (!connection) {
                updateStatus.push({
                    businessId: b.businessId,
                    status: "⚠ No DB Connection Found",
                });
                continue;
            }

            try {
                const command = `npx prisma migrate deploy --schema "${SCHEMA_PATH}"`;

                const { stdout, stderr } = await execAsync(command, {
                    env: {
                        ...process.env,
                        DATABASE_URL: connection,
                    },
                });

                if (stdout) console.log(stdout);
                if (stderr) console.log(stderr);

                let seedNote = "";
                if (String(b.businessType || "").toLowerCase() === "optics") {
                    const prisma = new PrismaBusiness({
                        datasources: { db: { url: connection } },
                    });
                    try {
                        let userId = b.createdByUserId;
                        if (!userId) {
                            const admin = await prisma.user.findFirst({
                                where: { userRole: "ADMIN" },
                                select: { userId: true },
                            });
                            userId = admin?.userId;
                        }
                        if (!userId) {
                            const anyUser = await prisma.user.findFirst({
                                select: { userId: true },
                            });
                            userId = anyUser?.userId;
                        }
                        if (userId) {
                            await seedOpticsCatalog(prisma, userId);
                            seedNote = " + optics seed";
                        } else {
                            seedNote = " (optics seed skipped: no user)";
                        }
                    } finally {
                        await prisma.$disconnect();
                    }
                }

                updateStatus.push({
                    businessId: b.businessId,
                    status: `✅ Success${seedNote}`,
                });
            } catch (error) {
                console.error(`❌ Error migrando la DB del negocio ${b.businessId}`);
                console.error(error);

                updateStatus.push({
                    businessId: b.businessId,
                    status: "❌ Failed",
                    error: error.message,
                });
            }
        }
    } catch (error) {
        console.error("❌ Error global en el proceso de migraciones:");
        console.error(error);
    }

    console.log("\n📊 RESUMEN DE MIGRACIONES:");
    console.table(updateStatus);

    return updateStatus;
}

runUpdate();
