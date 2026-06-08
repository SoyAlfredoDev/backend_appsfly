-- AlterTable: auditoría de anulación (soft cancel — no elimina el registro)
ALTER TABLE "Purchase" ADD COLUMN "cancelledByUserId" TEXT;
ALTER TABLE "Purchase" ADD COLUMN "cancelledAt" TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_cancelledByUserId_fkey" FOREIGN KEY ("cancelledByUserId") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
