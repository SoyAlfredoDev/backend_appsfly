-- AlterTable: flag de producto que requiere OT (óptica)
ALTER TABLE "Product" ADD COLUMN "productRequiresLabWork" BOOLEAN NOT NULL DEFAULT false;

-- CreateEnum
CREATE TYPE "WorkOrderStatus" AS ENUM (
    'CREATED',
    'PENDING_SHIPMENT',
    'SENT_TO_LAB',
    'RECEIVED',
    'QUALITY_CONTROL',
    'READY_FOR_DELIVERY',
    'DELIVERED'
);

CREATE TYPE "LabDispatchStatus" AS ENUM (
    'SENT',
    'PARTIAL_RECEIVED',
    'RECEIVED',
    'CANCELLED'
);

-- CreateTable Laboratory
CREATE TABLE "Laboratory" (
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

-- CreateTable LabDispatch
CREATE TABLE "LabDispatch" (
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

-- CreateTable WorkOrder
CREATE TABLE "WorkOrder" (
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
    "deliveredAt" TIMESTAMP(3),
    "createdByUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkOrder_pkey" PRIMARY KEY ("workOrderId")
);

-- Indexes
CREATE INDEX "LabDispatch_laboratoryId_createdAt_idx" ON "LabDispatch"("laboratoryId", "createdAt" DESC);
CREATE INDEX "LabDispatch_labDispatchStatus_createdAt_idx" ON "LabDispatch"("labDispatchStatus", "createdAt" DESC);
CREATE INDEX "WorkOrder_saleId_idx" ON "WorkOrder"("saleId");
CREATE INDEX "WorkOrder_customerId_createdAt_idx" ON "WorkOrder"("customerId", "createdAt" DESC);
CREATE INDEX "WorkOrder_laboratoryId_workOrderStatus_idx" ON "WorkOrder"("laboratoryId", "workOrderStatus");
CREATE INDEX "WorkOrder_labDispatchId_idx" ON "WorkOrder"("labDispatchId");
CREATE INDEX "WorkOrder_workOrderStatus_createdAt_idx" ON "WorkOrder"("workOrderStatus", "createdAt" DESC);

-- ForeignKeys
ALTER TABLE "Laboratory" ADD CONSTRAINT "Laboratory_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "LabDispatch" ADD CONSTRAINT "LabDispatch_laboratoryId_fkey" FOREIGN KEY ("laboratoryId") REFERENCES "Laboratory"("laboratoryId") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "LabDispatch" ADD CONSTRAINT "LabDispatch_sentByUserId_fkey" FOREIGN KEY ("sentByUserId") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "LabDispatch" ADD CONSTRAINT "LabDispatch_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "WorkOrder" ADD CONSTRAINT "WorkOrder_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sale"("saleId") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "WorkOrder" ADD CONSTRAINT "WorkOrder_saleDetailId_fkey" FOREIGN KEY ("saleDetailId") REFERENCES "SaleDetail"("saleDetailId") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "WorkOrder" ADD CONSTRAINT "WorkOrder_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("customerId") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "WorkOrder" ADD CONSTRAINT "WorkOrder_prescriptionId_fkey" FOREIGN KEY ("prescriptionId") REFERENCES "Prescription"("prescriptionId") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "WorkOrder" ADD CONSTRAINT "WorkOrder_laboratoryId_fkey" FOREIGN KEY ("laboratoryId") REFERENCES "Laboratory"("laboratoryId") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "WorkOrder" ADD CONSTRAINT "WorkOrder_labDispatchId_fkey" FOREIGN KEY ("labDispatchId") REFERENCES "LabDispatch"("labDispatchId") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "WorkOrder" ADD CONSTRAINT "WorkOrder_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
