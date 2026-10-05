-- Caja rápida en el plano compartido. Un consumidor final por tenant.
-- Reversible: DROP INDEX, DROP COLUMN "isWalkIn", DROP COLUMN "saleChannel", DROP TYPE "SaleChannel".

ALTER TABLE "Customer"
ADD COLUMN IF NOT EXISTS "isWalkIn" BOOLEAN NOT NULL DEFAULT false;

CREATE UNIQUE INDEX IF NOT EXISTS "Customer_businessId_one_walk_in_key"
ON "Customer" ("businessId")
WHERE "isWalkIn" = true;

DO $$
BEGIN
  CREATE TYPE "SaleChannel" AS ENUM ('STANDARD', 'QUICK');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

ALTER TABLE "Sale"
ADD COLUMN IF NOT EXISTS "saleChannel" "SaleChannel" NOT NULL DEFAULT 'STANDARD';
