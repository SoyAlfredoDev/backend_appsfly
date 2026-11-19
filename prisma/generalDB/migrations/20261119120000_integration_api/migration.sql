CREATE TABLE "IntegrationKey" (
  "id" TEXT PRIMARY KEY,
  "businessId" TEXT NOT NULL REFERENCES "Business"("businessId") ON DELETE CASCADE ON UPDATE CASCADE,
  "createdBy" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "digest" TEXT NOT NULL,
  "scopes" TEXT[],
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "lastUsedAt" TIMESTAMP(3),
  "revokedAt" TIMESTAMP(3),
  "windowStart" TIMESTAMP(3),
  "windowCount" INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX "IntegrationKey_businessId_createdAt_idx" ON "IntegrationKey"("businessId", "createdAt");
