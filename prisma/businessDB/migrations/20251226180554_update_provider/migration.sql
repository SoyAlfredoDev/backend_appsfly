/*
  Warnings:

  - You are about to drop the column `providerTypeDocumment` on the `Provider` table. All the data in the column will be lost.
  - Made the column `providerName` on table `Provider` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Provider" DROP COLUMN "providerTypeDocumment",
ADD COLUMN     "providerDocummentType" TEXT,
ALTER COLUMN "providerName" SET NOT NULL;
