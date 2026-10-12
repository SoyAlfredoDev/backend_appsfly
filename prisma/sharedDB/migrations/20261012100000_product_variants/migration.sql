
-- Tenant-scoped variant metadata and parent-child product links.
ALTER TABLE "public"."Product"
ADD COLUMN "variantParentId" TEXT,
ADD COLUMN "isVariantParent" BOOLEAN NOT NULL DEFAULT false;

CREATE INDEX "Product_businessId_variantParentId_idx"
ON "public"."Product"("businessId", "variantParentId");

ALTER TABLE "public"."Product"
ADD CONSTRAINT "Product_businessId_variantParentId_fkey"
FOREIGN KEY ("businessId", "variantParentId")
REFERENCES "public"."Product"("businessId", "productId")
ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE "public"."ProductVariant" (
    "businessId" TEXT NOT NULL DEFAULT current_setting('app.current_business_id', true),
    "variantId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "parentProductId" TEXT NOT NULL,
    "combinationKey" TEXT NOT NULL,
    "optionsJson" TEXT NOT NULL,
    "priceOverride" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductVariant_pkey" PRIMARY KEY ("variantId"),
    CONSTRAINT "ProductVariant_businessId_productId_fkey" FOREIGN KEY ("businessId", "productId")
        REFERENCES "public"."Product"("businessId", "productId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ProductVariant_businessId_parentProductId_fkey" FOREIGN KEY ("businessId", "parentProductId")
        REFERENCES "public"."Product"("businessId", "productId") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX "ProductVariant_businessId_variantId_key"
ON "public"."ProductVariant"("businessId", "variantId");
CREATE UNIQUE INDEX "ProductVariant_businessId_productId_key"
ON "public"."ProductVariant"("businessId", "productId");
CREATE UNIQUE INDEX "ProductVariant_businessId_parentProductId_combinationKey_key"
ON "public"."ProductVariant"("businessId", "parentProductId", "combinationKey");
CREATE INDEX "ProductVariant_businessId_idx"
ON "public"."ProductVariant"("businessId");

ALTER TABLE "ProductVariant" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ProductVariant" FORCE ROW LEVEL SECURITY;
CREATE POLICY "tenant_isolation_ProductVariant"
ON "ProductVariant"
FOR ALL
USING ("businessId" = current_setting('app.current_business_id', true))
WITH CHECK ("businessId" = current_setting('app.current_business_id', true));

GRANT SELECT, INSERT, UPDATE, DELETE ON "public"."ProductVariant" TO appsfly_runtime;

