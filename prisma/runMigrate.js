import { exec } from "child_process";
import { promisify } from "util";
import { fileURLToPath } from "url";
import path from "path";

const execAsync = promisify(exec);

// Obtener directorio actual del archivo
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta ABSOLUTA al schema.prisma
const SCHEMA_PATH = path.join(__dirname, "businessDB", "schema.prisma");

/**
 * Ejecuta Prisma migrate.deploy usando una DATABASE_URL dinámica.
 *
 * @param {string} dbUrl - URL temporal de la base del nuevo negocio.
 * @returns {Promise<void>}
 */
export const runPrismaMigrate = async (dbUrl) => {
    try {

        const command = `npx prisma migrate deploy --schema "${SCHEMA_PATH}"`;
        const { stdout, stderr } = await execAsync(command, {
            env: {
                ...process.env,
                DATABASE_URL: dbUrl,
            },
        });
        if (stdout) console.log("📘 Prisma:", stdout);
        if (stderr) console.log("📕 Prisma (stderr):", stderr); // No es error real

        return true

    } catch (error) {
        console.error("❌ Error ejecutando Prisma migrate:");
        console.error(error);
        throw error;
    }
};