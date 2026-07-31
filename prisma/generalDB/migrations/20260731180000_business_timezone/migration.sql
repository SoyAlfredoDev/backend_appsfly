-- Zona horaria IANA del negocio (día operativo). Default Chile.
ALTER TABLE "Business" ADD COLUMN IF NOT EXISTS "businessTimezone" TEXT NOT NULL DEFAULT 'America/Santiago';
