import { generalPrisma as general } from "../dbGeneral.js";



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