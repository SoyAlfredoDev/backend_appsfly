-- Campaña mensual suspendidos: audiencia, métricas, destinatarios por envío

ALTER TYPE "PlatformEmailAudienceType" ADD VALUE IF NOT EXISTS 'SUSPENDED_BUSINESS_ADMINS';

CREATE TYPE "PlatformEmailScheduleFrequency" AS ENUM ('MANUAL', 'MONTHLY');
CREATE TYPE "PlatformEmailRecipientStatus" AS ENUM ('PENDING', 'SENT', 'DELIVERED', 'FAILED', 'BOUNCED');

ALTER TABLE "PlatformEmailCampaign"
    ADD COLUMN IF NOT EXISTS "campaignKey" TEXT,
    ADD COLUMN IF NOT EXISTS "scheduleFrequency" "PlatformEmailScheduleFrequency" NOT NULL DEFAULT 'MANUAL',
    ADD COLUMN IF NOT EXISTS "lastRunAt" TIMESTAMP(3),
    ADD COLUMN IF NOT EXISTS "totalDelivered" INTEGER NOT NULL DEFAULT 0;

CREATE UNIQUE INDEX IF NOT EXISTS "PlatformEmailCampaign_campaignKey_key"
    ON "PlatformEmailCampaign"("campaignKey");

CREATE INDEX IF NOT EXISTS "PlatformEmailCampaign_campaignKey_idx"
    ON "PlatformEmailCampaign"("campaignKey");

ALTER TABLE "PlatformEmailCampaignRun"
    ADD COLUMN IF NOT EXISTS "deliveredCount" INTEGER NOT NULL DEFAULT 0;

CREATE TABLE IF NOT EXISTS "PlatformEmailCampaignRecipient" (
    "recipientId" TEXT NOT NULL,
    "runId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "businessId" TEXT,
    "recipientEmail" TEXT NOT NULL,
    "recipientName" TEXT,
    "businessName" TEXT,
    "deliveryStatus" "PlatformEmailRecipientStatus" NOT NULL DEFAULT 'PENDING',
    "providerMessageId" TEXT,
    "errorMessage" TEXT,
    "sentAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PlatformEmailCampaignRecipient_pkey" PRIMARY KEY ("recipientId")
);

CREATE INDEX IF NOT EXISTS "PlatformEmailCampaignRecipient_runId_idx"
    ON "PlatformEmailCampaignRecipient"("runId");
CREATE INDEX IF NOT EXISTS "PlatformEmailCampaignRecipient_deliveryStatus_idx"
    ON "PlatformEmailCampaignRecipient"("deliveryStatus");
CREATE INDEX IF NOT EXISTS "PlatformEmailCampaignRecipient_recipientEmail_idx"
    ON "PlatformEmailCampaignRecipient"("recipientEmail");

ALTER TABLE "PlatformEmailCampaignRecipient"
    DROP CONSTRAINT IF EXISTS "PlatformEmailCampaignRecipient_runId_fkey";

ALTER TABLE "PlatformEmailCampaignRecipient"
    ADD CONSTRAINT "PlatformEmailCampaignRecipient_runId_fkey"
    FOREIGN KEY ("runId") REFERENCES "PlatformEmailCampaignRun"("runId") ON DELETE CASCADE ON UPDATE CASCADE;
