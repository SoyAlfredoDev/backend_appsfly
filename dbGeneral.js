import { PrismaClient as PrismaGeneral } from "./src/generated/general/index.js";
import { serverlessDatabaseUrl } from "./services/database/serverlessDatabaseUrl.js";

const globalForPrisma = globalThis;
const datasourceUrl = serverlessDatabaseUrl(process.env.DATABASE_GENERAL_URL);

function createGeneralClient() {
  if (!datasourceUrl) return new PrismaGeneral();
  return new PrismaGeneral({
    datasources: { db: { url: datasourceUrl } },
  });
}

export const generalPrisma = globalForPrisma.__appsflyGeneralPrisma ?? createGeneralClient();
globalForPrisma.__appsflyGeneralPrisma = generalPrisma;
