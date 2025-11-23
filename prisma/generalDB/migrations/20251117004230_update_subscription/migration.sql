/*
  Warnings:

  - You are about to drop the column `status` on the `Subscription` table. All the data in the column will be lost.
  - Added the required column `createdByUserId` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subscriptionAmount` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subscriptionDuration` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subscriptionPaymentMethod` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subscriptionPlanFeatures` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subscriptionStatus` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'CANCELLED', 'EXPIRED', 'PENDIENT');

-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "status",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdByUserId" TEXT NOT NULL,
ADD COLUMN     "subscriptionAmount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "subscriptionDuration" INTEGER NOT NULL,
ADD COLUMN     "subscriptionPaymentMethod" TEXT NOT NULL,
ADD COLUMN     "subscriptionPlanFeatures" JSONB NOT NULL,
ADD COLUMN     "subscriptionStatus" "SubscriptionStatus" NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
