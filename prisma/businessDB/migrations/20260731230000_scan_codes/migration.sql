-- Códigos escaneables polimórficos (barcode / QR / SKU alias)

CREATE TABLE IF NOT EXISTS "ScanCode" (
    "scanCodeId" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "codeType" TEXT NOT NULL,
    "codeValue" TEXT NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "createdByUserId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ScanCode_pkey" PRIMARY KEY ("scanCodeId")
);

CREATE UNIQUE INDEX IF NOT EXISTS "ScanCode_codeValue_key" ON "ScanCode"("codeValue");
CREATE INDEX IF NOT EXISTS "ScanCode_entityType_entityId_idx" ON "ScanCode"("entityType", "entityId");
CREATE INDEX IF NOT EXISTS "ScanCode_codeType_idx" ON "ScanCode"("codeType");

-- Backfill: cada productSKU existente como SKU_ALIAS escaneable
INSERT INTO "ScanCode" (
    "scanCodeId",
    "entityType",
    "entityId",
    "codeType",
    "codeValue",
    "isPrimary",
    "createdByUserId",
    "createdAt",
    "updatedAt"
)
SELECT
    gen_random_uuid()::text,
    'PRODUCT',
    p."productId",
    'SKU_ALIAS',
    p."productSKU",
    true,
    p."createdByUserId",
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
FROM "Product" p
WHERE p."productSKU" IS NOT NULL
  AND btrim(p."productSKU") <> ''
  AND NOT EXISTS (
      SELECT 1 FROM "ScanCode" sc WHERE sc."codeValue" = p."productSKU"
  );
