-- CreateEnum
CREATE TYPE "SubscriptionPaymentMethod" AS ENUM ('MERCADO_PAGO', 'PROMO_FREE_TRIAL');

-- CreateEnum
CREATE TYPE "SubscriptionPaymentStatus" AS ENUM ('APPROVED', 'PENDING', 'REJECTED');

-- CreateTable
CREATE TABLE "SubscriptionPayment" (
    "subscriptionPaymentId" TEXT NOT NULL,
    "subscriptionId" TEXT,
    "subscriptionBusinessId" TEXT NOT NULL,
    "subscriptionPlanId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'CLP',
    "paymentMethod" "SubscriptionPaymentMethod" NOT NULL,
    "status" "SubscriptionPaymentStatus" NOT NULL,
    "externalReference" TEXT,
    "mpPreferenceId" TEXT,
    "mpPaymentId" TEXT,
    "metadata" JSONB,
    "createdByUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubscriptionPayment_pkey" PRIMARY KEY ("subscriptionPaymentId")
);

-- CreateIndex
CREATE INDEX "SubscriptionPayment_subscriptionBusinessId_idx" ON "SubscriptionPayment"("subscriptionBusinessId");

-- CreateIndex
CREATE INDEX "SubscriptionPayment_status_idx" ON "SubscriptionPayment"("status");

-- CreateIndex
CREATE INDEX "SubscriptionPayment_createdAt_idx" ON "SubscriptionPayment"("createdAt");

-- AddForeignKey
ALTER TABLE "SubscriptionPayment" ADD CONSTRAINT "SubscriptionPayment_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("subscriptionId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscriptionPayment" ADD CONSTRAINT "SubscriptionPayment_subscriptionBusinessId_fkey" FOREIGN KEY ("subscriptionBusinessId") REFERENCES "Business"("businessId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscriptionPayment" ADD CONSTRAINT "SubscriptionPayment_subscriptionPlanId_fkey" FOREIGN KEY ("subscriptionPlanId") REFERENCES "Plan"("planId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscriptionPayment" ADD CONSTRAINT "SubscriptionPayment_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
