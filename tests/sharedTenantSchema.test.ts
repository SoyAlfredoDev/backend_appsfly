import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";

const backendDir = path.resolve(import.meta.dirname, "..");
const schemaPath = path.join(backendDir, "prisma", "sharedDB", "schema.prisma");
const migrationsDir = path.join(backendDir, "prisma", "sharedDB", "migrations");

async function readSharedMigrations() {
  const entries = await readdir(migrationsDir, { withFileTypes: true });
  const sqlPaths = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(migrationsDir, entry.name, "migration.sql"))
    .sort();
  const contents = await Promise.all(sqlPaths.map((sqlPath) => readFile(sqlPath, "utf8")));
  return contents.join("\n");
}

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
    const migration = await readSharedMigrations();
    const modelNames = [...schema.matchAll(/^model\s+(\w+)\s*\{/gmu)].map((match) => match[1]);

    for (const modelName of modelNames) {
      expect(migration).toContain(`ALTER TABLE "${modelName}" ENABLE ROW LEVEL SECURITY;`);
      expect(migration).toContain(`ALTER TABLE "${modelName}" FORCE ROW LEVEL SECURITY;`);
      expect(migration).toContain(`CREATE POLICY "tenant_isolation_${modelName}"`);
    }
  });

  it("keeps quick sale on the shared sale and a hidden walk-in customer", async () => {
    const schema = await readFile(schemaPath, "utf8");
    const migration = await readSharedMigrations();

    expect(schema).toContain("enum SaleChannel");
    expect(schema).toMatch(/saleChannel\s+SaleChannel\s+@default\(STANDARD\)/);
    expect(schema).toMatch(/isWalkIn\s+Boolean\s+@default\(false\)/);
    expect(migration).toContain('ADD COLUMN IF NOT EXISTS "isWalkIn"');
    expect(migration).toContain('ADD COLUMN IF NOT EXISTS "saleChannel"');
    expect(migration).toContain("Customer_businessId_one_walk_in_key");
  });

  it("requires every expense to reference an expense category", async () => {
    const schema = await readFile(schemaPath, "utf8");
    const expense = schema.match(/^model Expense \{[\s\S]*?^\}/mu)?.[0] ?? "";

    expect(schema).toContain("model ExpenseCategory");
    expect(expense).toMatch(/expenseCategoryId\s+String\s*$/m);
    expect(expense).toContain("ExpenseCategory");
  });

  it("uses composite tenant keys for user identity and appointment settings", async () => {
    const schema = await readFile(schemaPath, "utf8");
    expect(schema).toContain("@@id([businessId, userId])");
    expect(schema).toContain("@@id([businessId, settingsId])");
  });
});
