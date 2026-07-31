-- Catálogo óptico: categorías de sistema + atributos dinámicos (EAV)

ALTER TABLE "Category" ADD COLUMN IF NOT EXISTS "categoryCode" TEXT;
ALTER TABLE "Category" ADD COLUMN IF NOT EXISTS "isSystem" BOOLEAN NOT NULL DEFAULT false;

CREATE UNIQUE INDEX IF NOT EXISTS "Category_categoryCode_key" ON "Category"("categoryCode");

CREATE TABLE IF NOT EXISTS "CategoryAttribute" (
    "categoryAttributeId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "attributeKey" TEXT NOT NULL,
    "attributeLabel" TEXT NOT NULL,
    "dataType" TEXT NOT NULL DEFAULT 'TEXT',
    "optionsJson" TEXT,
    "isSystem" BOOLEAN NOT NULL DEFAULT false,
    "isRequired" BOOLEAN NOT NULL DEFAULT false,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INT NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CategoryAttribute_pkey" PRIMARY KEY ("categoryAttributeId")
);

CREATE UNIQUE INDEX IF NOT EXISTS "CategoryAttribute_categoryId_attributeKey_key"
    ON "CategoryAttribute"("categoryId", "attributeKey");

CREATE INDEX IF NOT EXISTS "CategoryAttribute_categoryId_sortOrder_idx"
    ON "CategoryAttribute"("categoryId", "sortOrder");

DO $$ BEGIN
    ALTER TABLE "CategoryAttribute"
        ADD CONSTRAINT "CategoryAttribute_categoryId_fkey"
        FOREIGN KEY ("categoryId") REFERENCES "Category"("categoryId")
        ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS "ProductAttributeValue" (
    "productAttributeValueId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "categoryAttributeId" TEXT NOT NULL,
    "value" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductAttributeValue_pkey" PRIMARY KEY ("productAttributeValueId")
);

CREATE UNIQUE INDEX IF NOT EXISTS "ProductAttributeValue_productId_categoryAttributeId_key"
    ON "ProductAttributeValue"("productId", "categoryAttributeId");

CREATE INDEX IF NOT EXISTS "ProductAttributeValue_categoryAttributeId_idx"
    ON "ProductAttributeValue"("categoryAttributeId");

DO $$ BEGIN
    ALTER TABLE "ProductAttributeValue"
        ADD CONSTRAINT "ProductAttributeValue_productId_fkey"
        FOREIGN KEY ("productId") REFERENCES "Product"("productId")
        ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    ALTER TABLE "ProductAttributeValue"
        ADD CONSTRAINT "ProductAttributeValue_categoryAttributeId_fkey"
        FOREIGN KEY ("categoryAttributeId") REFERENCES "CategoryAttribute"("categoryAttributeId")
        ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
