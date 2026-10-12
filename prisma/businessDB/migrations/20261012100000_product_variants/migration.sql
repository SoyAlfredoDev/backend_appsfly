
-- Sellable products can be grouped under a parent while retaining an independent
-- product SKU, stock row, and inventory history for every combination.
ALTER TABLE "public"."Product"
ADD COLUMN "variantParentId" TEXT,
ADD COLUMN "isVariantParent" BOOLEAN NOT NULL DEFAULT false;

CREATE INDEX "Product_variantParentId_idx"
ON "public"."Product"("variantParentId");

ALTER TABLE "public"."Product"
ADD CONSTRAINT "Product_variantParentId_fkey"
FOREIGN KEY ("variantParentId") REFERENCES "public"."Product"("productId")
ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE "public"."ProductVariant" (
    "variantId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "parentProductId" TEXT NOT NULL,
    "combinationKey" TEXT NOT NULL,
    "optionsJson" TEXT NOT NULL,
    "priceOverride" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductVariant_pkey" PRIMARY KEY ("variantId"),
    CONSTRAINT "ProductVariant_productId_fkey" FOREIGN KEY ("productId")
        REFERENCES "public"."Product"("productId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ProductVariant_parentProductId_fkey" FOREIGN KEY ("parentProductId")
        REFERENCES "public"."Product"("productId") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX "ProductVariant_productId_key"
ON "public"."ProductVariant"("productId");
CREATE UNIQUE INDEX "ProductVariant_parentProductId_combinationKey_key"
ON "public"."ProductVariant"("parentProductId", "combinationKey");

