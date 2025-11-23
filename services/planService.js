import { PrismaClient as PrismaGeneral } from '../src/generated/general/index.js';
const general = new PrismaGeneral();

export const getPlanById = async (planId) => {
    try {
        const plan = await general.plan.findUnique({ where: { planId } });
        console.log("(service/planService.js): Fetched plan by ID:", plan);
        return plan;
    } catch (error) {
        console.error("(service/planService.js): Error fetching plan by ID:", error);
        throw error;
    }
};