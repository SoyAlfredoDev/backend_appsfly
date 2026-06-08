-- CreateTable: historial campañas ASMR (TenantDB)
CREATE TABLE "AsmrCampaign" (
    "campaignId" TEXT NOT NULL,
    "campaignName" TEXT NOT NULL,
    "campaignType" TEXT NOT NULL,
    "auditMonth" INTEGER NOT NULL,
    "auditYear" INTEGER NOT NULL,
    "sourceMonth" INTEGER NOT NULL,
    "sourceYear" INTEGER NOT NULL,
    "discountPercent" INTEGER NOT NULL DEFAULT 20,
    "messageSent" TEXT,
    "contactsSuccess" INTEGER NOT NULL DEFAULT 0,
    "universeTotal" INTEGER NOT NULL DEFAULT 0,
    "excludedRepurchase" INTEGER NOT NULL DEFAULT 0,
    "eligibleBeforeDedup" INTEGER NOT NULL DEFAULT 0,
    "eligibleFinal" INTEGER NOT NULL DEFAULT 0,
    "phonesDeduplicated" INTEGER NOT NULL DEFAULT 0,
    "campaignStatus" TEXT NOT NULL DEFAULT 'SENT',
    "createdByUserId" TEXT NOT NULL,
    "executedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AsmrCampaign_pkey" PRIMARY KEY ("campaignId")
);

CREATE INDEX "AsmrCampaign_createdAt_idx" ON "AsmrCampaign"("createdAt" DESC);
CREATE INDEX "AsmrCampaign_auditYear_auditMonth_idx" ON "AsmrCampaign"("auditYear", "auditMonth");

ALTER TABLE "AsmrCampaign" ADD CONSTRAINT "AsmrCampaign_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
