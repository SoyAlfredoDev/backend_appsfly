ALTER TABLE "Business"
ADD COLUMN IF NOT EXISTS "businessDeliveryControlEnabled" BOOLEAN NOT NULL DEFAULT false;
