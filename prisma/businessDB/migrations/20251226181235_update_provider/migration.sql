/*
  Warnings:

  - You are about to drop the column `providerDocummentType` on the `Provider` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Provider" DROP COLUMN "providerDocummentType",
ADD COLUMN     "providerDocumentType" TEXT;
