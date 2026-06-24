-- Sale delivery control: optional delivery status per sale (independent from payment)

CREATE TYPE "SaleDeliveryStatus" AS ENUM ('PENDING', 'DELIVERED');

ALTER TABLE "Sale"
ADD COLUMN "saleDeliveryStatus" "SaleDeliveryStatus",
ADD COLUMN "saleDeliveredAt" TIMESTAMP(3),
ADD COLUMN "saleDeliveredByUserId" TEXT;

ALTER TABLE "Sale"
ADD CONSTRAINT "Sale_saleDeliveredByUserId_fkey"
FOREIGN KEY ("saleDeliveredByUserId") REFERENCES "User"("userId")
ON DELETE SET NULL ON UPDATE CASCADE;
