
export const createUserBusinessDB = async (data, prisma) => {
    try {
        const res = await prisma.user.create({ data });
        return res;
    } catch (error) {
        console.error(">>> /services/businessDB/usersService.js: Error creating user business db:", error);
        throw error;
    }
}

export const getUserByEmailBusinessDB = async (email, prisma) => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                userEmail: email
            }
        });
        return user;
    } catch (error) {
        console.error("(usersService.js): Error getting user:", error);
        throw error;
    }
}

export const getUsersBusinessDB = async (prisma) => {
    try {
        const res = await prisma.user.findMany({
            select: {
                userId: true,
                userFirstName: true,
                userLastName: true,
                userEmail: true,
                userLastConnection: true,
                userCodePhoneNumber: true,
                userPhoneNumber: true,
                userDocumentType: true,
                userDocumentNumber: true,
                userRole: true
            }
        });
        return res;
    } catch (error) {
        console.error("(usersService.js): Error getting user:", error);
        throw error;
    }

}

export const validateUserRutExistsBusinessDB = async (rut, prisma) => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                userDocumentNumber: rut
            }
        });
        return !!user;
    } catch (error) {
        console.error("(usersService.js): Error validating user RUT:", error);
        throw error;
    }
}