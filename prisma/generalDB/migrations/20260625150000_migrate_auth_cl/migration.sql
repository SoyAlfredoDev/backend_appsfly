-- Migrar de SimpleAPI a Auth.cl

-- Renombrar enum value si existe instalación previa
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_enum e
        JOIN pg_type t ON e.enumtypid = t.oid
        WHERE t.typname = 'TaxProviderType' AND e.enumlabel = 'SIMPLE_API'
    ) THEN
        ALTER TYPE "public"."TaxProviderType" RENAME VALUE 'SIMPLE_API' TO 'AUTH_CL';
    ELSIF NOT EXISTS (
        SELECT 1 FROM pg_enum e
        JOIN pg_type t ON e.enumtypid = t.oid
        WHERE t.typname = 'TaxProviderType' AND e.enumlabel = 'AUTH_CL'
    ) THEN
        ALTER TYPE "public"."TaxProviderType" ADD VALUE IF NOT EXISTS 'AUTH_CL';
    END IF;
END $$;

CREATE TYPE "public"."CertificateStatus" AS ENUM ('PENDING', 'ACTIVE', 'EXPIRED', 'REVOKED');

ALTER TABLE "public"."BusinessTaxConfig" RENAME TO "TaxProviderAccount";

ALTER TABLE "public"."TaxProviderAccount" RENAME COLUMN "businessId" TO "companyId";

ALTER TABLE "public"."TaxProviderAccount" RENAME COLUMN "simpleApiKey" TO "authApiKey";

ALTER TABLE "public"."TaxProviderAccount" ADD COLUMN IF NOT EXISTS "authApiSecret" TEXT;

ALTER TABLE "public"."TaxProviderAccount" ADD COLUMN IF NOT EXISTS "certificateStatus" "public"."CertificateStatus" NOT NULL DEFAULT 'PENDING';

ALTER TABLE "public"."TaxProviderAccount" ALTER COLUMN "environment" SET DEFAULT 'sandbox';

ALTER TABLE "public"."TaxProviderAccount" ALTER COLUMN "provider" SET DEFAULT 'AUTH_CL';

ALTER TABLE "public"."TaxProviderAccount" DROP CONSTRAINT IF EXISTS "BusinessTaxConfig_pkey";
ALTER TABLE "public"."TaxProviderAccount" ADD CONSTRAINT "TaxProviderAccount_pkey" PRIMARY KEY ("companyId");

ALTER TABLE "public"."TaxProviderAccount" DROP CONSTRAINT IF EXISTS "BusinessTaxConfig_businessId_fkey";
ALTER TABLE "public"."TaxProviderAccount" ADD CONSTRAINT "TaxProviderAccount_companyId_fkey"
    FOREIGN KEY ("companyId") REFERENCES "public"."Business"("businessId") ON DELETE CASCADE ON UPDATE CASCADE;
