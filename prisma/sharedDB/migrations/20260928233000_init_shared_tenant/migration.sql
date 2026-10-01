-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'DELETED');

-- CreateEnum
CREATE TYPE "ProductUnit" AS ENUM ('UNIT', 'KILOGRAM', 'GRAM', 'LITER', 'MILLILITER', 'METER', 'CENTIMETER');

-- CreateEnum
CREATE TYPE "ServiceUnit" AS ENUM ('UNIT', 'MONTH', 'DAY', 'HOUR', 'MINUTE');

-- CreateEnum
CREATE TYPE "UsageContext" AS ENUM ('PRODUCTS', 'SERVICES', 'BOTH');

-- CreateEnum
CREATE TYPE "InventoryMovementType" AS ENUM ('VENTA', 'COMPRA', 'AJUSTE_MANUAL', 'MERMA', 'DEVOLUCION', 'ANULACION_VENTA', 'ANULACION_COMPRA');

-- CreateEnum
CREATE TYPE "InventoryReferenceType" AS ENUM ('SALE', 'SALE_DETAIL', 'PURCHASE', 'PURCHASE_DETAIL', 'MANUAL', 'NONE');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('RECEIPT', 'BOLETA', 'FACTURA');

-- CreateEnum
CREATE TYPE "SaleDeliveryStatus" AS ENUM ('PENDING', 'DELIVERED');

-- CreateEnum
CREATE TYPE "TaxDocumentStatus" AS ENUM ('PENDING', 'SENT', 'ACCEPTED', 'REJECTED', 'ERROR');

-- CreateEnum
CREATE TYPE "TaxProviderType" AS ENUM ('AUTH_CL', 'INTERNAL');

