import { PrismaClient as PrismaGeneral } from '../src/generated/general/index.js'

const general = new PrismaGeneral()

// register user-business in generalDB
export const createUserBusinessService = async (data) => {
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
        console.error("--(usersBusinessService.js): Error getting user in business table:", error);
        throw error;
    }
};

/** Miembros activos de un negocio (GeneralDB UserBusiness + User). */
export const getBusinessMembersService = async (businessId) => {
    try {
        const rows = await general.userBusiness.findMany({
            where: { userBusinessBusinessId: businessId },
            include: {
                User: {
                    select: {
                        userId: true,
                        userFirstName: true,
                        userLastName: true,
                        userEmail: true,
                        userCodePhoneNumber: true,
                        userPhoneNumber: true,
                        userDocumentType: true,
                        userDocumentNumber: true,
                    },
                },
            },
            orderBy: { createdAt: "asc" },
        });

        return rows.map((row) => ({
            userId: row.User.userId,
            userFirstName: row.User.userFirstName,
            userLastName: row.User.userLastName,
            userEmail: row.User.userEmail,
            userRole: row.userBusinessRole,
            userCodePhoneNumber: row.User.userCodePhoneNumber,
            userPhoneNumber: row.User.userPhoneNumber,
            userDocumentType: row.User.userDocumentType,
            userDocumentNumber: row.User.userDocumentNumber,
            joinedAt: row.createdAt,
        }));
    } catch (error) {
        console.error("(userBusinessService.js): Error getting business members:", error);
        throw error;
    }
};

export const assertUserBelongsToBusiness = async (userId, businessId) => {
    return general.userBusiness.findFirst({
        where: {
            userBusinessUserId: userId,
            userBusinessBusinessId: businessId,
        },
    });
};

