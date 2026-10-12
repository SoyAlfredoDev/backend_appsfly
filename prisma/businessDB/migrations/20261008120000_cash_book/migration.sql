-- Libro de caja: arqueo del cierre y liquidación de compras.
-- Reversible: DROP COLUMN de los campos agregados.

ALTER TABLE "public"."DailySales" ADD COLUMN "dailySalesExpectedCash" INTEGER;
ALTER TABLE "public"."DailySales" ADD COLUMN "dailySalesCountedCash" INTEGER;
ALTER TABLE "public"."DailySales" ADD COLUMN "dailySalesCashDifference" INTEGER;

ALTER TABLE "public"."Purchase" ADD COLUMN "purchaseSettlement" TEXT NOT NULL DEFAULT 'CASH';
ALTER TABLE "public"."Purchase" ADD COLUMN "purchasePaidAt" TIMESTAMP(3);
