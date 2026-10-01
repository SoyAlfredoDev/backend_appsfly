import { generalPrisma as general } from "../dbGeneral.js";



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
