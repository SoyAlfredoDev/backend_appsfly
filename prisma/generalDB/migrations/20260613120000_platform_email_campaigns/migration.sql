-- Campañas de email de plataforma (panel admin). Separadas de campañas tenant (ASMR).

CREATE TYPE "PlatformEmailCampaignStatus" AS ENUM (
    'DRAFT',
    'SCHEDULED',
    'SENDING',
    'SENT',
    'FAILED',
    'ARCHIVED'
);

CREATE TYPE "PlatformEmailAudienceType" AS ENUM (
    'ALL_USERS',
    'CONFIRMED_EMAIL',
    'PENDING_EMAIL',
    'ACTIVE_SUBSCRIPTION',
    'EXPIRED_SUBSCRIPTION',
    'NEWSLETTER_SUBSCRIBERS',
    'CUSTOM_SEGMENT'
);

CREATE TYPE "PlatformEmailCampaignRunStatus" AS ENUM (
    'PENDING',
    'RUNNING',
    'COMPLETED',
    'FAILED',
    'CANCELLED'
);

CREATE TABLE "PlatformEmailCampaign" (
    "campaignId" TEXT NOT NULL,
    "campaignName" TEXT NOT NULL,
    "campaignDescription" TEXT,
    "campaignStatus" "PlatformEmailCampaignStatus" NOT NULL DEFAULT 'DRAFT',
    "audienceType" "PlatformEmailAudienceType" NOT NULL DEFAULT 'ALL_USERS',
    "audienceParams" JSONB,
    "emailSubject" TEXT,
    "emailHtml" TEXT,
    "emailText" TEXT,
    "messageIntent" TEXT,
    "scheduledAt" TIMESTAMP(3),
    "sentAt" TIMESTAMP(3),
    "totalRecipients" INTEGER NOT NULL DEFAULT 0,
    "totalSent" INTEGER NOT NULL DEFAULT 0,
    "totalFailed" INTEGER NOT NULL DEFAULT 0,
    "createdByUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlatformEmailCampaign_pkey" PRIMARY KEY ("campaignId")
);

CREATE TABLE "PlatformEmailCampaignRun" (
    "runId" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "runStatus" "PlatformEmailCampaignRunStatus" NOT NULL DEFAULT 'PENDING',
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "recipientCount" INTEGER NOT NULL DEFAULT 0,
    "sentCount" INTEGER NOT NULL DEFAULT 0,
    "failedCount" INTEGER NOT NULL DEFAULT 0,
    "errorLog" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PlatformEmailCampaignRun_pkey" PRIMARY KEY ("runId")
);

CREATE INDEX "PlatformEmailCampaign_campaignStatus_idx" ON "PlatformEmailCampaign"("campaignStatus");
CREATE INDEX "PlatformEmailCampaign_createdAt_idx" ON "PlatformEmailCampaign"("createdAt");
CREATE INDEX "PlatformEmailCampaignRun_campaignId_idx" ON "PlatformEmailCampaignRun"("campaignId");
CREATE INDEX "PlatformEmailCampaignRun_runStatus_idx" ON "PlatformEmailCampaignRun"("runStatus");

ALTER TABLE "PlatformEmailCampaign"
    ADD CONSTRAINT "PlatformEmailCampaign_createdByUserId_fkey"
    FOREIGN KEY ("createdByUserId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "PlatformEmailCampaignRun"
    ADD CONSTRAINT "PlatformEmailCampaignRun_campaignId_fkey"
    FOREIGN KEY ("campaignId") REFERENCES "PlatformEmailCampaign"("campaignId") ON DELETE CASCADE ON UPDATE CASCADE;
