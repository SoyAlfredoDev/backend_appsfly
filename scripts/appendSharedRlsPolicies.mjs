import { appendFile, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const backendDir = path.resolve(currentDir, "..");
const schemaPath = path.join(backendDir, "prisma", "sharedDB", "schema.prisma");
const migrationPath = process.argv[2];

if (!migrationPath) {
  throw new Error("Usage: node appendSharedRlsPolicies.mjs <migration.sql>");
}

const schema = await readFile(schemaPath, "utf8");
const models = [...schema.matchAll(/^model\s+([A-Za-z][A-Za-z0-9_]*)\s*\{/gmu)].map(
  (match) => match[1],
);

if (!models.length) throw new Error("No models found in shared schema");

const policies = models
  .map(
    (model) => `
ALTER TABLE "${model}" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "${model}" FORCE ROW LEVEL SECURITY;

CREATE POLICY "tenant_isolation_${model}"
ON "${model}"
FOR ALL
USING ("businessId" = current_setting('app.current_business_id', true))
WITH CHECK ("businessId" = current_setting('app.current_business_id', true));
`,
  )
  .join("\n");

await appendFile(
  migrationPath,
  `\n-- Fail-closed tenant isolation. The runtime role must not have BYPASSRLS.\n${policies}`,
  "utf8",
);

console.log(`Appended RLS policies for ${models.length} models`);
