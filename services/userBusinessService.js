import { PrismaClient as PrismaGeneral } from '../src/generated/general/index.js'

const general = new PrismaGeneral()

export const createUserBusiness = async (data) => {
    try {
        const userBusiness = await general.userBusiness.create({ data })
        return userBusiness
    } catch (error) {
        console.error('>>>>>> (userBusinessService.js)_ Error creating userbusiness:', error)
        throw error
    }
}

export const getUserBusinessById = async (userId) => {
    // get user from business table 
    try {
        const user = await general.userBusiness.findMany({
            where: {
                userBusinessUserId: userId
            }
        });
        return user || [];
    } catch (error) {
        console.error("(usersService.js): Error getting user in business table:", error);
        throw error;
    }
};

