-- Cotizaciones: cabecera y detalle

CREATE TYPE "QuotationStatus" AS ENUM ('DRAFT', 'SENT', 'ACCEPTED', 'EXPIRED');

CREATE TABLE "Quotation" (
    "quotationId" TEXT NOT NULL,
    "quotationNumber" TEXT,
    "quotationCustomerId" TEXT NOT NULL,
    "quotationTotal" INTEGER NOT NULL,
    "quotationStatus" "QuotationStatus" NOT NULL DEFAULT 'DRAFT',
    "quotationComment" TEXT,
    "quotationExpiresAt" TIMESTAMP(3),
    "createdByUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Quotation_pkey" PRIMARY KEY ("quotationId")
);

CREATE TABLE "QuotationDetail" (
    "quotationDetailId" TEXT NOT NULL,
    "quotationId" TEXT NOT NULL,
    "quotationDetailProductId" TEXT,
    "quotationDetailServiceId" TEXT,
    "quotationDetailQuantity" INTEGER NOT NULL,
    "quotationDetailPrice" INTEGER NOT NULL,
    "quotationDetailTotal" INTEGER NOT NULL,
    "quotationDetailType" TEXT NOT NULL,
    "createdByUserId" TEXT NOT NULL,
    "quotationCustomerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuotationDetail_pkey" PRIMARY KEY ("quotationDetailId")
);

ALTER TABLE "Quotation" ADD CONSTRAINT "Quotation_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Quotation" ADD CONSTRAINT "Quotation_quotationCustomerId_fkey" FOREIGN KEY ("quotationCustomerId") REFERENCES "Customer"("customerId") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "QuotationDetail" ADD CONSTRAINT "QuotationDetail_quotationCustomerId_fkey" FOREIGN KEY ("quotationCustomerId") REFERENCES "Customer"("customerId") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "QuotationDetail" ADD CONSTRAINT "QuotationDetail_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "QuotationDetail" ADD CONSTRAINT "QuotationDetail_quotationId_fkey" FOREIGN KEY ("quotationId") REFERENCES "Quotation"("quotationId") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "QuotationDetail" ADD CONSTRAINT "QuotationDetail_quotationDetailProductId_fkey" FOREIGN KEY ("quotationDetailProductId") REFERENCES "Product"("productId") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "QuotationDetail" ADD CONSTRAINT "QuotationDetail_quotationDetailServiceId_fkey" FOREIGN KEY ("quotationDetailServiceId") REFERENCES "Service"("serviceId") ON DELETE SET NULL ON UPDATE CASCADE;
