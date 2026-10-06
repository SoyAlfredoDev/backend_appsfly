import { readFileSync } from "node:fs";
import pg from "pg";

function loadEnv(path) {
  const env = {};
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    if (!line || line.trim().startsWith("#")) continue;
    const i = line.indexOf("=");
    if (i < 0) continue;
    let value = line.slice(i + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    env[line.slice(0, i).trim()] = value;
  }
  return env;
}

function safeError(error) {
  return String(error?.message || error)
    .replace(/postgres(?:ql)?:\/\/\S+/gi, "[redacted-url]")
    .slice(0, 240);
}

const AUDIT_SQL = `
SELECT
  (SELECT COUNT(*)::int FROM "Product") AS products,
  (SELECT COUNT(*)::int FROM "Service") AS services,
  (SELECT COUNT(*)::int FROM "Category") AS categories,
  (SELECT COUNT(*)::int FROM "CategoryAttribute") AS attribute_defs,
  (SELECT COUNT(*)::int FROM "ProductAttributeValue") AS attribute_values,
  (SELECT COUNT(DISTINCT "productId")::int FROM "ProductAttributeValue") AS products_with_attributes,
  (SELECT COUNT(*)::int FROM "ProductStock") AS stock_rows,
  (SELECT COUNT(*)::int FROM "Product" p LEFT JOIN "ProductStock" s ON s."productId" = p."productId" WHERE s."productId" IS NULL) AS products_without_stock
`;

const MISMATCH_SQL = `
SELECT COUNT(*)::int AS category_mismatch
FROM "ProductAttributeValue" v
JOIN "Product" p ON p."productId" = v."productId"
JOIN "CategoryAttribute" a ON a."categoryAttributeId" = v."categoryAttributeId"
WHERE p."categoryId" <> a."categoryId"
`;

const ORPHAN_SQL = `
SELECT
  (SELECT COUNT(*)::int FROM "ProductAttributeValue" v
    LEFT JOIN "CategoryAttribute" a ON a."categoryAttributeId" = v."categoryAttributeId"
    WHERE a."categoryAttributeId" IS NULL) AS orphan_values,
  (SELECT COUNT(*)::int FROM "ProductAttributeValue" v
    LEFT JOIN "Product" p ON p."productId" = v."productId"
    WHERE p."productId" IS NULL) AS values_without_product
`;

const SAMPLE_SQL = `
SELECT c."categoryName" AS category,
       a."attributeKey" AS key,
       a."dataType" AS type,
       a."isRequired" AS required,
       COUNT(v."productAttributeValueId")::int AS values
FROM "CategoryAttribute" a
JOIN "Category" c ON c."categoryId" = a."categoryId"
LEFT JOIN "ProductAttributeValue" v ON v."categoryAttributeId" = a."categoryAttributeId"
GROUP BY c."categoryName", a."attributeKey", a."dataType", a."isRequired", a."sortOrder"
ORDER BY c."categoryName", a."sortOrder"
LIMIT 40
`;

const REQUIRED_GAP_SQL = `
SELECT COUNT(*)::int AS products_missing_required
FROM "Product" p
JOIN "CategoryAttribute" a ON a."categoryId" = p."categoryId" AND a."isRequired" = true AND a."isVisible" = true
LEFT JOIN "ProductAttributeValue" v
  ON v."productId" = p."productId" AND v."categoryAttributeId" = a."categoryAttributeId"
  AND v."value" IS NOT NULL AND v."value" <> ''
WHERE v."productAttributeValueId" IS NULL
`;

async function auditDatabase(label, connectionString) {
  const client = new pg.Client({ connectionString, connectionTimeoutMillis: 15000 });
  try {
    await client.connect();
    const counts = (await client.query(AUDIT_SQL)).rows[0];
    const mismatch = (await client.query(MISMATCH_SQL)).rows[0];
    const orphans = (await client.query(ORPHAN_SQL)).rows[0];
    const requiredGap = (await client.query(REQUIRED_GAP_SQL)).rows[0];
    const sample = (await client.query(SAMPLE_SQL)).rows;
    const products = label === "Óptica y cristal Limitada"
      ? (await client.query(PRODUCTS_SQL)).rows
      : undefined;
    const categories = label === "Óptica y cristal Limitada"
      ? (await client.query(CATEGORIES_SQL)).rows
      : undefined;
    return { label, ok: true, counts, mismatch, orphans, requiredGap, products, categories };
  } catch (error) {
    return { label, ok: false, error: safeError(error) };
  } finally {
    await client.end().catch(() => {});
  }
}

const CATEGORIES_SQL = `
SELECT c."categoryName" AS category,
       c."categoryCode" AS code,
       c."isSystem" AS system,
       COUNT(a."categoryAttributeId")::int AS defs,
       MIN(a."createdAt") AS attrs_since
FROM "Category" c
LEFT JOIN "CategoryAttribute" a ON a."categoryId" = c."categoryId"
GROUP BY c."categoryName", c."categoryCode", c."isSystem"
ORDER BY c."categoryName"
`;

const PRODUCTS_SQL = `
SELECT p."productName" AS name,
       p."productSKU" AS sku,
       c."categoryName" AS category,
       p."productStatus" AS status,
       p."createdAt" AS created_at,
       (SELECT COUNT(*)::int FROM "ProductAttributeValue" v WHERE v."productId" = p."productId") AS attribute_values
FROM "Product" p
JOIN "Category" c ON c."categoryId" = p."categoryId"
ORDER BY p."createdAt"
`;

const env = loadEnv(new URL("./.env.production", import.meta.url));
const general = new pg.Client({
  connectionString: env.DATABASE_GENERAL_URL,
  connectionTimeoutMillis: 15000,
});

await general.connect();
const businesses = (
  await general.query(`
    SELECT "businessId", "businessName", "businessDatabaseMode" AS mode,
           "businessDatabaseStatus" AS db_status, "businessStatus" AS status,
           "businessConnectionDB" AS url
    FROM "Business"
    ORDER BY "businessName"
  `)
).rows;
await general.end();

const summary = businesses.map((b) => ({
  businessId: b.businessId,
  businessName: b.businessName,
  mode: b.mode,
  db_status: b.db_status,
  status: b.status,
  hasConnection: Boolean(b.url),
}));

const audits = [];
for (const business of businesses) {
  if (business.mode === "DEDICATED" && business.url) {
    audits.push(
      await auditDatabase(business.businessName, business.url),
    );
  }
}

if (env.DATABASE_SHARED_URL) {
  audits.push(await auditDatabase("SHARED", env.DATABASE_SHARED_URL));
}

console.log(JSON.stringify({ businesses: summary, audits }, null, 2));
