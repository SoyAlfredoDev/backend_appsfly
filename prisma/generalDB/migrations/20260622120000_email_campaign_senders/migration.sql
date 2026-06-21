ALTER TABLE "PlatformEmailCampaign"
    ADD COLUMN IF NOT EXISTS "senderEmail" TEXT,
    ADD COLUMN IF NOT EXISTS "senderName" TEXT;
