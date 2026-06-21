/**
 * Marca prospectos que ya son usuarios registrados (backfill de atribución).
 * Uso: node scripts/backfillProspectConversions.js
 */
import dotenv from "dotenv";
import { PrismaClient as PrismaGeneral } from "../src/generated/general/index.js";
import { markProspectConvertedByEmail } from "../services/emailProspect/emailProspectConversionService.js";

dotenv.config();

const general = new PrismaGeneral();

async function main() {
    const prospects = await general.platformEmailProspect.findMany({
        where: { status: { in: ["ACTIVE", "UNSUBSCRIBED"] } },
        select: { email: true },
    });

    let converted = 0;
    for (const prospect of prospects) {
        const user = await general.user.findUnique({
            where: { userEmail: prospect.email },
            select: { userId: true },
        });
        if (user) {
            await markProspectConvertedByEmail(prospect.email, user.userId);
            converted += 1;
        }
    }

    console.log(`Backfill listo: ${converted} prospecto(s) marcados como CONVERTED.`);
}

main()
    .catch((err) => {
        console.error(err);
        process.exit(1);
    })
    .finally(() => general.$disconnect());
