-- Existing businesses remain on their current dedicated databases.
CREATE TYPE "TenantDatabaseMode" AS ENUM ('SHARED', 'DEDICATED');
CREATE TYPE "TenantDatabaseStatus" AS ENUM ('UNASSIGNED', 'PROVISIONING', 'ACTIVE', 'MIGRATING', 'FAILED');

ALTER TABLE "Business"
ADD COLUMN "businessDatabaseMode" "TenantDatabaseMode" NOT NULL DEFAULT 'DEDICATED',
ADD COLUMN "businessDatabaseStatus" "TenantDatabaseStatus" NOT NULL DEFAULT 'UNASSIGNED',
ADD COLUMN "businessDatabaseSecretRef" TEXT,
ADD COLUMN "businessSchemaVersion" TEXT;

UPDATE "Business"
SET "businessDatabaseStatus" = CASE
    WHEN "businessConnectionDB" IS NOT NULL THEN 'ACTIVE'::"TenantDatabaseStatus"
    ELSE 'UNASSIGNED'::"TenantDatabaseStatus"
END;

ALTER TABLE "Plan"
ADD COLUMN "planDatabaseMode" "TenantDatabaseMode" NOT NULL DEFAULT 'SHARED';

CREATE INDEX "Business_businessDatabaseMode_businessDatabaseStatus_idx"
ON "Business"("businessDatabaseMode", "businessDatabaseStatus");
