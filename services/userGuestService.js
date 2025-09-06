import { PrismaClient as PrismaGeneral } from '../src/generated/general/index.js'

const general = new PrismaGeneral()

export const createUserGuest = async (data) => {
    try {
        return await general.userGuest.create({ data })
    } catch (error) {
        console.error(">>>> userGuestService.js:  Error creating user guest:", error)
        throw error
    }
}

export const userGuestExists = async (email) => {
    try {
        return await general.userGuest.findMany({
            where: { userGuestEmail: email.toLowerCase(), userGuestStatus: 'PENDIENT' },
            include: {
                User: {
                    select: {
                        userId: true,
                        userFirstName: true,
                        userLastName: true
                    }
                },
                Business: {
                    select: {
                        businessId: true,
                        businessName: true
                    }
                }
            }
        });
    } catch (error) {
        console.error(">>>> userGuestService.js:  Error checking if user guest exists:", error);
        throw error;
    }
};

export const userGuestUpdateAccept = async (userGuestId) => {
    try {
        return await general.userGuest.update({
            where: {
                userGuestId: userGuestId
            },
            data: {
                userGuestStatus: 'ACCEPTED'
            }
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
