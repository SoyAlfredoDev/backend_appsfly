import { PrismaClient as PrismaGeneral } from "../src/generated/general/index.js";

const general = new PrismaGeneral();

export const createUserGuest = async (data) => {
    try {
        return await general.userGuest.create({ data });
    } catch (error) {
        console.error(">>>> userGuestService.js: Error creating user guest:", error);
        throw error;
    }
};

export const getUserGuestById = async (userGuestId) => {
    return general.userGuest.findUnique({
        where: { userGuestId },
        include: {
            Business: { select: { businessId: true, businessName: true } },
            User: { select: { userId: true, userFirstName: true, userLastName: true } },
        },
    });
};

export const findPendingInvite = async (email, businessId) => {
    return general.userGuest.findFirst({
        where: {
            userGuestEmail: email.toLowerCase(),
            userGuestBusinessId: businessId,
            userGuestStatus: "PENDIENT",
        },
    });
};

export const userGuestExists = async (email) => {
    try {
        return await general.userGuest.findMany({
            where: {
                userGuestEmail: email.toLowerCase(),
                userGuestStatus: "PENDIENT",
            },
            include: {
                User: {
                    select: {
                        userId: true,
                        userFirstName: true,
                        userLastName: true,
                    },
                },
                Business: {
                    select: {
                        businessId: true,
                        businessName: true,
                    },
                },
            },
        });
    } catch (error) {
        console.error(">>>> userGuestService.js: Error checking if user guest exists:", error);
        throw error;
    }
};

export const userGuestResponseService = async (userGuestId, userGuestStatus) => {
    try {
        return await general.userGuest.update({
            where: { userGuestId },
            data: { userGuestStatus },
        });
    } catch (error) {
        console.error(">>>> userGuestService.js: Error updating user guest:", error);
        throw error;
    }
};

export const getUserGuests = async () => {
    try {
        return await general.userGuest.findMany();
    } catch (error) {
        console.error(">>>> userGuestService.js: Error getting user guests:", error);
        throw error;
    }
};

export const getUserGuestByBusinessIdService = async (businessId) => {
    try {
        return await general.userGuest.findMany({
            where: {
                userGuestBusinessId: businessId,
                userGuestStatus: { not: "DELETED" },
            },
            orderBy: { createdAt: "desc" },
        });
    } catch (error) {
        console.error(">>>> userGuestService.js: Error getting user guest by business id:", error);
        throw error;
    }
};

export const assertUserBusinessMembership = async (userId, businessId) => {
    return general.userBusiness.findFirst({
        where: {
            userBusinessUserId: userId,
            userBusinessBusinessId: businessId,
        },
    });
};

export const findUserBusinessMembership = async (userId, businessId) => {
    return general.userBusiness.findFirst({
        where: {
            userBusinessUserId: userId,
            userBusinessBusinessId: businessId,
        },
    });
};

export const findUserByEmail = async (email) => {
    return general.user.findUnique({
        where: { userEmail: email.toLowerCase() },
        select: { userId: true, userEmail: true },
    });
};
