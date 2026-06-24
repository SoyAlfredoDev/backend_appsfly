-- CreateEnum
CREATE TYPE "public"."DocumentType" AS ENUM ('RECEIPT', 'BOLETA', 'FACTURA');

-- CreateEnum
CREATE TYPE "public"."TaxDocumentStatus" AS ENUM ('PENDING', 'SENT', 'ACCEPTED', 'REJECTED', 'ERROR');

-- CreateEnum
CREATE TYPE "public"."TaxProviderType" AS ENUM ('SIMPLE_API', 'INTERNAL');

-- AlterTable
ALTER TABLE "public"."Sale" ADD COLUMN "documentType" "public"."DocumentType" NOT NULL DEFAULT 'RECEIPT';

-- CreateTable
CREATE TABLE "public"."TaxDocument" (
    "taxDocumentId" TEXT NOT NULL,
    "saleId" TEXT NOT NULL,
    "documentType" "public"."DocumentType" NOT NULL,
    "provider" "public"."TaxProviderType" NOT NULL DEFAULT 'SIMPLE_API',
    "folio" INTEGER,
    "trackId" TEXT,
    "status" "public"."TaxDocumentStatus" NOT NULL DEFAULT 'PENDING',
    "siiStatus" TEXT,
    "pdfUrl" TEXT,
    "xmlUrl" TEXT,
    "providerResponse" JSONB,
    "netAmount" INTEGER,
    "taxAmount" INTEGER,
    "totalAmount" INTEGER,
    "receiverRut" TEXT,
    "receiverName" TEXT,
    "receiverEmail" TEXT,
    "retryCount" INTEGER NOT NULL DEFAULT 0,
    "lastError" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TaxDocument_pkey" PRIMARY KEY ("taxDocumentId")
);

-- CreateTable
CREATE TABLE "public"."TaxDocumentAuditLog" (
    "auditLogId" TEXT NOT NULL,
    "taxDocumentId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "previousStatus" "public"."TaxDocumentStatus",
    "newStatus" "public"."TaxDocumentStatus",
    "payload" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TaxDocumentAuditLog_pkey" PRIMARY KEY ("auditLogId")
);

-- CreateIndex
CREATE INDEX "TaxDocument_saleId_idx" ON "public"."TaxDocument"("saleId");

-- CreateIndex
CREATE INDEX "TaxDocument_documentType_idx" ON "public"."TaxDocument"("documentType");

-- CreateIndex
CREATE INDEX "TaxDocument_status_idx" ON "public"."TaxDocument"("status");

-- CreateIndex
CREATE INDEX "TaxDocument_folio_idx" ON "public"."TaxDocument"("folio");

-- CreateIndex
CREATE INDEX "TaxDocument_trackId_idx" ON "public"."TaxDocument"("trackId");

-- CreateIndex
CREATE INDEX "TaxDocument_receiverRut_idx" ON "public"."TaxDocument"("receiverRut");

-- CreateIndex
CREATE INDEX "TaxDocument_createdAt_idx" ON "public"."TaxDocument"("createdAt" DESC);

-- CreateIndex
CREATE INDEX "TaxDocumentAuditLog_taxDocumentId_idx" ON "public"."TaxDocumentAuditLog"("taxDocumentId");

-- CreateIndex
CREATE INDEX "TaxDocumentAuditLog_createdAt_idx" ON "public"."TaxDocumentAuditLog"("createdAt" DESC);

-- AddForeignKey
ALTER TABLE "public"."TaxDocument" ADD CONSTRAINT "TaxDocument_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "public"."Sale"("saleId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TaxDocumentAuditLog" ADD CONSTRAINT "TaxDocumentAuditLog_taxDocumentId_fkey" FOREIGN KEY ("taxDocumentId") REFERENCES "public"."TaxDocument"("taxDocumentId") ON DELETE CASCADE ON UPDATE CASCADE;
