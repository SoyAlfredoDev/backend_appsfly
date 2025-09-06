-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('ADMIN', 'USER', 'GUEST');

-- CreateEnum
CREATE TYPE "public"."BusinessStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED', 'PENDING');

-- CreateEnum
CREATE TYPE "public"."BusinessEntity" AS ENUM ('INDIVIDUAL', 'COMPANY');

-- CreateEnum
CREATE TYPE "public"."UserGuestStatus" AS ENUM ('PENDIENT', 'ACCEPTED', 'REJECTED', 'DELETED');

-- CreateTable
CREATE TABLE "public"."User" (
    "userId" TEXT NOT NULL,
    "userFirstName" TEXT NOT NULL,
    "userLastName" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "userPassword" TEXT NOT NULL,
    "userLastConnection" TIMESTAMP(3),
    "userCodePhoneNumber" TEXT NOT NULL,
    "userPhoneNumber" TEXT NOT NULL,
    "userDocumentType" TEXT NOT NULL,
    "userDocumentNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "public"."Business" (
    "businessId" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "businessType" TEXT NOT NULL,
    "businessDocumentType" TEXT NOT NULL,
    "businessDocumentNumber" TEXT NOT NULL,
    "businessEmail" TEXT NOT NULL,
    "businessPhoneNumber" TEXT NOT NULL,
    "businessCodePhoneNumber" TEXT NOT NULL,
    "businessCountry" TEXT NOT NULL,
    "businessCodeWhatsappNumber" TEXT,
    "businessWhatsappNumber" TEXT,
    "businessEntity" "public"."BusinessEntity" NOT NULL,
    "businessStatus" "public"."BusinessStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Business_pkey" PRIMARY KEY ("businessId")
);

-- CreateTable
CREATE TABLE "public"."UserBusiness" (
    "userBusinessUserId" TEXT NOT NULL,
    "userBusinessBusinessId" TEXT NOT NULL,
    "userBusinessRole" "public"."Role" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserBusiness_pkey" PRIMARY KEY ("userBusinessUserId","userBusinessBusinessId")
);

-- CreateTable
CREATE TABLE "public"."UserGuest" (
    "userGuestId" TEXT NOT NULL,
    "userGuestEmail" TEXT NOT NULL,
    "userGuestUserId" TEXT NOT NULL,
    "userGuestBusinessId" TEXT NOT NULL,
    "userGuestRole" "public"."Role" NOT NULL,
    "userGuestStatus" "public"."UserGuestStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserGuest_pkey" PRIMARY KEY ("userGuestId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userEmail_key" ON "public"."User"("userEmail");

-- AddForeignKey
ALTER TABLE "public"."UserBusiness" ADD CONSTRAINT "UserBusiness_userBusinessUserId_fkey" FOREIGN KEY ("userBusinessUserId") REFERENCES "public"."User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserBusiness" ADD CONSTRAINT "UserBusiness_userBusinessBusinessId_fkey" FOREIGN KEY ("userBusinessBusinessId") REFERENCES "public"."Business"("businessId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserGuest" ADD CONSTRAINT "UserGuest_userGuestUserId_fkey" FOREIGN KEY ("userGuestUserId") REFERENCES "public"."User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserGuest" ADD CONSTRAINT "UserGuest_userGuestBusinessId_fkey" FOREIGN KEY ("userGuestBusinessId") REFERENCES "public"."Business"("businessId") ON DELETE RESTRICT ON UPDATE CASCADE;
