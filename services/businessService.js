import { PrismaClient as PrismaGeneral } from '../src/generated/general/index.js'
const general = new PrismaGeneral()

export const getBusiness = async () => {
    try {
        return await general.business.findMany();
    } catch (error) {
        console.error("Error getting business:", error);
        throw error;
    }
}

export const createBusiness = async (data) => {
    try {
        const res = await general.business.create({ data });
        return res;
    } catch (error) {
        console.error("(businessService.js): Error creating business:", error);
        throw error;
    }
}