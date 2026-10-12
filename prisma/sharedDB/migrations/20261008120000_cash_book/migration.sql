-- Libro de caja en el plano compartido.
-- Reversible: DROP COLUMN de los campos agregados.

ALTER TABLE "DailySales" ADD COLUMN IF NOT EXISTS "dailySalesExpectedCash" INTEGER;
ALTER TABLE "DailySales" ADD COLUMN IF NOT EXISTS "dailySalesCountedCash" INTEGER;
ALTER TABLE "DailySales" ADD COLUMN IF NOT EXISTS "dailySalesCashDifference" INTEGER;

ALTER TABLE "Purchase" ADD COLUMN IF NOT EXISTS "purchaseSettlement" TEXT NOT NULL DEFAULT 'CASH';
ALTER TABLE "Purchase" ADD COLUMN IF NOT EXISTS "purchasePaidAt" TIMESTAMP(3);
