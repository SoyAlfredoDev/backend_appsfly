/*
  Warnings:

  - The `ticketDetailImage` column on the `TicketDetail` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "TicketDetail" DROP COLUMN "ticketDetailImage",
ADD COLUMN     "ticketDetailImage" TEXT[];
