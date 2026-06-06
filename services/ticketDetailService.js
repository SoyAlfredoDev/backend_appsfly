import { PrismaClient as PrismaGeneral } from '../src/generated/general/index.js'

const general = new PrismaGeneral()

export const createTicketDetailService = async (data) => {
    try {
        const res = await general.ticketDetail.create({ data });
        return res
    }
    catch (error) {
        console.error("(ticketDetailService.js): Error creating ticket detail:", error);
        throw error;
    }
}