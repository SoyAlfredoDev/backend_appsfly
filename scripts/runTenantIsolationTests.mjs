import { spawnSync } from "node:child_process";
if (!process.env.TEST_SHARED_DATABASE_URL || process.env.TEST_ISOLATED_DATABASE !== "true") {
  console.error(
    "Isolation release gate requires TEST_SHARED_DATABASE_URL and TEST_ISOLATED_DATABASE=true for an isolated database. Never use production.",
  );
  process.exit(1);
}
const result = spawnSync(
  process.execPath,
  ["node_modules/vitest/vitest.mjs", "run", "tests/tenantRls.integration.test.ts"],
  { stdio: "inherit" },
);
process.exit(result.status ?? 1);
