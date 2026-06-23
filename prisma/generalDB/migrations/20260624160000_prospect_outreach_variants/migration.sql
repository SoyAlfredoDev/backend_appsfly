-- Seguimiento de variante de correo por envío y por prospecto
ALTER TABLE "PlatformEmailCampaignRecipient"
    ADD COLUMN IF NOT EXISTS "messageVariantId" TEXT;

ALTER TABLE "PlatformEmailProspect"
    ADD COLUMN IF NOT EXISTS "lastOutreachVariantId" TEXT;

CREATE INDEX IF NOT EXISTS "PlatformEmailCampaignRecipient_messageVariantId_idx"
    ON "PlatformEmailCampaignRecipient"("messageVariantId");
