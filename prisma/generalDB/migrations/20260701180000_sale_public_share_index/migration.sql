-- CreateTable
CREATE TABLE "SalePublicShareIndex" (
    "shareId" TEXT NOT NULL,
    "shareToken" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "saleId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3),
    "lastAccessAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SalePublicShareIndex_pkey" PRIMARY KEY ("shareId")
);

-- CreateIndex
CREATE UNIQUE INDEX "SalePublicShareIndex_shareToken_key" ON "SalePublicShareIndex"("shareToken");

-- CreateIndex
CREATE UNIQUE INDEX "SalePublicShareIndex_businessId_saleId_key" ON "SalePublicShareIndex"("businessId", "saleId");

-- CreateIndex
CREATE INDEX "SalePublicShareIndex_shareToken_idx" ON "SalePublicShareIndex"("shareToken");
