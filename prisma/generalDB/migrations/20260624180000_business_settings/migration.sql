-- Configuración por negocio: venta a crédito y datos del comprobante
ALTER TABLE "Business"
ADD COLUMN IF NOT EXISTS "businessAllowCreditSales" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN IF NOT EXISTS "businessReceiptLogoUrl" TEXT,
ADD COLUMN IF NOT EXISTS "businessReceiptAddress" TEXT,
ADD COLUMN IF NOT EXISTS "businessReceiptPhone" TEXT,
ADD COLUMN IF NOT EXISTS "businessReceiptEmail" TEXT,
ADD COLUMN IF NOT EXISTS "businessReceiptSocial" TEXT,
ADD COLUMN IF NOT EXISTS "businessReceiptFooterNote" TEXT;
