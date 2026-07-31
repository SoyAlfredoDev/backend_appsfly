-- AlterTable: campos opcionales de ficha (óptica / CRM)
ALTER TABLE "Customer" ADD COLUMN "customerBirthDate" TIMESTAMP(3);
ALTER TABLE "Customer" ADD COLUMN "customerAddress" TEXT;

-- CreateTable: historial de recetas ópticas por cliente
CREATE TABLE "Prescription" (
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

-- CreateIndex
CREATE INDEX "Prescription_customerId_createdAt_idx" ON "Prescription"("customerId", "createdAt" DESC);

-- AddForeignKey
ALTER TABLE "Prescription" ADD CONSTRAINT "Prescription_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("customerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prescription" ADD CONSTRAINT "Prescription_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
