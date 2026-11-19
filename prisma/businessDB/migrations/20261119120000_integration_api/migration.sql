CREATE TABLE "IntegrationOperation" (
  "id" TEXT PRIMARY KEY,
  "kind" TEXT NOT NULL,
  "externalId" TEXT NOT NULL,
  "digest" TEXT NOT NULL,
  "result" JSONB NOT NULL,
  "keyId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE UNIQUE INDEX "IntegrationOperation_kind_externalId_key" ON "IntegrationOperation"("kind", "externalId");
CREATE INDEX "IntegrationOperation_createdAt_idx" ON "IntegrationOperation"("createdAt");
