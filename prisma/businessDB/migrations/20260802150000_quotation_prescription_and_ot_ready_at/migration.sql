-- AlterTable Quotation: vínculo opcional a receta óptica
ALTER TABLE "Quotation" ADD COLUMN "prescriptionId" TEXT;

-- AlterTable WorkOrder: timestamp al marcar lista para entrega
ALTER TABLE "WorkOrder" ADD COLUMN "readyForDeliveryAt" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "Quotation_prescriptionId_idx" ON "Quotation"("prescriptionId");

-- AddForeignKey
ALTER TABLE "Quotation" ADD CONSTRAINT "Quotation_prescriptionId_fkey" FOREIGN KEY ("prescriptionId") REFERENCES "Prescription"("prescriptionId") ON DELETE SET NULL ON UPDATE CASCADE;
