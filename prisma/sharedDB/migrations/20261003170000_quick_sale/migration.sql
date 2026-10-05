-- Caja rápida en el plano compartido. Un consumidor final por tenant.
-- Reversible: DROP INDEX, DROP COLUMN "isWalkIn", DROP COLUMN "saleChannel", DROP TYPE "SaleChannel".

ALTER TABLE "Customer" ADD COLUMN "isWalkIn" BOOLEAN NOT NULL DEFAULT false;

CREATE UNIQUE INDEX "Customer_businessId_one_walk_in_key"
ON "Customer" ("businessId")
WHERE "isWalkIn" = true;

CREATE TYPE "SaleChannel" AS ENUM ('STANDARD', 'QUICK');

ALTER TABLE "Sale"
ADD COLUMN "saleChannel" "SaleChannel" NOT NULL DEFAULT 'STANDARD';
