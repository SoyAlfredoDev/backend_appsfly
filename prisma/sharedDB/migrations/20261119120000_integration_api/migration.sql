CREATE TABLE "IntegrationOperation" (
  "businessId" TEXT NOT NULL DEFAULT current_setting('app.current_business_id', true),
  "id" TEXT PRIMARY KEY,
  "kind" TEXT NOT NULL,
  "externalId" TEXT NOT NULL,
  "digest" TEXT NOT NULL,
  "result" JSONB NOT NULL,
  "keyId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE UNIQUE INDEX "IntegrationOperation_businessId_kind_externalId_key" ON "IntegrationOperation"("businessId", "kind", "externalId");
CREATE INDEX "IntegrationOperation_businessId_createdAt_idx" ON "IntegrationOperation"("businessId", "createdAt");

CREATE UNIQUE INDEX "IntegrationOperation_businessId_id_key" ON "IntegrationOperation"("businessId", "id");
ALTER TABLE "IntegrationOperation" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "IntegrationOperation" FORCE ROW LEVEL SECURITY;
CREATE POLICY "tenant_isolation_IntegrationOperation" ON "IntegrationOperation"
  USING ("businessId" = current_setting('app.current_business_id', true))
  WITH CHECK ("businessId" = current_setting('app.current_business_id', true));
GRANT SELECT, INSERT ON "IntegrationOperation" TO appsfly_runtime;
