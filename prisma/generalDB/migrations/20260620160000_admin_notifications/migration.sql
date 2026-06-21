-- Notificaciones admin + soporte envío automático mensual

CREATE TYPE "PlatformAdminNotificationType" AS ENUM (
    'CAMPAIGN_SUCCESS',
    'CAMPAIGN_FAILED',
    'CAMPAIGN_SKIPPED',
    'CAMPAIGN_AUTO_RUN'
);

CREATE TABLE "PlatformAdminNotification" (
    "notificationId" TEXT NOT NULL,
    "notificationType" "PlatformAdminNotificationType" NOT NULL DEFAULT 'CAMPAIGN_SUCCESS',
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "payload" JSONB,
    "campaignId" TEXT,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PlatformAdminNotification_pkey" PRIMARY KEY ("notificationId")
);

CREATE INDEX "PlatformAdminNotification_isRead_idx" ON "PlatformAdminNotification"("isRead");
CREATE INDEX "PlatformAdminNotification_createdAt_idx" ON "PlatformAdminNotification"("createdAt");
