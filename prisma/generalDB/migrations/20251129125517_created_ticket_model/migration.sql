-- CreateEnum
CREATE TYPE "TicketStatus" AS ENUM ('RESOLVED', 'IN_PROGRESS', 'PENDING', 'URGENT');

-- CreateEnum
CREATE TYPE "TicketType" AS ENUM ('SUPPORT', 'SUGGESTION', 'REQUEST');

-- CreateTable
CREATE TABLE "Ticket" (
    "ticketId" TEXT NOT NULL,
    "ticketType" "TicketType" NOT NULL,
    "ticketStatus" "TicketStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("ticketId")
);

-- CreateTable
CREATE TABLE "TicketDetail" (
    "ticketDetailId" TEXT NOT NULL,
    "ticketId" TEXT NOT NULL,
    "ticketDetailContent" TEXT NOT NULL,
    "ticketDetailImage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TicketDetail_pkey" PRIMARY KEY ("ticketDetailId")
);

-- AddForeignKey
ALTER TABLE "TicketDetail" ADD CONSTRAINT "TicketDetail_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("ticketId") ON DELETE RESTRICT ON UPDATE CASCADE;
