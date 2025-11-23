import { PrismaClient } from "../../src/generated/business/index.js";

// register user-business in businessDB
export const registerUserBusinessServiceBusinessDB = async (data, prismaURL) => {
    try {
        const prisma = new PrismaClient({
            datasources: {
                db: { url: prismaURL }
            },
        });
        const userBusiness = await prisma.user.create({ data })
        return userBusiness
    } catch (error) {
        console.error('>>>>>> (userBusinessService.js)_ Error creating userbusiness:', error)
        throw error
    }
}
