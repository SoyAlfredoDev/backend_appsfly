-- CreateEnum
CREATE TYPE "QuotationEmailDeliveryStatus" AS ENUM ('PENDING', 'SENT', 'DELIVERED', 'FAILED', 'BOUNCED');

-- AlterTable
ALTER TABLE "Quotation" ADD COLUMN     "quotationEmailDeliveryStatus" "QuotationEmailDeliveryStatus",
ADD COLUMN     "quotationEmailProviderMessageId" TEXT,
ADD COLUMN     "quotationEmailSentTo" TEXT,
ADD COLUMN     "quotationEmailSentAt" TIMESTAMP(3),
ADD COLUMN     "quotationEmailDeliveredAt" TIMESTAMP(3),
ADD COLUMN     "quotationEmailOpenedAt" TIMESTAMP(3),
ADD COLUMN     "quotationEmailErrorMessage" TEXT;
