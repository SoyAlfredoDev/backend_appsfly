import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const backendDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const schemas = [
  "prisma/businessDB/schema.prisma",
  "prisma/sharedDB/schema.prisma",
  "prisma/generalDB/schema.prisma",
];
const buildOnlyDatabaseUrl = "postgresql://build:build@127.0.0.1:5432/build?schema=public";

export function prismaGenerateEnv(env = process.env) {
  return {
    ...env,
    DATABASE_URL: env.DATABASE_URL?.trim() || buildOnlyDatabaseUrl,
    DATABASE_SHARED_URL: env.DATABASE_SHARED_URL?.trim() || buildOnlyDatabaseUrl,
    DATABASE_SHARED_MIGRATION_URL:
      env.DATABASE_SHARED_MIGRATION_URL?.trim() || buildOnlyDatabaseUrl,
    DATABASE_GENERAL_URL: env.DATABASE_GENERAL_URL?.trim() || buildOnlyDatabaseUrl,
  };
}

export function generatePrismaClients(env = process.env) {
  const generateEnv = prismaGenerateEnv(env);
  for (const schema of schemas) {
    execFileSync("npx", ["prisma", "generate", "--schema", schema], {
      cwd: backendDir,
      env: generateEnv,
      stdio: "inherit",
      shell: process.platform === "win32",
    });
  }
}

const isDirectRun = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isDirectRun) {
  try {
    generatePrismaClients();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
