-- Caja rápida: cliente de sistema y canal de la venta.
-- Reversible: DROP INDEX, DROP COLUMN "isWalkIn", DROP COLUMN "saleChannel", DROP TYPE "SaleChannel".

ALTER TABLE "public"."Customer" ADD COLUMN "isWalkIn" BOOLEAN NOT NULL DEFAULT false;

CREATE UNIQUE INDEX "Customer_one_walk_in_key"
ON "public"."Customer" ("isWalkIn")
WHERE "isWalkIn" = true;

CREATE TYPE "public"."SaleChannel" AS ENUM ('STANDARD', 'QUICK');

ALTER TABLE "public"."Sale"
ADD COLUMN "saleChannel" "public"."SaleChannel" NOT NULL DEFAULT 'STANDARD';
