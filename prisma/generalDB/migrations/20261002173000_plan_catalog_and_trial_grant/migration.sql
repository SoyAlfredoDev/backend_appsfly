ALTER TABLE "Plan"
ADD COLUMN "planBusinessType" TEXT,
ADD COLUMN "planTier" TEXT,
ADD COLUMN "planCapabilities" JSONB,
ADD COLUMN "planListPriceUf" DECIMAL(8,3),
ADD COLUMN "planOfferPriceUf" DECIMAL(8,3),
ADD COLUMN "planOfferEndsAt" TIMESTAMP(3);

ALTER TABLE "Subscription"
ADD COLUMN "subscriptionCapabilities" JSONB,
ADD COLUMN "subscriptionPriceUf" DECIMAL(8,3);

CREATE TABLE "BusinessTrialGrant" (
    "businessId" TEXT NOT NULL,
    "subscriptionId" TEXT NOT NULL,
    "grantedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "BusinessTrialGrant_pkey" PRIMARY KEY ("businessId")
);

CREATE UNIQUE INDEX "BusinessTrialGrant_subscriptionId_key" ON "BusinessTrialGrant"("subscriptionId");

ALTER TABLE "BusinessTrialGrant"
ADD CONSTRAINT "BusinessTrialGrant_businessId_fkey"
FOREIGN KEY ("businessId") REFERENCES "Business"("businessId") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "BusinessTrialGrant"
ADD CONSTRAINT "BusinessTrialGrant_subscriptionId_fkey"
FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("subscriptionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Preserve evidence for any existing P001 promotional subscriptions.
INSERT INTO "BusinessTrialGrant" ("businessId", "subscriptionId", "grantedAt")
SELECT DISTINCT ON ("subscriptionBusinessId")
    "subscriptionBusinessId", "subscriptionId", "createdAt"
FROM "Subscription"
WHERE "subscriptionPlanId" IN ('P001', 'OPT-TRIAL')
ORDER BY "subscriptionBusinessId", "createdAt", "subscriptionId";

CREATE TABLE "SubscriptionUfReprice" (
    "id" TEXT NOT NULL,
    "subscriptionId" TEXT NOT NULL,
    "billingDate" TEXT NOT NULL,
    "priceUf" DECIMAL(8,3) NOT NULL,
    "ufValueClp" DECIMAL(12,2) NOT NULL,
    "netAmountClp" INTEGER NOT NULL,
    "totalAmountClp" INTEGER NOT NULL,
    "previousAmountClp" INTEGER NOT NULL,
    "mpPreapprovalId" TEXT NOT NULL,
    "mpNextPaymentDate" TIMESTAMP(3) NOT NULL,
    "appliedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SubscriptionUfReprice_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "SubscriptionUfReprice_subscriptionId_billingDate_key"
ON "SubscriptionUfReprice"("subscriptionId", "billingDate");

ALTER TABLE "SubscriptionUfReprice"
ADD CONSTRAINT "SubscriptionUfReprice_subscriptionId_fkey"
FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("subscriptionId") ON DELETE RESTRICT ON UPDATE CASCADE;
