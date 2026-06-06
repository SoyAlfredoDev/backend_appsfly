import { PrismaClient as PrismaGeneral } from '../src/generated/general/index.js'

const general = new PrismaGeneral()

export const subscribe = async (email) => {
    try {
        const res = await general.newsletterSubscriber.create({
            data: {
                email
            }
        });
        return res;
    } catch (error) {
        console.error("(newsletterService.js): Error subscribing:", error);
        throw error;
    }
}
