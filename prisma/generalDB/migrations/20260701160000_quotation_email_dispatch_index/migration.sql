-- CreateTable
CREATE TABLE "QuotationEmailDispatchIndex" (
    "dispatchId" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "quotationId" TEXT NOT NULL,
    "providerMessageId" TEXT NOT NULL,
    "recipientEmail" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuotationEmailDispatchIndex_pkey" PRIMARY KEY ("dispatchId")
);

-- CreateIndex
CREATE UNIQUE INDEX "QuotationEmailDispatchIndex_providerMessageId_key" ON "QuotationEmailDispatchIndex"("providerMessageId");

-- CreateIndex
CREATE INDEX "QuotationEmailDispatchIndex_businessId_quotationId_idx" ON "QuotationEmailDispatchIndex"("businessId", "quotationId");
