-- Conversión de prospectos a usuarios registrados (atribución outreach)

ALTER TYPE "PlatformEmailProspectStatus" ADD VALUE 'CONVERTED';

ALTER TABLE "PlatformEmailProspect"
    ADD COLUMN IF NOT EXISTS "convertedUserId" TEXT,
    ADD COLUMN IF NOT EXISTS "convertedAt" TIMESTAMP(3),
    ADD COLUMN IF NOT EXISTS "outreachEmailsSent" INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN IF NOT EXISTS "firstOutreachAt" TIMESTAMP(3),
    ADD COLUMN IF NOT EXISTS "lastOutreachAt" TIMESTAMP(3);

CREATE INDEX IF NOT EXISTS "PlatformEmailProspect_convertedUserId_idx"
    ON "PlatformEmailProspect"("convertedUserId");
