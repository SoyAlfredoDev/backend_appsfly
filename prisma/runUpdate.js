import { exec } from "child_process";
import { promisify } from "util";
import { fileURLToPath } from "url";
import path from "path";

const execAsync = promisify(exec);


// Directorio de este archivo
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta ABSOLUTA al schema.prisma
const SCHEMA_PATH = path.join(__dirname, "businessDB", "schema.prisma");

import { getBusinessService } from "../services/businessService.js";

async function runUpdate() {
    const updateStatus = [];

    try {
        const businesses = await getBusinessService();
       
        for (const b of businesses) {
            const connection = b.businessConnectionDB;

            if (!connection) {
                updateStatus.push({
                    businessId: b.businessId,
                    status: "⚠ No DB Connection Found"
                });
                continue;
            }

            //console.log(`🔄 Ejecutando migraciones para Business ID: ${b.businessId}`);

            try {
                const command = `npx prisma migrate deploy --schema "${SCHEMA_PATH}"`;

                const { stdout, stderr } = await execAsync(command, {
                    env: {
                        ...process.env,
                        DATABASE_URL: connection
                    }
                });

                if (stdout) console.log(stdout);
                if (stderr) console.log(stderr); // stderr NO siempre es error

                updateStatus.push({
                    businessId: b.businessId,
                    status: "✅ Success"
                });

            } catch (error) {
                console.error(`❌ Error migrando la DB del negocio ${b.businessId}`);
                console.error(error);

                updateStatus.push({
                    businessId: b.businessId,
                    status: "❌ Failed",
                    error: error.message
                });
            }
        }

    } catch (error) {
        console.error("❌ Error global en el proceso de migraciones:");
        console.error(error);
    }

    // Mostrar resumen final
    console.log("\n📊 RESUMEN DE MIGRACIONES:");
    console.table(updateStatus);

    return updateStatus;
}

runUpdate();
