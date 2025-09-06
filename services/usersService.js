import { PrismaClient as PrismaGeneral } from '../src/generated/general/index.js'

const general = new PrismaGeneral()

export const createUser = async (data) => {
    try {
        const res = await general.user.create({ data });
        return res
    } catch (error) {
        console.error("(usersService.js): Error creating user:", error);
        throw error;
    }
}

export const getUserByEmail = async (email) => {
    try {
        const user = await general.user.findFirst({
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

export const getUserById = async (id) => {
    try {
        const user = await general.user.findFirst({
            where: {
                userId: id
            }
        });
        return user;
    } catch (error) {
        console.error("(usersService.js): Error getting user:", error);
        throw error;
    }
}

export const getUsers = async () => {
    try {
        const res = await general.user.findMany()
        return res
    } catch (error) {
        console.error("(usersService.js): Error getting user:", error);
        throw error;
    }

}

export const validateUserRutExists = async (rut) => {
    try {
        const user = await general.user.findFirst({
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

