import { PrismaClient as PrismaGeneral } from '../src/generated/general/index.js'
const general = new PrismaGeneral()

export const getBusinessService = async () => {
    try {
        return await general.business.findMany();
    } catch (error) {
        console.error("Error getting business:", error);
        throw error;
    }
}

export const createBusinessService = async (data) => {
    try {
        const res = await general.business.create({ data });
        return res;
    } catch (error) {
        console.error("(businessService.js): Error creating business:", error);
        throw error;
    }
}

export const updateBusinessByIdService = async (businessId, data) => {
    try {
        const res = await general.business.update({
            where: { businessId },
            data
        });
        return res;
    } catch (error) {
        console.error("Error getting business by ID:", error);
        throw error;
    }
}

export const getConnectionDBServicio = async (businessId) => {
    try {
        const res = await general.business.findUnique({
            where: { businessId },
            select: { businessConnectionDB: true }
        });
        return res ? res.businessConnectionDB : null;
    } catch (error) {
        console.error("Error getting connection DB:", error);
        throw error;
    }
};

export const getBusinessByIdService = async (businessId) => {
    try {
        const res = await general.business.findUnique({
            where: { businessId }
        });
        return res ? res : null;
    } catch (error) {
        console.error("Error getting business by ID:", error);
        throw error;
    }
};
