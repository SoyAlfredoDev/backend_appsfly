/*
  Warnings:

  - Added the required column `createdByUserId` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdByUserId` to the `TicketDetail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "createdByUserId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TicketDetail" ADD COLUMN     "createdByUserId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketDetail" ADD CONSTRAINT "TicketDetail_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