-- CreateEnum
CREATE TYPE "QuotationStatus" AS ENUM ('DRAFT', 'SENT', 'ACCEPTED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "QuotationEmailDeliveryStatus" AS ENUM ('PENDING', 'SENT', 'DELIVERED', 'FAILED', 'BOUNCED');

-- CreateEnum
CREATE TYPE "WorkOrderStatus" AS ENUM ('CREATED', 'PENDING_SHIPMENT', 'SENT_TO_LAB', 'RECEIVED', 'QUALITY_CONTROL', 'READY_FOR_DELIVERY', 'DELIVERED');

-- CreateEnum
CREATE TYPE "LabDispatchStatus" AS ENUM ('SENT', 'PARTIAL_RECEIVED', 'RECEIVED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "PurchaseCertificateStatus" AS ENUM ('DRAFT', 'ISSUED', 'VOID');

-- CreateEnum
CREATE TYPE "AppointmentStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED', 'RESCHEDULED');

-- CreateTable
CREATE TABLE "User" (
    "businessId" TEXT NOT NULL DEFAULT current_setting('app.current_business_id', true),
    "userId" TEXT NOT NULL,
    "userFirstName" TEXT NOT NULL,
    "userLastName" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "userLastConnection" TIMESTAMP(3),
    "userCodePhoneNumber" TEXT,
    "userPhoneNumber" TEXT,
    "userDocumentType" TEXT,
    "userDocumentNumber" TEXT,
    "userRole" "Role" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("businessId","userId")
);

-- CreateTable
CREATE TABLE "Customer" (
    "businessId" TEXT NOT NULL DEFAULT current_setting('app.current_business_id', true),
    "customerId" TEXT NOT NULL,
    "customerFirstName" TEXT NOT NULL,
    "customerLastName" TEXT NOT NULL,
    "customerEmail" TEXT,
    "customerCodePhoneNumber" TEXT,
    "customerPhoneNumber" TEXT,
    "customerDocumentType" TEXT,
    "customerDocumentNumber" TEXT,
    "customerComment" TEXT,
    "customerImageUrl" TEXT,
    "customerBirthDate" TIMESTAMP(3),
    "customerAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdByUserId" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("customerId")
);

-- CreateTable
CREATE TABLE "Product" (
    "businessId" TEXT NOT NULL DEFAULT current_setting('app.current_business_id', true),
    "productId" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "productDescription" TEXT,
    "productSKU" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "productPrice" INTEGER NOT NULL,
    "productPriceFixed" BOOLEAN,
    "productStatus" "ProductStatus" NOT NULL,
    "productUnit" "ProductUnit" NOT NULL,
    "productAllowZeroStock" BOOLEAN NOT NULL DEFAULT false,
    "productRequiresLabWork" BOOLEAN NOT NULL DEFAULT false,
    "createdByUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("productId")
);

-- CreateTable
CREATE TABLE "ScanCode" (
    "businessId" TEXT NOT NULL DEFAULT current_setting('app.current_business_id', true),
    "scanCodeId" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "codeType" TEXT NOT NULL,
    "codeValue" TEXT NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "createdByUserId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ScanCode_pkey" PRIMARY KEY ("scanCodeId")
);

-- CreateTable
CREATE TABLE "ProductStock" (
    "businessId" TEXT NOT NULL DEFAULT current_setting('app.current_business_id', true),
    "productId" TEXT NOT NULL,
    "quantityOnHand" INTEGER NOT NULL DEFAULT 0,
    "reorderPoint" INTEGER NOT NULL DEFAULT 0,
    "averageUnitCost" INTEGER NOT NULL DEFAULT 0,
    "lastMovementAt" TIMESTAMP(3),
    "version" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductStock_pkey" PRIMARY KEY ("productId")
);

-- CreateTable
CREATE TABLE "InventoryMovement" (
    "businessId" TEXT NOT NULL DEFAULT current_setting('app.current_business_id', true),
    "movementId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "movementType" "InventoryMovementType" NOT NULL,
    "quantityDelta" INTEGER NOT NULL,
    "stockBefore" INTEGER NOT NULL,
    "stockAfter" INTEGER NOT NULL,
    "referenceType" "InventoryReferenceType" NOT NULL DEFAULT 'NONE',
    "referenceId" TEXT,
    "referenceLabel" TEXT,
    "reason" TEXT,
    "notes" TEXT,
    "createdByUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InventoryMovement_pkey" PRIMARY KEY ("movementId")
);

-- CreateTable
CREATE TABLE "Service" (
    "businessId" TEXT NOT NULL DEFAULT current_setting('app.current_business_id', true),
    "serviceId" TEXT NOT NULL,
    "serviceName" TEXT NOT NULL,
    "serviceDescription" TEXT,
    "serviceSKU" TEXT NOT NULL,
    "servicePrice" INTEGER NOT NULL,
    "servicePriceFixed" BOOLEAN,
    "serviceStatus" "ProductStatus" NOT NULL,
    "serviceUnit" "ServiceUnit" NOT NULL,
    "categoryId" TEXT NOT NULL,
    "createdByUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("serviceId")
);

-- CreateTable
CREATE TABLE "Category" (
    "businessId" TEXT NOT NULL DEFAULT current_setting('app.current_business_id', true),
    "categoryId" TEXT NOT NULL,
    "categoryName" TEXT NOT NULL,
    "categoryCode" TEXT,
    "isSystem" BOOLEAN NOT NULL DEFAULT false,
    "createdByUserId" TEXT NOT NULL,
    "allowedFor" "UsageContext" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("categoryId")
);

-- CreateTable
CREATE TABLE "CategoryAttribute" (
    "businessId" TEXT NOT NULL DEFAULT current_setting('app.current_business_id', true),
    "categoryAttributeId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "attributeKey" TEXT NOT NULL,
    "attributeLabel" TEXT NOT NULL,
    "dataType" TEXT NOT NULL DEFAULT 'TEXT',
    "optionsJson" TEXT,
    "isSystem" BOOLEAN NOT NULL DEFAULT false,
    "isRequired" BOOLEAN NOT NULL DEFAULT false,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CategoryAttribute_pkey" PRIMARY KEY ("categoryAttributeId")
);

-- CreateTable
CREATE TABLE "ProductAttributeValue" (
    "businessId" TEXT NOT NULL DEFAULT current_setting('app.current_business_id', true),
    "productAttributeValueId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "categoryAttributeId" TEXT NOT NULL,
    "value" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductAttributeValue_pkey" PRIMARY KEY ("productAttributeValueId")
);

-- CreateTable
CREATE TABLE "Sale" (
    "businessId" TEXT NOT NULL DEFAULT current_setting('app.current_business_id', true),
    "saleId" TEXT NOT NULL,
    "saleCustomerId" TEXT NOT NULL,
    "saleTotal" INTEGER NOT NULL,
    "saleTotalPayments" INTEGER NOT NULL,
    "salePendingAmount" INTEGER NOT NULL,
    "createdByUserId" TEXT NOT NULL,
    "saleComment" TEXT,
    "saleImageUrl" TEXT,
    "saleNumber" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "documentType" "DocumentType" NOT NULL DEFAULT 'RECEIPT',
    "saleDeliveryStatus" "SaleDeliveryStatus",
    "saleDeliveredAt" TIMESTAMP(3),
    "saleDeliveredByUserId" TEXT,

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("saleId")
);

-- CreateTable
CREATE TABLE "SaleDetail" (
    "businessId" TEXT NOT NULL DEFAULT current_setting('app.current_business_id', true),
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
CREATE TABLE "Payment" (
    "businessId" TEXT NOT NULL DEFAULT current_setting('app.current_business_id', true),
    "paymentId" TEXT NOT NULL,
    "saleId" TEXT NOT NULL,
    "paymentAmount" INTEGER NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "createdByUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("paymentId")
);

-- CreateTable
CREATE TABLE "CashExpense" (
    "businessId" TEXT NOT NULL DEFAULT current_setting('app.current_business_id', true),
    "cashExpenseId" TEXT NOT NULL,
    "cashExpenseAmount" INTEGER NOT NULL,
    "cashExpenseDescription" TEXT,
    "cashExpenseLinkImage" TEXT,
    "createdByUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CashExpense_pkey" PRIMARY KEY ("cashExpenseId")
);

-- CreateTable
CREATE TABLE "DailySales" (
    "businessId" TEXT NOT NULL DEFAULT current_setting('app.current_business_id', true),
    "dailySalesId" TEXT NOT NULL,
    "dailySalesDay" TEXT NOT NULL,
    "dailySalesTotalSales" INTEGER,
    "dailySalesNumberOfSales" INTEGER,
    "dailySalesTotalIncome" INTEGER,
    "dailySalesDetailIncome" JSONB,
    "createdByUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DailySales_pkey" PRIMARY KEY ("dailySalesId")
);

-- CreateTable
CREATE TABLE "Transactions" (
    "businessId" TEXT NOT NULL DEFAULT current_setting('app.current_business_id', true),
    "transactionId" TEXT NOT NULL,
    "transactionType" TEXT,
    "transactionMethod" TEXT,
    "transactionTable" TEXT,
    "transactionRecordId" TEXT,
    "transactionOldValue" JSONB,
    "transactionNewValue" JSONB,
    "transactionDescription" TEXT,
    "createdByUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transactions_pkey" PRIMARY KEY ("transactionId")
);

-- CreateTable
CREATE TABLE "AsmrCampaign" (
    "businessId" TEXT NOT NULL DEFAULT current_setting('app.current_business_id', true),
    "campaignId" TEXT NOT NULL,
    "campaignName" TEXT NOT NULL,
    "campaignType" TEXT NOT NULL,
    "auditMonth" INTEGER NOT NULL,
    "auditYear" INTEGER NOT NULL,
    "sourceMonth" INTEGER NOT NULL,
    "sourceYear" INTEGER NOT NULL,
    "discountPercent" INTEGER NOT NULL DEFAULT 20,
    "messageSent" TEXT,
    "contactsSuccess" INTEGER NOT NULL DEFAULT 0,
    "universeTotal" INTEGER NOT NULL DEFAULT 0,
    "excludedRepurchase" INTEGER NOT NULL DEFAULT 0,
    "eligibleBeforeDedup" INTEGER NOT NULL DEFAULT 0,
    "eligibleFinal" INTEGER NOT NULL DEFAULT 0,
    "phonesDeduplicated" INTEGER NOT NULL DEFAULT 0,
    "campaignStatus" TEXT NOT NULL DEFAULT 'SENT',
    "createdByUserId" TEXT NOT NULL,
    "executedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AsmrCampaign_pkey" PRIMARY KEY ("campaignId")
);

-- CreateTable
CREATE TABLE "Expense" (
    "businessId" TEXT NOT NULL DEFAULT current_setting('app.current_business_id', true),
    "expenseId" TEXT NOT NULL,
    "expenseDescription" TEXT,
    "expensePaymentMethod" TEXT,
    "expenseImageUrl" TEXT,
    "expenseAmount" INTEGER,
    "createdByUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("expenseId")
);

-- CreateTable
CREATE TABLE "Provider" (
    "businessId" TEXT NOT NULL DEFAULT current_setting('app.current_business_id', true),
    "providerId" TEXT NOT NULL,
    "providerName" TEXT NOT NULL,
    "providerDocumentType" TEXT,
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
    "businessId" TEXT NOT NULL DEFAULT current_setting('app.current_business_id', true),
    "purchaseId" TEXT NOT NULL,
    "purchaseNumber" TEXT,
    "purchaseRealNumber" TEXT,
    "purchaseProviderId" TEXT NOT NULL,
    "purchaseTotal" INTEGER NOT NULL,
    "purchaseStatus" TEXT,
    "purchaseComment" TEXT,
    "createdByUserId" TEXT NOT NULL,
    "cancelledByUserId" TEXT,
    "cancelledAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("purchaseId")
);

-- CreateTable
CREATE TABLE "PurchaseDetail" (
    "businessId" TEXT NOT NULL DEFAULT current_setting('app.current_business_id', true),
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

-- CreateTable
CREATE TABLE "TaxDocument" (
    "businessId" TEXT NOT NULL DEFAULT current_setting('app.current_business_id', true),
    "taxDocumentId" TEXT NOT NULL,
    "saleId" TEXT NOT NULL,
    "documentType" "DocumentType" NOT NULL,
    "provider" "TaxProviderType" NOT NULL DEFAULT 'AUTH_CL',
    "folio" INTEGER,
    "trackId" TEXT,
    "status" "TaxDocumentStatus" NOT NULL DEFAULT 'PENDING',
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
CREATE TABLE "TaxDocumentAuditLog" (
    "businessId" TEXT NOT NULL DEFAULT current_setting('app.current_business_id', true),
    "auditLogId" TEXT NOT NULL,
    "taxDocumentId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "previousStatus" "TaxDocumentStatus",
    "newStatus" "TaxDocumentStatus",
    "payload" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TaxDocumentAuditLog_pkey" PRIMARY KEY ("auditLogId")
);

-- CreateTable
CREATE TABLE "Quotation" (
    "businessId" TEXT NOT NULL DEFAULT current_setting('app.current_business_id', true),
    "quotationId" TEXT NOT NULL,
    "quotationNumber" TEXT,
    "quotationCustomerId" TEXT NOT NULL,
    "quotationTotal" INTEGER NOT NULL,
    "quotationStatus" "QuotationStatus" NOT NULL DEFAULT 'DRAFT',
    "quotationComment" TEXT,
    "quotationExpiresAt" TIMESTAMP(3),
    "prescriptionId" TEXT,
    "quotationEmailDeliveryStatus" "QuotationEmailDeliveryStatus",
    "quotationEmailProviderMessageId" TEXT,
    "quotationEmailSentTo" TEXT,
    "quotationEmailSentAt" TIMESTAMP(3),
    "quotationEmailDeliveredAt" TIMESTAMP(3),
    "quotationEmailOpenedAt" TIMESTAMP(3),
    "quotationEmailErrorMessage" TEXT,
    "createdByUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Quotation_pkey" PRIMARY KEY ("quotationId")
);

-- CreateTable
CREATE TABLE "QuotationDetail" (
    "businessId" TEXT NOT NULL DEFAULT current_setting('app.current_business_id', true),
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

-- CreateTable
CREATE TABLE "Prescription" (
    "businessId" TEXT NOT NULL DEFAULT current_setting('app.current_business_id', true),
    "prescriptionId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "prescriptionDate" TIMESTAMP(3),
    "prescriptionExpiresAt" TIMESTAMP(3),
    "prescribedBy" TEXT,
    "prescriptionType" TEXT,
    "odSphere" TEXT,
    "odCylinder" TEXT,
    "odAxis" TEXT,
    "odAddition" TEXT,
    "odPrism" TEXT,
    "odBase" TEXT,
    "oiSphere" TEXT,
    "oiCylinder" TEXT,
    "oiAxis" TEXT,
    "oiAddition" TEXT,
    "oiPrism" TEXT,
    "oiBase" TEXT,
    "pdBinocular" TEXT,
    "pdOd" TEXT,
    "pdOi" TEXT,
    "pdNear" TEXT,
    "prescriptionNotes" TEXT,
    "prescriptionImageUrl" TEXT,
    "entryMode" TEXT NOT NULL DEFAULT 'MANUAL',
    "createdByUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Prescription_pkey" PRIMARY KEY ("prescriptionId")
);

-- CreateTable
CREATE TABLE "Laboratory" (
    "businessId" TEXT NOT NULL DEFAULT current_setting('app.current_business_id', true),
    "laboratoryId" TEXT NOT NULL,
    "laboratoryName" TEXT NOT NULL,
    "laboratoryDocumentType" TEXT,
    "laboratoryDocumentNumber" TEXT,
    "laboratoryAddress" TEXT,
    "laboratoryCodePhoneNumber" TEXT,
    "laboratoryPhoneNumber" TEXT,
    "laboratoryEmail" TEXT,
    "laboratoryComment" TEXT,
    "laboratoryActive" BOOLEAN NOT NULL DEFAULT true,
    "createdByUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Laboratory_pkey" PRIMARY KEY ("laboratoryId")
);

-- CreateTable
CREATE TABLE "WorkOrder" (
    "businessId" TEXT NOT NULL DEFAULT current_setting('app.current_business_id', true),
    "workOrderId" TEXT NOT NULL,
    "workOrderNumber" TEXT,
    "saleId" TEXT NOT NULL,
    "saleDetailId" TEXT,
    "customerId" TEXT NOT NULL,
    "prescriptionId" TEXT,
    "laboratoryId" TEXT,
    "labDispatchId" TEXT,
    "workOrderStatus" "WorkOrderStatus" NOT NULL DEFAULT 'CREATED',
    "workOrderNotes" TEXT,
    "workOrderLabNotes" TEXT,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "receivedAt" TIMESTAMP(3),
    "readyForDeliveryAt" TIMESTAMP(3),
    "deliveredAt" TIMESTAMP(3),
    "createdByUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkOrder_pkey" PRIMARY KEY ("workOrderId")
);

-- CreateTable
CREATE TABLE "LabDispatch" (
    "businessId" TEXT NOT NULL DEFAULT current_setting('app.current_business_id', true),
    "labDispatchId" TEXT NOT NULL,
    "labDispatchNumber" TEXT,
    "laboratoryId" TEXT NOT NULL,
    "labDispatchStatus" "LabDispatchStatus" NOT NULL DEFAULT 'SENT',
    "sentAt" TIMESTAMP(3),
    "sentByUserId" TEXT,
    "labDispatchNotes" TEXT,
    "createdByUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LabDispatch_pkey" PRIMARY KEY ("labDispatchId")
);

-- CreateTable
CREATE TABLE "PurchaseCertificate" (
    "businessId" TEXT NOT NULL DEFAULT current_setting('app.current_business_id', true),
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
    "businessId" TEXT NOT NULL DEFAULT current_setting('app.current_business_id', true),
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

-- CreateTable
CREATE TABLE "AppointmentSettings" (
    "businessId" TEXT NOT NULL DEFAULT current_setting('app.current_business_id', true),
    "settingsId" TEXT NOT NULL DEFAULT 'default',
    "appointmentsEnabled" BOOLEAN NOT NULL DEFAULT false,
    "slotDurationMinutes" INTEGER NOT NULL DEFAULT 30,
    "maxDaysAhead" INTEGER NOT NULL DEFAULT 30,
    "visitorMessage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AppointmentSettings_pkey" PRIMARY KEY ("settingsId")
);

-- CreateTable
CREATE TABLE "AppointmentWeeklyAvailability" (
    "businessId" TEXT NOT NULL DEFAULT current_setting('app.current_business_id', true),
    "availabilityId" TEXT NOT NULL,
    "settingsId" TEXT NOT NULL DEFAULT 'default',
    "dayOfWeek" INTEGER NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AppointmentWeeklyAvailability_pkey" PRIMARY KEY ("availabilityId")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "businessId" TEXT NOT NULL DEFAULT current_setting('app.current_business_id', true),
    "appointmentId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneCode" TEXT NOT NULL DEFAULT '+56',
    "phoneNumber" TEXT NOT NULL,
    "contactConsent" BOOLEAN NOT NULL,
    "startsAt" TIMESTAMP(3) NOT NULL,
    "endsAt" TIMESTAMP(3) NOT NULL,
    "status" "AppointmentStatus" NOT NULL DEFAULT 'PENDING',
    "notes" TEXT,
    "staffNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("appointmentId")
);

-- CreateIndex
CREATE INDEX "User_businessId_idx" ON "User"("businessId");

-- CreateIndex
CREATE UNIQUE INDEX "User_businessId_userEmail_key" ON "User"("businessId", "userEmail");

-- CreateIndex
CREATE INDEX "Customer_businessId_idx" ON "Customer"("businessId");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_businessId_customerId_key" ON "Customer"("businessId", "customerId");

-- CreateIndex
CREATE INDEX "Product_businessId_idx" ON "Product"("businessId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_businessId_productId_key" ON "Product"("businessId", "productId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_businessId_productSKU_key" ON "Product"("businessId", "productSKU");

-- CreateIndex
CREATE INDEX "ScanCode_businessId_entityType_entityId_idx" ON "ScanCode"("businessId", "entityType", "entityId");

-- CreateIndex
CREATE INDEX "ScanCode_businessId_codeType_idx" ON "ScanCode"("businessId", "codeType");

-- CreateIndex
CREATE UNIQUE INDEX "ScanCode_businessId_scanCodeId_key" ON "ScanCode"("businessId", "scanCodeId");

-- CreateIndex
CREATE UNIQUE INDEX "ScanCode_businessId_codeValue_key" ON "ScanCode"("businessId", "codeValue");

-- CreateIndex
CREATE INDEX "ProductStock_businessId_idx" ON "ProductStock"("businessId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductStock_businessId_productId_key" ON "ProductStock"("businessId", "productId");

-- CreateIndex
CREATE INDEX "InventoryMovement_businessId_productId_createdAt_idx" ON "InventoryMovement"("businessId", "productId", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "InventoryMovement_businessId_movementType_createdAt_idx" ON "InventoryMovement"("businessId", "movementType", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "InventoryMovement_businessId_referenceType_referenceId_idx" ON "InventoryMovement"("businessId", "referenceType", "referenceId");

-- CreateIndex
CREATE INDEX "InventoryMovement_businessId_createdAt_idx" ON "InventoryMovement"("businessId", "createdAt" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "InventoryMovement_businessId_movementId_key" ON "InventoryMovement"("businessId", "movementId");

-- CreateIndex
CREATE INDEX "Service_businessId_idx" ON "Service"("businessId");

-- CreateIndex
CREATE UNIQUE INDEX "Service_businessId_serviceId_key" ON "Service"("businessId", "serviceId");

-- CreateIndex
CREATE UNIQUE INDEX "Service_businessId_serviceSKU_key" ON "Service"("businessId", "serviceSKU");

-- CreateIndex
CREATE INDEX "Category_businessId_idx" ON "Category"("businessId");

-- CreateIndex
CREATE UNIQUE INDEX "Category_businessId_categoryId_key" ON "Category"("businessId", "categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "Category_businessId_categoryCode_key" ON "Category"("businessId", "categoryCode");

-- CreateIndex
CREATE INDEX "CategoryAttribute_businessId_categoryId_sortOrder_idx" ON "CategoryAttribute"("businessId", "categoryId", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "CategoryAttribute_businessId_categoryId_attributeKey_key" ON "CategoryAttribute"("businessId", "categoryId", "attributeKey");

-- CreateIndex
CREATE UNIQUE INDEX "CategoryAttribute_businessId_categoryAttributeId_key" ON "CategoryAttribute"("businessId", "categoryAttributeId");

-- CreateIndex
CREATE INDEX "ProductAttributeValue_businessId_categoryAttributeId_idx" ON "ProductAttributeValue"("businessId", "categoryAttributeId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductAttributeValue_businessId_productId_categoryAttribut_key" ON "ProductAttributeValue"("businessId", "productId", "categoryAttributeId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductAttributeValue_businessId_productAttributeValueId_key" ON "ProductAttributeValue"("businessId", "productAttributeValueId");

-- CreateIndex
CREATE INDEX "Sale_businessId_idx" ON "Sale"("businessId");

-- CreateIndex
CREATE UNIQUE INDEX "Sale_businessId_saleId_key" ON "Sale"("businessId", "saleId");

-- CreateIndex
CREATE INDEX "SaleDetail_businessId_idx" ON "SaleDetail"("businessId");

-- CreateIndex
CREATE UNIQUE INDEX "SaleDetail_businessId_saleDetailId_key" ON "SaleDetail"("businessId", "saleDetailId");

-- CreateIndex
CREATE INDEX "Payment_businessId_idx" ON "Payment"("businessId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_businessId_paymentId_key" ON "Payment"("businessId", "paymentId");

-- CreateIndex
CREATE INDEX "CashExpense_businessId_idx" ON "CashExpense"("businessId");

-- CreateIndex
CREATE UNIQUE INDEX "CashExpense_businessId_cashExpenseId_key" ON "CashExpense"("businessId", "cashExpenseId");

-- CreateIndex
CREATE INDEX "DailySales_businessId_idx" ON "DailySales"("businessId");

-- CreateIndex
CREATE UNIQUE INDEX "DailySales_businessId_dailySalesId_key" ON "DailySales"("businessId", "dailySalesId");

-- CreateIndex
CREATE UNIQUE INDEX "DailySales_businessId_dailySalesDay_key" ON "DailySales"("businessId", "dailySalesDay");

-- CreateIndex
CREATE INDEX "Transactions_businessId_idx" ON "Transactions"("businessId");

-- CreateIndex
CREATE UNIQUE INDEX "Transactions_businessId_transactionId_key" ON "Transactions"("businessId", "transactionId");

-- CreateIndex
CREATE INDEX "AsmrCampaign_businessId_createdAt_idx" ON "AsmrCampaign"("businessId", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "AsmrCampaign_businessId_auditYear_auditMonth_idx" ON "AsmrCampaign"("businessId", "auditYear", "auditMonth");

-- CreateIndex
CREATE UNIQUE INDEX "AsmrCampaign_businessId_campaignId_key" ON "AsmrCampaign"("businessId", "campaignId");

-- CreateIndex
CREATE INDEX "Expense_businessId_idx" ON "Expense"("businessId");

-- CreateIndex
CREATE UNIQUE INDEX "Expense_businessId_expenseId_key" ON "Expense"("businessId", "expenseId");

-- CreateIndex
CREATE INDEX "Provider_businessId_idx" ON "Provider"("businessId");

-- CreateIndex
CREATE UNIQUE INDEX "Provider_businessId_providerId_key" ON "Provider"("businessId", "providerId");

-- CreateIndex
CREATE INDEX "Purchase_businessId_idx" ON "Purchase"("businessId");

-- CreateIndex
CREATE UNIQUE INDEX "Purchase_businessId_purchaseId_key" ON "Purchase"("businessId", "purchaseId");

-- CreateIndex
CREATE INDEX "PurchaseDetail_businessId_idx" ON "PurchaseDetail"("businessId");

-- CreateIndex
CREATE UNIQUE INDEX "PurchaseDetail_businessId_purchaseDetailId_key" ON "PurchaseDetail"("businessId", "purchaseDetailId");

-- CreateIndex
CREATE INDEX "TaxDocument_businessId_saleId_idx" ON "TaxDocument"("businessId", "saleId");

-- CreateIndex
CREATE INDEX "TaxDocument_businessId_documentType_idx" ON "TaxDocument"("businessId", "documentType");

-- CreateIndex
CREATE INDEX "TaxDocument_businessId_status_idx" ON "TaxDocument"("businessId", "status");

-- CreateIndex
CREATE INDEX "TaxDocument_businessId_folio_idx" ON "TaxDocument"("businessId", "folio");

-- CreateIndex
CREATE INDEX "TaxDocument_businessId_trackId_idx" ON "TaxDocument"("businessId", "trackId");

-- CreateIndex
CREATE INDEX "TaxDocument_businessId_receiverRut_idx" ON "TaxDocument"("businessId", "receiverRut");

-- CreateIndex
CREATE INDEX "TaxDocument_businessId_createdAt_idx" ON "TaxDocument"("businessId", "createdAt" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "TaxDocument_businessId_taxDocumentId_key" ON "TaxDocument"("businessId", "taxDocumentId");

-- CreateIndex
CREATE INDEX "TaxDocumentAuditLog_businessId_taxDocumentId_idx" ON "TaxDocumentAuditLog"("businessId", "taxDocumentId");

-- CreateIndex
CREATE INDEX "TaxDocumentAuditLog_businessId_createdAt_idx" ON "TaxDocumentAuditLog"("businessId", "createdAt" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "TaxDocumentAuditLog_businessId_auditLogId_key" ON "TaxDocumentAuditLog"("businessId", "auditLogId");

-- CreateIndex
CREATE INDEX "Quotation_businessId_prescriptionId_idx" ON "Quotation"("businessId", "prescriptionId");

-- CreateIndex
CREATE UNIQUE INDEX "Quotation_businessId_quotationId_key" ON "Quotation"("businessId", "quotationId");

-- CreateIndex
CREATE INDEX "QuotationDetail_businessId_idx" ON "QuotationDetail"("businessId");

-- CreateIndex
CREATE UNIQUE INDEX "QuotationDetail_businessId_quotationDetailId_key" ON "QuotationDetail"("businessId", "quotationDetailId");

-- CreateIndex
CREATE INDEX "Prescription_businessId_customerId_createdAt_idx" ON "Prescription"("businessId", "customerId", "createdAt" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "Prescription_businessId_prescriptionId_key" ON "Prescription"("businessId", "prescriptionId");

-- CreateIndex
CREATE INDEX "Laboratory_businessId_idx" ON "Laboratory"("businessId");

-- CreateIndex
CREATE UNIQUE INDEX "Laboratory_businessId_laboratoryId_key" ON "Laboratory"("businessId", "laboratoryId");

-- CreateIndex
CREATE INDEX "WorkOrder_businessId_saleId_idx" ON "WorkOrder"("businessId", "saleId");

-- CreateIndex
CREATE INDEX "WorkOrder_businessId_customerId_createdAt_idx" ON "WorkOrder"("businessId", "customerId", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "WorkOrder_businessId_laboratoryId_workOrderStatus_idx" ON "WorkOrder"("businessId", "laboratoryId", "workOrderStatus");

-- CreateIndex
CREATE INDEX "WorkOrder_businessId_labDispatchId_idx" ON "WorkOrder"("businessId", "labDispatchId");

-- CreateIndex
CREATE INDEX "WorkOrder_businessId_workOrderStatus_createdAt_idx" ON "WorkOrder"("businessId", "workOrderStatus", "createdAt" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "WorkOrder_businessId_workOrderId_key" ON "WorkOrder"("businessId", "workOrderId");

-- CreateIndex
CREATE INDEX "LabDispatch_businessId_laboratoryId_createdAt_idx" ON "LabDispatch"("businessId", "laboratoryId", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "LabDispatch_businessId_labDispatchStatus_createdAt_idx" ON "LabDispatch"("businessId", "labDispatchStatus", "createdAt" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "LabDispatch_businessId_labDispatchId_key" ON "LabDispatch"("businessId", "labDispatchId");

-- CreateIndex
CREATE INDEX "PurchaseCertificate_businessId_saleId_createdAt_idx" ON "PurchaseCertificate"("businessId", "saleId", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "PurchaseCertificate_businessId_certificateStatus_createdAt_idx" ON "PurchaseCertificate"("businessId", "certificateStatus", "createdAt" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "PurchaseCertificate_businessId_purchaseCertificateId_key" ON "PurchaseCertificate"("businessId", "purchaseCertificateId");

-- CreateIndex
CREATE INDEX "PurchaseCertificateDetail_businessId_purchaseCertificateId__idx" ON "PurchaseCertificateDetail"("businessId", "purchaseCertificateId", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "PurchaseCertificateDetail_businessId_purchaseCertificateDet_key" ON "PurchaseCertificateDetail"("businessId", "purchaseCertificateDetailId");

-- CreateIndex
CREATE INDEX "AppointmentSettings_businessId_idx" ON "AppointmentSettings"("businessId");

-- CreateIndex
CREATE UNIQUE INDEX "AppointmentSettings_businessId_settingsId_key" ON "AppointmentSettings"("businessId", "settingsId");

-- CreateIndex
CREATE INDEX "AppointmentWeeklyAvailability_businessId_settingsId_dayOfWe_idx" ON "AppointmentWeeklyAvailability"("businessId", "settingsId", "dayOfWeek");

-- CreateIndex
CREATE UNIQUE INDEX "AppointmentWeeklyAvailability_businessId_availabilityId_key" ON "AppointmentWeeklyAvailability"("businessId", "availabilityId");

-- CreateIndex
CREATE INDEX "Appointment_businessId_startsAt_endsAt_idx" ON "Appointment"("businessId", "startsAt", "endsAt");

-- CreateIndex
CREATE INDEX "Appointment_businessId_status_startsAt_idx" ON "Appointment"("businessId", "status", "startsAt");

-- CreateIndex
CREATE UNIQUE INDEX "Appointment_businessId_appointmentId_key" ON "Appointment"("businessId", "appointmentId");

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_businessId_createdByUserId_fkey" FOREIGN KEY ("businessId", "createdByUserId") REFERENCES "User"("businessId", "userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_businessId_categoryId_fkey" FOREIGN KEY ("businessId", "categoryId") REFERENCES "Category"("businessId", "categoryId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_businessId_createdByUserId_fkey" FOREIGN KEY ("businessId", "createdByUserId") REFERENCES "User"("businessId", "userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductStock" ADD CONSTRAINT "ProductStock_businessId_productId_fkey" FOREIGN KEY ("businessId", "productId") REFERENCES "Product"("businessId", "productId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryMovement" ADD CONSTRAINT "InventoryMovement_businessId_productId_fkey" FOREIGN KEY ("businessId", "productId") REFERENCES "ProductStock"("businessId", "productId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryMovement" ADD CONSTRAINT "InventoryMovement_businessId_createdByUserId_fkey" FOREIGN KEY ("businessId", "createdByUserId") REFERENCES "User"("businessId", "userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_businessId_categoryId_fkey" FOREIGN KEY ("businessId", "categoryId") REFERENCES "Category"("businessId", "categoryId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_businessId_createdByUserId_fkey" FOREIGN KEY ("businessId", "createdByUserId") REFERENCES "User"("businessId", "userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_businessId_createdByUserId_fkey" FOREIGN KEY ("businessId", "createdByUserId") REFERENCES "User"("businessId", "userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryAttribute" ADD CONSTRAINT "CategoryAttribute_businessId_categoryId_fkey" FOREIGN KEY ("businessId", "categoryId") REFERENCES "Category"("businessId", "categoryId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductAttributeValue" ADD CONSTRAINT "ProductAttributeValue_businessId_productId_fkey" FOREIGN KEY ("businessId", "productId") REFERENCES "Product"("businessId", "productId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductAttributeValue" ADD CONSTRAINT "ProductAttributeValue_businessId_categoryAttributeId_fkey" FOREIGN KEY ("businessId", "categoryAttributeId") REFERENCES "CategoryAttribute"("businessId", "categoryAttributeId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_businessId_createdByUserId_fkey" FOREIGN KEY ("businessId", "createdByUserId") REFERENCES "User"("businessId", "userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_businessId_saleCustomerId_fkey" FOREIGN KEY ("businessId", "saleCustomerId") REFERENCES "Customer"("businessId", "customerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_businessId_saleDeliveredByUserId_fkey" FOREIGN KEY ("businessId", "saleDeliveredByUserId") REFERENCES "User"("businessId", "userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleDetail" ADD CONSTRAINT "SaleDetail_businessId_saleCustomerId_fkey" FOREIGN KEY ("businessId", "saleCustomerId") REFERENCES "Customer"("businessId", "customerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleDetail" ADD CONSTRAINT "SaleDetail_businessId_createdByUserId_fkey" FOREIGN KEY ("businessId", "createdByUserId") REFERENCES "User"("businessId", "userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleDetail" ADD CONSTRAINT "SaleDetail_businessId_saleId_fkey" FOREIGN KEY ("businessId", "saleId") REFERENCES "Sale"("businessId", "saleId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleDetail" ADD CONSTRAINT "SaleDetail_businessId_saleDetailProductId_fkey" FOREIGN KEY ("businessId", "saleDetailProductId") REFERENCES "Product"("businessId", "productId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleDetail" ADD CONSTRAINT "SaleDetail_businessId_saleDetailServiceId_fkey" FOREIGN KEY ("businessId", "saleDetailServiceId") REFERENCES "Service"("businessId", "serviceId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_businessId_createdByUserId_fkey" FOREIGN KEY ("businessId", "createdByUserId") REFERENCES "User"("businessId", "userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_businessId_saleId_fkey" FOREIGN KEY ("businessId", "saleId") REFERENCES "Sale"("businessId", "saleId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CashExpense" ADD CONSTRAINT "CashExpense_businessId_createdByUserId_fkey" FOREIGN KEY ("businessId", "createdByUserId") REFERENCES "User"("businessId", "userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailySales" ADD CONSTRAINT "DailySales_businessId_createdByUserId_fkey" FOREIGN KEY ("businessId", "createdByUserId") REFERENCES "User"("businessId", "userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_businessId_createdByUserId_fkey" FOREIGN KEY ("businessId", "createdByUserId") REFERENCES "User"("businessId", "userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AsmrCampaign" ADD CONSTRAINT "AsmrCampaign_businessId_createdByUserId_fkey" FOREIGN KEY ("businessId", "createdByUserId") REFERENCES "User"("businessId", "userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_businessId_createdByUserId_fkey" FOREIGN KEY ("businessId", "createdByUserId") REFERENCES "User"("businessId", "userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Provider" ADD CONSTRAINT "Provider_businessId_createdByUserId_fkey" FOREIGN KEY ("businessId", "createdByUserId") REFERENCES "User"("businessId", "userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_businessId_purchaseProviderId_fkey" FOREIGN KEY ("businessId", "purchaseProviderId") REFERENCES "Provider"("businessId", "providerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_businessId_createdByUserId_fkey" FOREIGN KEY ("businessId", "createdByUserId") REFERENCES "User"("businessId", "userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_businessId_cancelledByUserId_fkey" FOREIGN KEY ("businessId", "cancelledByUserId") REFERENCES "User"("businessId", "userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseDetail" ADD CONSTRAINT "PurchaseDetail_businessId_purchaseId_fkey" FOREIGN KEY ("businessId", "purchaseId") REFERENCES "Purchase"("businessId", "purchaseId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseDetail" ADD CONSTRAINT "PurchaseDetail_businessId_purchaseDetailProductId_fkey" FOREIGN KEY ("businessId", "purchaseDetailProductId") REFERENCES "Product"("businessId", "productId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseDetail" ADD CONSTRAINT "PurchaseDetail_businessId_purchaseDetailServiceId_fkey" FOREIGN KEY ("businessId", "purchaseDetailServiceId") REFERENCES "Service"("businessId", "serviceId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseDetail" ADD CONSTRAINT "PurchaseDetail_businessId_createdByUserId_fkey" FOREIGN KEY ("businessId", "createdByUserId") REFERENCES "User"("businessId", "userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaxDocument" ADD CONSTRAINT "TaxDocument_businessId_saleId_fkey" FOREIGN KEY ("businessId", "saleId") REFERENCES "Sale"("businessId", "saleId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaxDocumentAuditLog" ADD CONSTRAINT "TaxDocumentAuditLog_businessId_taxDocumentId_fkey" FOREIGN KEY ("businessId", "taxDocumentId") REFERENCES "TaxDocument"("businessId", "taxDocumentId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quotation" ADD CONSTRAINT "Quotation_businessId_prescriptionId_fkey" FOREIGN KEY ("businessId", "prescriptionId") REFERENCES "Prescription"("businessId", "prescriptionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quotation" ADD CONSTRAINT "Quotation_businessId_createdByUserId_fkey" FOREIGN KEY ("businessId", "createdByUserId") REFERENCES "User"("businessId", "userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quotation" ADD CONSTRAINT "Quotation_businessId_quotationCustomerId_fkey" FOREIGN KEY ("businessId", "quotationCustomerId") REFERENCES "Customer"("businessId", "customerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuotationDetail" ADD CONSTRAINT "QuotationDetail_businessId_quotationCustomerId_fkey" FOREIGN KEY ("businessId", "quotationCustomerId") REFERENCES "Customer"("businessId", "customerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuotationDetail" ADD CONSTRAINT "QuotationDetail_businessId_createdByUserId_fkey" FOREIGN KEY ("businessId", "createdByUserId") REFERENCES "User"("businessId", "userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuotationDetail" ADD CONSTRAINT "QuotationDetail_businessId_quotationId_fkey" FOREIGN KEY ("businessId", "quotationId") REFERENCES "Quotation"("businessId", "quotationId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuotationDetail" ADD CONSTRAINT "QuotationDetail_businessId_quotationDetailProductId_fkey" FOREIGN KEY ("businessId", "quotationDetailProductId") REFERENCES "Product"("businessId", "productId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuotationDetail" ADD CONSTRAINT "QuotationDetail_businessId_quotationDetailServiceId_fkey" FOREIGN KEY ("businessId", "quotationDetailServiceId") REFERENCES "Service"("businessId", "serviceId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prescription" ADD CONSTRAINT "Prescription_businessId_customerId_fkey" FOREIGN KEY ("businessId", "customerId") REFERENCES "Customer"("businessId", "customerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prescription" ADD CONSTRAINT "Prescription_businessId_createdByUserId_fkey" FOREIGN KEY ("businessId", "createdByUserId") REFERENCES "User"("businessId", "userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Laboratory" ADD CONSTRAINT "Laboratory_businessId_createdByUserId_fkey" FOREIGN KEY ("businessId", "createdByUserId") REFERENCES "User"("businessId", "userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkOrder" ADD CONSTRAINT "WorkOrder_businessId_saleId_fkey" FOREIGN KEY ("businessId", "saleId") REFERENCES "Sale"("businessId", "saleId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkOrder" ADD CONSTRAINT "WorkOrder_businessId_saleDetailId_fkey" FOREIGN KEY ("businessId", "saleDetailId") REFERENCES "SaleDetail"("businessId", "saleDetailId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkOrder" ADD CONSTRAINT "WorkOrder_businessId_customerId_fkey" FOREIGN KEY ("businessId", "customerId") REFERENCES "Customer"("businessId", "customerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkOrder" ADD CONSTRAINT "WorkOrder_businessId_prescriptionId_fkey" FOREIGN KEY ("businessId", "prescriptionId") REFERENCES "Prescription"("businessId", "prescriptionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkOrder" ADD CONSTRAINT "WorkOrder_businessId_laboratoryId_fkey" FOREIGN KEY ("businessId", "laboratoryId") REFERENCES "Laboratory"("businessId", "laboratoryId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkOrder" ADD CONSTRAINT "WorkOrder_businessId_labDispatchId_fkey" FOREIGN KEY ("businessId", "labDispatchId") REFERENCES "LabDispatch"("businessId", "labDispatchId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkOrder" ADD CONSTRAINT "WorkOrder_businessId_createdByUserId_fkey" FOREIGN KEY ("businessId", "createdByUserId") REFERENCES "User"("businessId", "userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabDispatch" ADD CONSTRAINT "LabDispatch_businessId_laboratoryId_fkey" FOREIGN KEY ("businessId", "laboratoryId") REFERENCES "Laboratory"("businessId", "laboratoryId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabDispatch" ADD CONSTRAINT "LabDispatch_businessId_sentByUserId_fkey" FOREIGN KEY ("businessId", "sentByUserId") REFERENCES "User"("businessId", "userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabDispatch" ADD CONSTRAINT "LabDispatch_businessId_createdByUserId_fkey" FOREIGN KEY ("businessId", "createdByUserId") REFERENCES "User"("businessId", "userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseCertificate" ADD CONSTRAINT "PurchaseCertificate_businessId_saleId_fkey" FOREIGN KEY ("businessId", "saleId") REFERENCES "Sale"("businessId", "saleId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseCertificate" ADD CONSTRAINT "PurchaseCertificate_businessId_issuedByUserId_fkey" FOREIGN KEY ("businessId", "issuedByUserId") REFERENCES "User"("businessId", "userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseCertificate" ADD CONSTRAINT "PurchaseCertificate_businessId_createdByUserId_fkey" FOREIGN KEY ("businessId", "createdByUserId") REFERENCES "User"("businessId", "userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseCertificateDetail" ADD CONSTRAINT "PurchaseCertificateDetail_businessId_purchaseCertificateId_fkey" FOREIGN KEY ("businessId", "purchaseCertificateId") REFERENCES "PurchaseCertificate"("businessId", "purchaseCertificateId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentWeeklyAvailability" ADD CONSTRAINT "AppointmentWeeklyAvailability_businessId_settingsId_fkey" FOREIGN KEY ("businessId", "settingsId") REFERENCES "AppointmentSettings"("businessId", "settingsId") ON DELETE CASCADE ON UPDATE CASCADE;

-- Fail-closed tenant isolation. The runtime role must not have BYPASSRLS.

ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "User" FORCE ROW LEVEL SECURITY;

CREATE POLICY "tenant_isolation_User"
ON "User"
FOR ALL
USING ("businessId" = current_setting('app.current_business_id', true))
WITH CHECK ("businessId" = current_setting('app.current_business_id', true));


ALTER TABLE "Customer" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Customer" FORCE ROW LEVEL SECURITY;

CREATE POLICY "tenant_isolation_Customer"
ON "Customer"
FOR ALL
USING ("businessId" = current_setting('app.current_business_id', true))
WITH CHECK ("businessId" = current_setting('app.current_business_id', true));


ALTER TABLE "Product" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Product" FORCE ROW LEVEL SECURITY;

CREATE POLICY "tenant_isolation_Product"
ON "Product"
FOR ALL
USING ("businessId" = current_setting('app.current_business_id', true))
WITH CHECK ("businessId" = current_setting('app.current_business_id', true));


ALTER TABLE "ScanCode" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ScanCode" FORCE ROW LEVEL SECURITY;

CREATE POLICY "tenant_isolation_ScanCode"
ON "ScanCode"
FOR ALL
USING ("businessId" = current_setting('app.current_business_id', true))
WITH CHECK ("businessId" = current_setting('app.current_business_id', true));


ALTER TABLE "ProductStock" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ProductStock" FORCE ROW LEVEL SECURITY;

CREATE POLICY "tenant_isolation_ProductStock"
ON "ProductStock"
FOR ALL
USING ("businessId" = current_setting('app.current_business_id', true))
WITH CHECK ("businessId" = current_setting('app.current_business_id', true));


ALTER TABLE "InventoryMovement" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "InventoryMovement" FORCE ROW LEVEL SECURITY;

CREATE POLICY "tenant_isolation_InventoryMovement"
ON "InventoryMovement"
FOR ALL
USING ("businessId" = current_setting('app.current_business_id', true))
WITH CHECK ("businessId" = current_setting('app.current_business_id', true));


ALTER TABLE "Service" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Service" FORCE ROW LEVEL SECURITY;

CREATE POLICY "tenant_isolation_Service"
ON "Service"
FOR ALL
USING ("businessId" = current_setting('app.current_business_id', true))
WITH CHECK ("businessId" = current_setting('app.current_business_id', true));


ALTER TABLE "Category" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Category" FORCE ROW LEVEL SECURITY;

CREATE POLICY "tenant_isolation_Category"
ON "Category"
FOR ALL
USING ("businessId" = current_setting('app.current_business_id', true))
WITH CHECK ("businessId" = current_setting('app.current_business_id', true));


ALTER TABLE "CategoryAttribute" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "CategoryAttribute" FORCE ROW LEVEL SECURITY;

CREATE POLICY "tenant_isolation_CategoryAttribute"
ON "CategoryAttribute"
FOR ALL
USING ("businessId" = current_setting('app.current_business_id', true))
WITH CHECK ("businessId" = current_setting('app.current_business_id', true));


ALTER TABLE "ProductAttributeValue" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ProductAttributeValue" FORCE ROW LEVEL SECURITY;

CREATE POLICY "tenant_isolation_ProductAttributeValue"
ON "ProductAttributeValue"
FOR ALL
USING ("businessId" = current_setting('app.current_business_id', true))
WITH CHECK ("businessId" = current_setting('app.current_business_id', true));


ALTER TABLE "Sale" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Sale" FORCE ROW LEVEL SECURITY;

CREATE POLICY "tenant_isolation_Sale"
ON "Sale"
FOR ALL
USING ("businessId" = current_setting('app.current_business_id', true))
WITH CHECK ("businessId" = current_setting('app.current_business_id', true));


ALTER TABLE "SaleDetail" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "SaleDetail" FORCE ROW LEVEL SECURITY;

CREATE POLICY "tenant_isolation_SaleDetail"
ON "SaleDetail"
FOR ALL
USING ("businessId" = current_setting('app.current_business_id', true))
WITH CHECK ("businessId" = current_setting('app.current_business_id', true));


ALTER TABLE "Payment" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Payment" FORCE ROW LEVEL SECURITY;

CREATE POLICY "tenant_isolation_Payment"
ON "Payment"
FOR ALL
USING ("businessId" = current_setting('app.current_business_id', true))
WITH CHECK ("businessId" = current_setting('app.current_business_id', true));


ALTER TABLE "CashExpense" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "CashExpense" FORCE ROW LEVEL SECURITY;

CREATE POLICY "tenant_isolation_CashExpense"
ON "CashExpense"
FOR ALL
USING ("businessId" = current_setting('app.current_business_id', true))
WITH CHECK ("businessId" = current_setting('app.current_business_id', true));


ALTER TABLE "DailySales" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "DailySales" FORCE ROW LEVEL SECURITY;

CREATE POLICY "tenant_isolation_DailySales"
ON "DailySales"
FOR ALL
USING ("businessId" = current_setting('app.current_business_id', true))
WITH CHECK ("businessId" = current_setting('app.current_business_id', true));


ALTER TABLE "Transactions" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Transactions" FORCE ROW LEVEL SECURITY;

CREATE POLICY "tenant_isolation_Transactions"
ON "Transactions"
FOR ALL
USING ("businessId" = current_setting('app.current_business_id', true))
WITH CHECK ("businessId" = current_setting('app.current_business_id', true));


ALTER TABLE "AsmrCampaign" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "AsmrCampaign" FORCE ROW LEVEL SECURITY;

CREATE POLICY "tenant_isolation_AsmrCampaign"
ON "AsmrCampaign"
FOR ALL
USING ("businessId" = current_setting('app.current_business_id', true))
WITH CHECK ("businessId" = current_setting('app.current_business_id', true));


ALTER TABLE "Expense" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Expense" FORCE ROW LEVEL SECURITY;

CREATE POLICY "tenant_isolation_Expense"
ON "Expense"
FOR ALL
USING ("businessId" = current_setting('app.current_business_id', true))
WITH CHECK ("businessId" = current_setting('app.current_business_id', true));


ALTER TABLE "Provider" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Provider" FORCE ROW LEVEL SECURITY;

CREATE POLICY "tenant_isolation_Provider"
ON "Provider"
FOR ALL
USING ("businessId" = current_setting('app.current_business_id', true))
WITH CHECK ("businessId" = current_setting('app.current_business_id', true));


ALTER TABLE "Purchase" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Purchase" FORCE ROW LEVEL SECURITY;

CREATE POLICY "tenant_isolation_Purchase"
ON "Purchase"
FOR ALL
USING ("businessId" = current_setting('app.current_business_id', true))
WITH CHECK ("businessId" = current_setting('app.current_business_id', true));


ALTER TABLE "PurchaseDetail" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "PurchaseDetail" FORCE ROW LEVEL SECURITY;

CREATE POLICY "tenant_isolation_PurchaseDetail"
ON "PurchaseDetail"
FOR ALL
USING ("businessId" = current_setting('app.current_business_id', true))
WITH CHECK ("businessId" = current_setting('app.current_business_id', true));


ALTER TABLE "TaxDocument" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "TaxDocument" FORCE ROW LEVEL SECURITY;

CREATE POLICY "tenant_isolation_TaxDocument"
ON "TaxDocument"
FOR ALL
USING ("businessId" = current_setting('app.current_business_id', true))
WITH CHECK ("businessId" = current_setting('app.current_business_id', true));


ALTER TABLE "TaxDocumentAuditLog" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "TaxDocumentAuditLog" FORCE ROW LEVEL SECURITY;

CREATE POLICY "tenant_isolation_TaxDocumentAuditLog"
ON "TaxDocumentAuditLog"
FOR ALL
USING ("businessId" = current_setting('app.current_business_id', true))
WITH CHECK ("businessId" = current_setting('app.current_business_id', true));


ALTER TABLE "Quotation" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Quotation" FORCE ROW LEVEL SECURITY;

CREATE POLICY "tenant_isolation_Quotation"
ON "Quotation"
FOR ALL
USING ("businessId" = current_setting('app.current_business_id', true))
WITH CHECK ("businessId" = current_setting('app.current_business_id', true));


ALTER TABLE "QuotationDetail" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "QuotationDetail" FORCE ROW LEVEL SECURITY;

CREATE POLICY "tenant_isolation_QuotationDetail"
ON "QuotationDetail"
FOR ALL
USING ("businessId" = current_setting('app.current_business_id', true))
WITH CHECK ("businessId" = current_setting('app.current_business_id', true));


ALTER TABLE "Prescription" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Prescription" FORCE ROW LEVEL SECURITY;

CREATE POLICY "tenant_isolation_Prescription"
ON "Prescription"
FOR ALL
USING ("businessId" = current_setting('app.current_business_id', true))
WITH CHECK ("businessId" = current_setting('app.current_business_id', true));


ALTER TABLE "Laboratory" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Laboratory" FORCE ROW LEVEL SECURITY;

CREATE POLICY "tenant_isolation_Laboratory"
ON "Laboratory"
FOR ALL
USING ("businessId" = current_setting('app.current_business_id', true))
WITH CHECK ("businessId" = current_setting('app.current_business_id', true));


ALTER TABLE "WorkOrder" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "WorkOrder" FORCE ROW LEVEL SECURITY;

CREATE POLICY "tenant_isolation_WorkOrder"
ON "WorkOrder"
FOR ALL
USING ("businessId" = current_setting('app.current_business_id', true))
WITH CHECK ("businessId" = current_setting('app.current_business_id', true));


ALTER TABLE "LabDispatch" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "LabDispatch" FORCE ROW LEVEL SECURITY;

CREATE POLICY "tenant_isolation_LabDispatch"
ON "LabDispatch"
FOR ALL
USING ("businessId" = current_setting('app.current_business_id', true))
WITH CHECK ("businessId" = current_setting('app.current_business_id', true));


ALTER TABLE "PurchaseCertificate" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "PurchaseCertificate" FORCE ROW LEVEL SECURITY;

CREATE POLICY "tenant_isolation_PurchaseCertificate"
ON "PurchaseCertificate"
FOR ALL
USING ("businessId" = current_setting('app.current_business_id', true))
WITH CHECK ("businessId" = current_setting('app.current_business_id', true));


ALTER TABLE "PurchaseCertificateDetail" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "PurchaseCertificateDetail" FORCE ROW LEVEL SECURITY;

CREATE POLICY "tenant_isolation_PurchaseCertificateDetail"
ON "PurchaseCertificateDetail"
FOR ALL
USING ("businessId" = current_setting('app.current_business_id', true))
WITH CHECK ("businessId" = current_setting('app.current_business_id', true));


ALTER TABLE "AppointmentSettings" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "AppointmentSettings" FORCE ROW LEVEL SECURITY;

CREATE POLICY "tenant_isolation_AppointmentSettings"
ON "AppointmentSettings"
FOR ALL
USING ("businessId" = current_setting('app.current_business_id', true))
WITH CHECK ("businessId" = current_setting('app.current_business_id', true));


ALTER TABLE "AppointmentWeeklyAvailability" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "AppointmentWeeklyAvailability" FORCE ROW LEVEL SECURITY;

CREATE POLICY "tenant_isolation_AppointmentWeeklyAvailability"
ON "AppointmentWeeklyAvailability"
FOR ALL
USING ("businessId" = current_setting('app.current_business_id', true))
WITH CHECK ("businessId" = current_setting('app.current_business_id', true));


ALTER TABLE "Appointment" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Appointment" FORCE ROW LEVEL SECURITY;

CREATE POLICY "tenant_isolation_Appointment"
ON "Appointment"
FOR ALL
USING ("businessId" = current_setting('app.current_business_id', true))
WITH CHECK ("businessId" = current_setting('app.current_business_id', true));
