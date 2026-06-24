-- CreateEnum
CREATE TYPE "public"."TaxProviderType" AS ENUM ('SIMPLE_API', 'INTERNAL');

-- CreateTable
CREATE TABLE "public"."BusinessTaxConfig" (
    "businessId" TEXT NOT NULL,
    "provider" "public"."TaxProviderType" NOT NULL DEFAULT 'SIMPLE_API',
    "simpleApiKey" TEXT,
    "environment" TEXT NOT NULL DEFAULT 'certification',
    "businessActivity" TEXT,
    "businessAddress" TEXT,
    "businessCommune" TEXT,
    "businessCity" TEXT,
    "certificateRef" TEXT,
    "folioBoletaNext" INTEGER NOT NULL DEFAULT 1,
    "folioFacturaNext" INTEGER NOT NULL DEFAULT 1,
    "isEnabled" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BusinessTaxConfig_pkey" PRIMARY KEY ("businessId")
);

-- AddForeignKey
ALTER TABLE "public"."BusinessTaxConfig" ADD CONSTRAINT "BusinessTaxConfig_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "public"."Business"("businessId") ON DELETE CASCADE ON UPDATE CASCADE;
