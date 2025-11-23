-- AlterTable
ALTER TABLE "User" ALTER COLUMN "userCodePhoneNumber" DROP NOT NULL,
ALTER COLUMN "userPhoneNumber" DROP NOT NULL,
ALTER COLUMN "userDocumentType" DROP NOT NULL,
ALTER COLUMN "userDocumentNumber" DROP NOT NULL;
