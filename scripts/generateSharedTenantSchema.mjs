import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const backendDir = path.resolve(currentDir, "..");
const sourcePath = path.join(backendDir, "prisma", "businessDB", "schema.prisma");
const targetPath = path.join(backendDir, "prisma", "sharedDB", "schema.prisma");

const source = await readFile(sourcePath, "utf8");
const lines = source.split(/\r?\n/u);
const output = [];

let currentModel = null;
let modelLines = [];

function addTenantToList(line, directive) {
  return line.replace(
    new RegExp(`(${directive}\\(\\[)([^\\]]+)(\\])`, "u"),
    (_, start, fields, end) => {
      const trimmed = fields.trim();
      return trimmed.startsWith("businessId")
        ? `${start}${fields}${end}`
        : `${start}businessId, ${trimmed}${end}`;
    },
  );
}

function transformModel(name, body) {
  const usesCompositePrimaryKey = name === "User" || name === "AppointmentSettings";
  let idField = null;
  const scalarUniqueFields = [];
  let hasBusinessIndex = false;

  const transformed = body.map((line) => {
    const fieldMatch = line.match(/^\s{4}([A-Za-z][A-Za-z0-9_]*)\s+[^/].*$/u);

    if (fieldMatch && line.includes("@id")) {
      idField = fieldMatch[1];
      if (usesCompositePrimaryKey) line = line.replace(/\s+@id\b/u, "");
    }

    if (fieldMatch && line.includes("@unique")) {
      scalarUniqueFields.push(fieldMatch[1]);
      line = line.replace(/\s+@unique\b/u, "");
    }

    if (
      name !== "User" &&
      line.includes("@relation") &&
      line.includes("fields:") &&
      line.includes("references:")
    ) {
      line = line
        .replace(/fields:\s*\[([^\]]+)\]/u, (_, fields) => {
          const value = fields.trim();
          return value.startsWith("businessId")
            ? `fields: [${value}]`
            : `fields: [businessId, ${value}]`;
        })
        .replace(/references:\s*\[([^\]]+)\]/u, (_, fields) => {
          const value = fields.trim();
          return value.startsWith("businessId")
            ? `references: [${value}]`
            : `references: [businessId, ${value}]`;
        });
    }

    if (line.trimStart().startsWith("@@unique([")) {
      line = addTenantToList(line, "@@unique");
    }

    if (line.trimStart().startsWith("@@index([")) {
      line = addTenantToList(line, "@@index");
      hasBusinessIndex = line.includes("@@index([businessId");
    }

    return line;
  });

  if (!idField) {
    throw new Error(`Model ${name} has no @id field`);
  }

  const firstContent = transformed.findIndex((line) => line.trim() !== "");
  transformed.splice(
    firstContent < 0 ? 0 : firstContent,
    0,
    "    businessId String @default(dbgenerated(\"current_setting('app.current_business_id', true)\"))",
  );

  while (transformed.length && transformed.at(-1).trim() === "") transformed.pop();
  transformed.push("");
  if (usesCompositePrimaryKey) {
    transformed.push(`    @@id([businessId, ${idField}])`);
  } else {
    transformed.push(`    @@unique([businessId, ${idField}])`);
  }
  for (const field of scalarUniqueFields) {
    transformed.push(`    @@unique([businessId, ${field}])`);
  }
  if (!hasBusinessIndex) transformed.push("    @@index([businessId])");

  return [`model ${name} {`, ...transformed, "}"];
}

for (const line of lines) {
  const modelStart = line.match(/^model\s+([A-Za-z][A-Za-z0-9_]*)\s*\{/u);
  if (modelStart) {
    currentModel = modelStart[1];
    modelLines = [];
    continue;
  }

  if (currentModel && line === "}") {
    output.push(...transformModel(currentModel, modelLines));
    currentModel = null;
    modelLines = [];
    continue;
  }

  if (currentModel) {
    modelLines.push(line);
    continue;
  }

  output.push(line);
}

if (currentModel) throw new Error(`Unclosed model ${currentModel}`);

let generated = `${output.join("\n").trim()}\n`;
generated = generated
  .replace(
    'output        = "../../src/generated/business"',
    'output        = "../../src/generated/shared"',
  )
  .replace(
    'url      = env("DATABASE_URL")',
    'url       = env("DATABASE_SHARED_URL")\n  directUrl = env("DATABASE_SHARED_MIGRATION_URL")',
  );

await mkdir(path.dirname(targetPath), { recursive: true });
await writeFile(
  targetPath,
  `// GENERATED from prisma/businessDB/schema.prisma. Run npm run shared:schema after tenant schema changes.\n${generated}`,
  "utf8",
);

console.log(`Generated shared tenant schema at ${targetPath}`);
