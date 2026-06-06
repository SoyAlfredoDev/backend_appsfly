import { getTicketsService } from '../services/ticketService.js';

export default async function defineticketNumber(prisma) {
  try {
    const ticketsCount = await getTicketsService(prisma);
    const nextTicket = Number(ticketsCount.length) + 1;
    const letter = 't'
    return `${letter}${nextTicket}`;
  } catch (error) {
    console.error('Error defining ticket number:', error);
    throw error;
  }
};