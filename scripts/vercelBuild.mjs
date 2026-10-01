import { execFileSync } from "node:child_process";
import { mkdir, copyFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import * as esbuild from "esbuild";

const backendDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const bundlePath = path.join(backendDir, "dist", "index.js");
const functionPath = path.join(backendDir, "api", "index.js");

export function shouldMigrateSharedDatabase(env = process.env) {
  return Boolean(env.DATABASE_SHARED_MIGRATION_URL?.trim());
}

function runPrismaMigrate(schema) {
  execFileSync("npx", ["prisma", "migrate", "deploy", "--schema", schema], {
    cwd: backendDir,
    stdio: "inherit",
    env: process.env,
    shell: process.platform === "win32",
  });
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
  runPrismaMigrate(path.join(backendDir, "prisma", "generalDB", "schema.prisma"));
  if (!shouldMigrateSharedDatabase(env)) {
    console.warn(
      "DATABASE_SHARED_MIGRATION_URL is not set. Shared data-plane migrations were skipped.",
    );
    return;
  }
  runPrismaMigrate(path.join(backendDir, "prisma", "sharedDB", "schema.prisma"));
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
