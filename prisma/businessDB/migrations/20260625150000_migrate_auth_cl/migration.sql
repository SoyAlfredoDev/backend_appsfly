-- businessDB: provider enum SIMPLE_API -> AUTH_CL
-- RENAME VALUE actualiza automáticamente las filas existentes; no usar 'SIMPLE_API' después del rename.

DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_enum e
        JOIN pg_type t ON e.enumtypid = t.oid
        WHERE t.typname = 'TaxProviderType' AND e.enumlabel = 'SIMPLE_API'
    ) THEN
        ALTER TYPE "public"."TaxProviderType" RENAME VALUE 'SIMPLE_API' TO 'AUTH_CL';
    END IF;
END $$;

ALTER TABLE "public"."TaxDocument" ALTER COLUMN "provider" SET DEFAULT 'AUTH_CL';
