/*
  Warnings:

  - Added the required column `ticketDetailOrigin` to the `TicketDetail` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TicketDetailOrigin" AS ENUM ('CUSTOMER', 'APPSFLY');

-- AlterTable
ALTER TABLE "TicketDetail" ADD COLUMN     "ticketDetailOrigin" "TicketDetailOrigin" NOT NULL;
