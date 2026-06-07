-- Auditoría de cancelaciones + marca de baja en suscripción
ALTER TABLE "Subscription"
ADD COLUMN "subscriptionCancelledAt" TIMESTAMP(3);

CREATE TABLE "SubscriptionCancellation" (
    "subscriptionCancellationId" TEXT NOT NULL,
    "subscriptionId" TEXT NOT NULL,
    "subscriptionBusinessId" TEXT NOT NULL,
    "subscriptionPlanId" TEXT NOT NULL,
    "cancelledByUserId" TEXT NOT NULL,
    "mpPreapprovalId" TEXT,
    "planName" TEXT NOT NULL,
    "planAmount" DOUBLE PRECISION NOT NULL,
    "planCurrency" TEXT NOT NULL DEFAULT 'CLP',
    "accessValidUntil" TIMESTAMP(3) NOT NULL,
    "confirmationPhrase" TEXT NOT NULL,
    "cancelReason" TEXT,
    "source" TEXT NOT NULL DEFAULT 'PROFILE_SELF_SERVICE',
    "requestIp" TEXT,
    "requestUserAgent" TEXT,
    "mpResponseSnapshot" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SubscriptionCancellation_pkey" PRIMARY KEY ("subscriptionCancellationId")
);

CREATE INDEX "SubscriptionCancellation_subscriptionBusinessId_idx" ON "SubscriptionCancellation"("subscriptionBusinessId");
CREATE INDEX "SubscriptionCancellation_subscriptionId_idx" ON "SubscriptionCancellation"("subscriptionId");
CREATE INDEX "SubscriptionCancellation_cancelledByUserId_idx" ON "SubscriptionCancellation"("cancelledByUserId");
CREATE INDEX "SubscriptionCancellation_createdAt_idx" ON "SubscriptionCancellation"("createdAt");

ALTER TABLE "SubscriptionCancellation" ADD CONSTRAINT "SubscriptionCancellation_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("subscriptionId") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "SubscriptionCancellation" ADD CONSTRAINT "SubscriptionCancellation_subscriptionBusinessId_fkey" FOREIGN KEY ("subscriptionBusinessId") REFERENCES "Business"("businessId") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "SubscriptionCancellation" ADD CONSTRAINT "SubscriptionCancellation_cancelledByUserId_fkey" FOREIGN KEY ("cancelledByUserId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
