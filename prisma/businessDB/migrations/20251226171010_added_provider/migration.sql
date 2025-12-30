-- CreateTable
CREATE TABLE "Provider" (
    "providerId" TEXT NOT NULL,
    "providerName" TEXT,
    "providerTypeDocumment" TEXT,
    "providerDocumentNumber" TEXT,
    "providerAddress" TEXT,
    "providerCodePhoneNumber" TEXT,
    "providerPhoneNumber" TEXT,
    "providerEmail" TEXT,
    "providerComment" TEXT,
    "createdByUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Provider_pkey" PRIMARY KEY ("providerId")
);

-- CreateTable
CREATE TABLE "Purchase" (
    "purchaseId" TEXT NOT NULL,
    "purchaseNumber" TEXT,
    "purchaseRealNumber" TEXT,
    "purchaseProviderId" TEXT NOT NULL,
    "purchaseTotal" INTEGER NOT NULL,
    "purchaseStatus" TEXT,
    "purchaseComment" TEXT,
    "createdByUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("purchaseId")
);

-- CreateTable
CREATE TABLE "PurchaseDetail" (
    "purchaseDetailId" TEXT NOT NULL,
    "purchaseId" TEXT NOT NULL,
    "purchaseDetailProductId" TEXT,
    "purchaseDetailServiceId" TEXT,
    "purchaseDetailQuantity" INTEGER NOT NULL,
    "purchaseDetailPrice" INTEGER NOT NULL,
    "purchaseDetailTotal" INTEGER NOT NULL,
    "purchaseDetailType" TEXT NOT NULL,
    "createdByUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PurchaseDetail_pkey" PRIMARY KEY ("purchaseDetailId")
);

-- AddForeignKey
ALTER TABLE "Provider" ADD CONSTRAINT "Provider_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_purchaseProviderId_fkey" FOREIGN KEY ("purchaseProviderId") REFERENCES "Provider"("providerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseDetail" ADD CONSTRAINT "PurchaseDetail_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "Purchase"("purchaseId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseDetail" ADD CONSTRAINT "PurchaseDetail_purchaseDetailProductId_fkey" FOREIGN KEY ("purchaseDetailProductId") REFERENCES "Product"("productId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseDetail" ADD CONSTRAINT "PurchaseDetail_purchaseDetailServiceId_fkey" FOREIGN KEY ("purchaseDetailServiceId") REFERENCES "Service"("serviceId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseDetail" ADD CONSTRAINT "PurchaseDetail_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
