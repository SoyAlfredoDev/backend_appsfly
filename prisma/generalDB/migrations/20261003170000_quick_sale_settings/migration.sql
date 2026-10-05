-- Ajustes de la caja rápida por negocio.
-- Reversible: DROP COLUMN "businessQuickSalePaymentMethod", DROP COLUMN "businessQuickSaleDocumentType".

ALTER TABLE "Business"
ADD COLUMN IF NOT EXISTS "businessQuickSalePaymentMethod" TEXT NOT NULL DEFAULT '0';

ALTER TABLE "Business"
ADD COLUMN IF NOT EXISTS "businessQuickSaleDocumentType" TEXT NOT NULL DEFAULT 'RECEIPT';
