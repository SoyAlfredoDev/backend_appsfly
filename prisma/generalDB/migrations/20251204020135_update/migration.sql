-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "ticketAssociatedTo" TEXT[];

-- AlterTable
ALTER TABLE "TicketDetail" ADD COLUMN     "ticketAssociatedTo" TEXT[];
