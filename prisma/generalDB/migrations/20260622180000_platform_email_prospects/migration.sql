-- Prospectos para campaña de outreach + audiencia PLATFORM_PROSPECTS
CREATE TYPE "PlatformEmailProspectStatus" AS ENUM ('ACTIVE', 'UNSUBSCRIBED');

CREATE TABLE "PlatformEmailProspect" (
    "prospectId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "companyName" TEXT,
    "status" "PlatformEmailProspectStatus" NOT NULL DEFAULT 'ACTIVE',
    "unsubscribeToken" TEXT NOT NULL,
    "unsubscribedAt" TIMESTAMP(3),
    "source" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlatformEmailProspect_pkey" PRIMARY KEY ("prospectId")
);

CREATE UNIQUE INDEX "PlatformEmailProspect_email_key" ON "PlatformEmailProspect"("email");
CREATE UNIQUE INDEX "PlatformEmailProspect_unsubscribeToken_key" ON "PlatformEmailProspect"("unsubscribeToken");
CREATE INDEX "PlatformEmailProspect_status_idx" ON "PlatformEmailProspect"("status");
CREATE INDEX "PlatformEmailProspect_email_idx" ON "PlatformEmailProspect"("email");

ALTER TYPE "PlatformEmailAudienceType" ADD VALUE IF NOT EXISTS 'PLATFORM_PROSPECTS';
