-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "public"."ProductStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'DELETED');

-- CreateEnum
CREATE TYPE "public"."ProductUnit" AS ENUM ('UNIT', 'KILOGRAM', 'GRAM', 'LITER', 'MILLILITER', 'METER', 'CENTIMETER');

-- CreateEnum
CREATE TYPE "public"."ServiceUnit" AS ENUM ('UNIT', 'MONTH', 'DAY', 'HOUR', 'MINUTE');

-- CreateEnum
CREATE TYPE "public"."UsageContext" AS ENUM ('PRODUCTS', 'SERVICES', 'BOTH');

-- CreateTable
CREATE TABLE "public"."User" (
    "userId" TEXT NOT NULL,
    "userFirstName" TEXT NOT NULL,
    "userLastName" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "userLastConnection" TIMESTAMP(3),
    "userCodePhoneNumber" TEXT NOT NULL,
    "userPhoneNumber" TEXT NOT NULL,
    "userDocumentType" TEXT NOT NULL,
    "userDocumentNumber" TEXT NOT NULL,
    "userRole" "public"."Role" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "public"."Customer" (
    "customerId" TEXT NOT NULL,
    "customerFirstName" TEXT NOT NULL,
    "customerLastName" TEXT NOT NULL,
    "customerEmail" TEXT,
    "customerCodePhoneNumber" TEXT,
    "customerPhoneNumber" TEXT,
    "customerDocumentType" TEXT,
    "customerDocumentNumber" TEXT,
    "customerComment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdByUserId" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("customerId")
);

-- CreateTable
CREATE TABLE "public"."Product" (
    "productId" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "productDescription" TEXT,
    "productSKU" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "productPrice" INTEGER NOT NULL,
    "productPriceFixed" BOOLEAN,
    "productStatus" "public"."ProductStatus" NOT NULL,
    "productUnit" "public"."ProductUnit" NOT NULL,
    "createdByUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("productId")
);

-- CreateTable
CREATE TABLE "public"."Service" (
    "serviceId" TEXT NOT NULL,
    "serviceName" TEXT NOT NULL,
    "serviceDescription" TEXT,
    "serviceSKU" TEXT NOT NULL,
    "servicePrice" INTEGER NOT NULL,
    "servicePriceFixed" BOOLEAN,
    "serviceStatus" "public"."ProductStatus" NOT NULL,
    "serviceUnit" "public"."ServiceUnit" NOT NULL,
    "categoryId" TEXT NOT NULL,
    "createdByUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("serviceId")
);

-- CreateTable
CREATE TABLE "public"."Category" (
    "categoryId" TEXT NOT NULL,
    "categoryName" TEXT NOT NULL,
    "createdByUserId" TEXT NOT NULL,
    "allowedFor" "public"."UsageContext" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("categoryId")
);

-- CreateTable
CREATE TABLE "public"."Sale" (
    "saleId" TEXT NOT NULL,
    "saleCustomerId" TEXT NOT NULL,
    "saleTotal" INTEGER NOT NULL,
    "saleTotalPayments" INTEGER NOT NULL,
    "salePendingAmount" INTEGER NOT NULL,
    "createdByUserId" TEXT NOT NULL,
    "saleComment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("saleId")
);

-- CreateTable
CREATE TABLE "public"."SaleDetail" (
    "saleDetailId" TEXT NOT NULL,
    "saleId" TEXT NOT NULL,
    "saleDetailProductId" TEXT,
    "saleDetailServiceId" TEXT,
    "saleDetailQuantity" INTEGER NOT NULL,
    "saleDetailPrice" INTEGER NOT NULL,
    "saleDetailTotal" INTEGER NOT NULL,
    "saleDetailType" TEXT NOT NULL,
    "createdByUserId" TEXT NOT NULL,
    "saleCustomerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SaleDetail_pkey" PRIMARY KEY ("saleDetailId")
);

-- CreateTable
CREATE TABLE "public"."Payment" (
    "paymentId" TEXT NOT NULL,
    "saleId" TEXT NOT NULL,
    "paymentAmount" INTEGER NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "createdByUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("paymentId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userEmail_key" ON "public"."User"("userEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Product_productSKU_key" ON "public"."Product"("productSKU");

-- CreateIndex
CREATE UNIQUE INDEX "Service_serviceSKU_key" ON "public"."Service"("serviceSKU");

-- AddForeignKey
ALTER TABLE "public"."Customer" ADD CONSTRAINT "Customer_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "public"."User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."Category"("categoryId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Product" ADD CONSTRAINT "Product_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "public"."User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Service" ADD CONSTRAINT "Service_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."Category"("categoryId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Service" ADD CONSTRAINT "Service_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "public"."User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Category" ADD CONSTRAINT "Category_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "public"."User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Sale" ADD CONSTRAINT "Sale_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "public"."User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Sale" ADD CONSTRAINT "Sale_saleCustomerId_fkey" FOREIGN KEY ("saleCustomerId") REFERENCES "public"."Customer"("customerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SaleDetail" ADD CONSTRAINT "SaleDetail_saleCustomerId_fkey" FOREIGN KEY ("saleCustomerId") REFERENCES "public"."Customer"("customerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SaleDetail" ADD CONSTRAINT "SaleDetail_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "public"."User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SaleDetail" ADD CONSTRAINT "SaleDetail_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "public"."Sale"("saleId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SaleDetail" ADD CONSTRAINT "SaleDetail_saleDetailProductId_fkey" FOREIGN KEY ("saleDetailProductId") REFERENCES "public"."Product"("productId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SaleDetail" ADD CONSTRAINT "SaleDetail_saleDetailServiceId_fkey" FOREIGN KEY ("saleDetailServiceId") REFERENCES "public"."Service"("serviceId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Payment" ADD CONSTRAINT "Payment_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "public"."User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Payment" ADD CONSTRAINT "Payment_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "public"."Sale"("saleId") ON DELETE RESTRICT ON UPDATE CASCADE;
