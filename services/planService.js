import { PrismaClient as PrismaGeneral } from '../src/generated/general/index.js';

const general = new PrismaGeneral();

export const getPlanById = async (planId) => {
    try {
        const plan = await general.plan.findUnique({ where: { planId } });
        return plan;
    } catch (error) {
        console.error("(service/planService.js): Error fetching plan by ID:", error);
        throw error;
    }
};

export const getAllPlansService = async ({ activeOnly = false } = {}) => {
    try {
        const plans = await general.plan.findMany({
            orderBy: { createdAt: 'desc' },
        });
        if (!activeOnly) return plans;
        return plans.filter((p) => p.planActive !== false);
    } catch (error) {
        console.error("(service/planService.js): Error fetching all plans:", error);
        throw error;
    }
};

export const countSubscriptionsByPlanId = async (planId) => {
    return general.subscription.count({
        where: { subscriptionPlanId: planId },
    });
};

export const createPlanService = async (data) => {
    try {
        return await general.plan.create({ data });
    } catch (error) {
        console.error("(service/planService.js): Error creating plan:", error);
        throw error;
    }
};

export const updatePlanService = async (planId, data) => {
    try {
        return await general.plan.update({
            where: { planId },
            data,
        });
    } catch (error) {
        console.error("(service/planService.js): Error updating plan:", error);
        throw error;
    }
};

export const deletePlanService = async (planId) => {
    try {
        return await general.plan.delete({ where: { planId } });
    } catch (error) {
        console.error("(service/planService.js): Error deleting plan:", error);
        throw error;
    }
};
