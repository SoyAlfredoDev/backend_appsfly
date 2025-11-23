-- CreateTable
CREATE TABLE "Plan" (
    "planId" TEXT NOT NULL,
    "planName" TEXT NOT NULL,
    "planFeatures" JSONB NOT NULL,
    "planPrice" DOUBLE PRECISION NOT NULL,
    "planDuration" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("planId")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "subscriptionId" TEXT NOT NULL,
    "subscriptionBusinessId" TEXT NOT NULL,
    "subscriptionPlanId" TEXT NOT NULL,
    "subscriptionStartDate" TIMESTAMP(3) NOT NULL,
    "subscriptionEndDate" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("subscriptionId")
);

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_subscriptionPlanId_fkey" FOREIGN KEY ("subscriptionPlanId") REFERENCES "Plan"("planId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_subscriptionBusinessId_fkey" FOREIGN KEY ("subscriptionBusinessId") REFERENCES "Business"("businessId") ON DELETE RESTRICT ON UPDATE CASCADE;
