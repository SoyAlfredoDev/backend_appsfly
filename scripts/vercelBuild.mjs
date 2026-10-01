import { execFileSync } from "node:child_process";
import { mkdir, copyFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import * as esbuild from "esbuild";

const backendDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const bundlePath = path.join(backendDir, "dist", "index.js");
const functionPath = path.join(backendDir, "api", "index.js");

const MIGRATION_ATTEMPTS = 3;
const MIGRATION_RETRY_DELAY_MS = 5_000;

export function shouldMigrateSharedDatabase(env = process.env) {
  return Boolean(env.DATABASE_SHARED_MIGRATION_URL?.trim());
}

/**
 * Prisma migrations need Neon's direct host. The pooled `-pooler` host used at
 * runtime often times out while a suspended compute wakes up.
 */
export function migrationDatabaseUrl(url) {
  const trimmed = url?.trim();
  if (!trimmed) return trimmed;

  let parsed;
  try {
    parsed = new URL(trimmed);
  } catch {
    return trimmed;
  }

  parsed.hostname = parsed.hostname.replace(/-pooler(?=\.)/, "");
  parsed.searchParams.delete("pgbouncer");
  if (!parsed.searchParams.has("connect_timeout")) {
    parsed.searchParams.set("connect_timeout", "30");
  }
  return parsed.toString();
}

export function migrationEnvForSchema(schema, env) {
  const next = { ...env };
  const normalized = schema.replaceAll("\\", "/");
  const key = normalized.includes("/sharedDB/")
    ? "DATABASE_SHARED_MIGRATION_URL"
    : "DATABASE_GENERAL_URL";
  if (next[key]) next[key] = migrationDatabaseUrl(next[key]);
  return next;
}

export function isRetryableDatabaseError(output) {
  return /P1001|Can't reach database server|ECONNREFUSED|ETIMEDOUT|timeout expired/i.test(output);
}

function sleepSync(ms) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

function runPrismaMigrate(schema, env = process.env) {
  const migrateEnv = migrationEnvForSchema(schema, env);
  for (let attempt = 1; attempt <= MIGRATION_ATTEMPTS; attempt += 1) {
    try {
      const output = execFileSync("npx", ["prisma", "migrate", "deploy", "--schema", schema], {
        cwd: backendDir,
        encoding: "utf8",
        env: migrateEnv,
        shell: process.platform === "win32",
      });
      if (output) console.log(output);
      return;
    } catch (error) {
      const output = `${error.stdout ?? ""}\n${error.stderr ?? ""}`;
      if (output.trim()) console.error(output);
      if (!isRetryableDatabaseError(output) || attempt === MIGRATION_ATTEMPTS) {
        throw error;
      }
      console.warn(
        `Database was not reachable (attempt ${attempt} of ${MIGRATION_ATTEMPTS}). Waiting for Neon to wake up.`,
      );
      sleepSync(MIGRATION_RETRY_DELAY_MS);
    }
  }
}

export async function bundleApi() {
  await mkdir(path.dirname(bundlePath), { recursive: true });
  await esbuild.build({
    entryPoints: [path.join(backendDir, "api", "index.js")],
    outfile: bundlePath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    packages: "external",
    plugins: [
      {
        name: "external-prisma-engines",
        setup(build) {
          build.onResolve({ filter: /[\\/]src[\\/]generated[\\/]/ }, (args) => {
            const absolute = path.resolve(args.resolveDir, args.path);
            let relative = path.relative(path.dirname(bundlePath), absolute).replaceAll("\\", "/");
            if (!relative.startsWith(".")) relative = `./${relative}`;
            return { path: relative, external: true };
          });
        },
      },
    ],
  });
  return bundlePath;
}

export async function deployControlPlaneMigrations(env = process.env) {
  runPrismaMigrate(path.join(backendDir, "prisma", "generalDB", "schema.prisma"), env);
  if (!shouldMigrateSharedDatabase(env)) {
    console.warn(
      "DATABASE_SHARED_MIGRATION_URL is not set. Shared data-plane migrations were skipped.",
    );
    return;
  }
  runPrismaMigrate(path.join(backendDir, "prisma", "sharedDB", "schema.prisma"), env);
}

async function main() {
  const bundled = await bundleApi();
  if (process.env.VERCEL === "1") {
    await copyFile(bundled, functionPath);
    await deployControlPlaneMigrations();
  }
}

const isDirectRun = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isDirectRun) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
