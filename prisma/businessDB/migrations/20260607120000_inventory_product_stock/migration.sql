-- CreateEnum
CREATE TYPE "InventoryMovementType" AS ENUM ('VENTA', 'COMPRA', 'AJUSTE_MANUAL', 'MERMA', 'DEVOLUCION', 'ANULACION_VENTA', 'ANULACION_COMPRA');

-- CreateEnum
CREATE TYPE "InventoryReferenceType" AS ENUM ('SALE', 'SALE_DETAIL', 'PURCHASE', 'PURCHASE_DETAIL', 'MANUAL', 'NONE');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN "productAllowZeroStock" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "ProductStock" (
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

-- Backfill stock rows for existing products
INSERT INTO "ProductStock" ("productId", "quantityOnHand", "reorderPoint", "averageUnitCost", "version", "createdAt", "updatedAt")
SELECT "productId", 0, 0, 0, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM "Product";

-- AddForeignKey
ALTER TABLE "ProductStock" ADD CONSTRAINT "ProductStock_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("productId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryMovement" ADD CONSTRAINT "InventoryMovement_productId_fkey" FOREIGN KEY ("productId") REFERENCES "ProductStock"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryMovement" ADD CONSTRAINT "InventoryMovement_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateIndex
CREATE INDEX "InventoryMovement_productId_createdAt_idx" ON "InventoryMovement"("productId", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "InventoryMovement_movementType_createdAt_idx" ON "InventoryMovement"("movementType", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "InventoryMovement_referenceType_referenceId_idx" ON "InventoryMovement"("referenceType", "referenceId");

-- CreateIndex
CREATE INDEX "InventoryMovement_createdAt_idx" ON "InventoryMovement"("createdAt" DESC);
