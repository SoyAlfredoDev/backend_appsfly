-- CreateEnum
CREATE TYPE "PurchaseCertificateStatus" AS ENUM ('DRAFT', 'ISSUED', 'VOID');

-- CreateTable
CREATE TABLE "PurchaseCertificate" (
    "purchaseCertificateId" TEXT NOT NULL,
    "saleId" TEXT NOT NULL,
    "certificateNumber" TEXT,
    "certificateStatus" "PurchaseCertificateStatus" NOT NULL DEFAULT 'DRAFT',
    "certificateIssuedDate" TIMESTAMP(3),
    "certificateComment" TEXT,
    "certificateResponsibleName" TEXT,
    "customerNameSnapshot" TEXT,
    "customerDocumentSnapshot" TEXT,
    "businessNameSnapshot" TEXT,
    "businessDocumentSnapshot" TEXT,
    "businessAddressSnapshot" TEXT,
    "businessLogoSnapshot" TEXT,
    "certificateTotal" INTEGER NOT NULL DEFAULT 0,
    "issuedAt" TIMESTAMP(3),
    "issuedByUserId" TEXT,
    "createdByUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PurchaseCertificate_pkey" PRIMARY KEY ("purchaseCertificateId")
);

-- CreateTable
CREATE TABLE "PurchaseCertificateDetail" (
    "purchaseCertificateDetailId" TEXT NOT NULL,
    "purchaseCertificateId" TEXT NOT NULL,
    "sourceSaleDetailId" TEXT,
    "lineType" TEXT,
    "lineSku" TEXT,
    "lineDescription" TEXT NOT NULL,
    "lineQuantity" INTEGER NOT NULL DEFAULT 1,
    "lineUnitPrice" INTEGER NOT NULL DEFAULT 0,
    "lineTotal" INTEGER NOT NULL DEFAULT 0,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "lineIncluded" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PurchaseCertificateDetail_pkey" PRIMARY KEY ("purchaseCertificateDetailId")
);

-- CreateIndex
CREATE INDEX "PurchaseCertificate_saleId_createdAt_idx" ON "PurchaseCertificate"("saleId", "createdAt" DESC);
CREATE INDEX "PurchaseCertificate_certificateStatus_createdAt_idx" ON "PurchaseCertificate"("certificateStatus", "createdAt" DESC);
CREATE INDEX "PurchaseCertificateDetail_purchaseCertificateId_sortOrder_idx" ON "PurchaseCertificateDetail"("purchaseCertificateId", "sortOrder");

-- AddForeignKey
ALTER TABLE "PurchaseCertificate" ADD CONSTRAINT "PurchaseCertificate_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sale"("saleId") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "PurchaseCertificate" ADD CONSTRAINT "PurchaseCertificate_issuedByUserId_fkey" FOREIGN KEY ("issuedByUserId") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "PurchaseCertificate" ADD CONSTRAINT "PurchaseCertificate_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "PurchaseCertificateDetail" ADD CONSTRAINT "PurchaseCertificateDetail_purchaseCertificateId_fkey" FOREIGN KEY ("purchaseCertificateId") REFERENCES "PurchaseCertificate"("purchaseCertificateId") ON DELETE CASCADE ON UPDATE CASCADE;
