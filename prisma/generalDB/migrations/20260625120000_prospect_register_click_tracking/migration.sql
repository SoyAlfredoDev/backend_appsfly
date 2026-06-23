-- Clics en enlace de registro (tracking por destinatario de campaña)

ALTER TABLE "PlatformEmailCampaign"
    ADD COLUMN IF NOT EXISTS "totalClicked" INTEGER NOT NULL DEFAULT 0;

ALTER TABLE "PlatformEmailCampaignRun"
    ADD COLUMN IF NOT EXISTS "clickedCount" INTEGER NOT NULL DEFAULT 0;

ALTER TABLE "PlatformEmailCampaignRecipient"
    ADD COLUMN IF NOT EXISTS "clickedAt" TIMESTAMP(3),
    ADD COLUMN IF NOT EXISTS "clickCount" INTEGER NOT NULL DEFAULT 0;

CREATE INDEX IF NOT EXISTS "PlatformEmailCampaignRecipient_clickedAt_idx"
    ON "PlatformEmailCampaignRecipient"("clickedAt");
