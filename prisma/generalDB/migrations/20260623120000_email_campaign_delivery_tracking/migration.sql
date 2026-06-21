-- Tracking real de entrega, rebotes y aperturas (webhooks Resend)

ALTER TABLE "PlatformEmailCampaign"
    ADD COLUMN IF NOT EXISTS "totalBounced" INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN IF NOT EXISTS "totalOpened" INTEGER NOT NULL DEFAULT 0;

ALTER TABLE "PlatformEmailCampaignRun"
    ADD COLUMN IF NOT EXISTS "bouncedCount" INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN IF NOT EXISTS "openedCount" INTEGER NOT NULL DEFAULT 0;

ALTER TABLE "PlatformEmailCampaignRecipient"
    ADD COLUMN IF NOT EXISTS "deliveredAt" TIMESTAMP(3),
    ADD COLUMN IF NOT EXISTS "bouncedAt" TIMESTAMP(3),
    ADD COLUMN IF NOT EXISTS "openedAt" TIMESTAMP(3),
    ADD COLUMN IF NOT EXISTS "openCount" INTEGER NOT NULL DEFAULT 0;

CREATE INDEX IF NOT EXISTS "PlatformEmailCampaignRecipient_providerMessageId_idx"
    ON "PlatformEmailCampaignRecipient"("providerMessageId");
