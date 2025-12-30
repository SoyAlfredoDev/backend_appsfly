import { PrismaClient as PrismaGeneral } from '../src/generated/general/index.js'

const general = new PrismaGeneral()

export const createTicketService = async (data) => {
    try {
        const res = await general.ticket.create({ data });
        return res
    }
    catch (error) {
        console.error("(ticketService.js): Error creating ticket:", error);
        throw error;
    }
}

export const getTicketsService = async () => {
    try {
        const res = await general.ticket.findMany({
            include: {
                createdBy: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return res;
    } catch (error) {
        console.error("(ticketService.js): Error getting tickets:", error);
        throw error;
    }
}

export const getTicketByIdService = async (id) => {
    try {
        const res = await general.ticket.findUnique({
            where: { ticketId: id }
        });
        return res;
    } catch (error) {
        console.error("(ticketService.js): Error getting ticket by ID:", error);
        throw error;
    }
}