import { PrismaClient as PrismaGeneral } from '../src/generated/general/index.js'

const general = new PrismaGeneral();

export const createSubscriptionService = async (data) => {
    try {
        const res = await general.subscription.create({ data });
        return res;
    } catch (error) {
        console.error("(service/subscriptionService.js): Error creating subscription:", error);
        throw error;
    }
};

export const getSubscriptionsByBusinessIdService = async (businessId) => {
    // debo validar que este activo y no este vencido 
    try {
        const subscription = await general.subscription.findMany({
            where: { subscriptionBusinessId: businessId },
        });
        return subscription;
    } catch (error) {
        console.error("(service/subscriptionService.js): Error getting subscription by businessId:", error);
        throw error;
    }
};

export const getAllSubscriptionsService = async () => {
    try {
        const subscriptions = await general.subscription.findMany();
        return subscriptions;
    } catch (error) {
        console.error("(service/subscriptionService.js): Error getting all subscriptions:", error);
        throw error;
    }
};

export const getAdminSubscriptionsService = async () => {
    try {
        return await general.subscription.findMany({
            include: {
                business: {
                    select: {
                        businessId: true,
                        businessName: true,
                        businessStatus: true,
                    },
                },
                plan: {
                    select: {
                        planId: true,
                        planName: true,
                        planPrice: true,
                        planDuration: true,
                    },
                },
            },
            orderBy: { subscriptionEndDate: "asc" },
        });
    } catch (error) {
        console.error("(subscriptionService.js): Error getting admin subscriptions:", error);
        throw error;
    }
};