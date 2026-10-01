import { readFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";

const backendDir = path.resolve(import.meta.dirname, "..");
const schemaPath = path.join(backendDir, "prisma", "sharedDB", "schema.prisma");
const migrationPath = path.join(
  backendDir,
  "prisma",
  "sharedDB",
  "migrations",
  "20260928233000_init_shared_tenant",
  "migration.sql",
);

describe("shared tenant database schema", () => {
  it("adds businessId to every operational model", async () => {
    const schema = await readFile(schemaPath, "utf8");
    const modelBlocks = [...schema.matchAll(/^model\s+(\w+)\s*\{([\s\S]*?)^\}/gmu)];

    expect(modelBlocks.length).toBeGreaterThan(20);
    for (const modelBlock of modelBlocks) {
      const [, modelName, body] = modelBlock;
      expect(body, `${modelName} must contain businessId`).toMatch(/^\s+businessId\s+String/mu);
    }
  });

  it("enables and forces RLS for every model", async () => {
    const schema = await readFile(schemaPath, "utf8");
    const migration = await readFile(migrationPath, "utf8");
    const modelNames = [...schema.matchAll(/^model\s+(\w+)\s*\{/gmu)].map((match) => match[1]);

    for (const modelName of modelNames) {
      expect(migration).toContain(`ALTER TABLE "${modelName}" ENABLE ROW LEVEL SECURITY;`);
      expect(migration).toContain(`ALTER TABLE "${modelName}" FORCE ROW LEVEL SECURITY;`);
      expect(migration).toContain(`CREATE POLICY "tenant_isolation_${modelName}"`);
    }
  });

  it("uses composite tenant keys for user identity and appointment settings", async () => {
    const schema = await readFile(schemaPath, "utf8");
    expect(schema).toContain("@@id([businessId, userId])");
    expect(schema).toContain("@@id([businessId, settingsId])");
  });
});
