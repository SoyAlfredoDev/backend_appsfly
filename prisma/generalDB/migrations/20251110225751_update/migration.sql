-- AlterTable
ALTER TABLE "Business" ADD COLUMN     "createdByUserId" TEXT;

-- AddForeignKey
ALTER TABLE "Business" ADD CONSTRAINT "Business_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
