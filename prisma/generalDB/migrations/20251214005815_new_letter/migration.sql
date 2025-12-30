-- CreateTable
CREATE TABLE "newsletterSubscriber" (
    "newsletterSubscriberId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "newsletterSubscriber_pkey" PRIMARY KEY ("newsletterSubscriberId")
);
