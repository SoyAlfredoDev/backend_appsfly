import { createUserBusiness, getUserBusinessById } from '../services/userBusinessService.js'
import { createUserBusinessDB } from '../services/businessDB/usersServices.js'
import { getUserById } from '../services/usersService.js'


export const createUserBusinessController = async (req, res) => {
    try {
        const { userBusinessUserId, userBusinessBusinessId, userBusinessRole } = req.body;

        const data = {
            userBusinessUserId,
            userBusinessBusinessId,
            userBusinessRole
        }
        const userfound = await getUserById(userBusinessUserId)

        // created relation user_business in general table
        const userBusiness = await createUserBusiness(data)

        //created user in business table

        const userBusinessDB = {
            userId: userfound.userId,
            userFirstName: userfound.userFirstName,
            userLastName: userfound.userLastName,
            userEmail: userfound.userEmail,
            userLastConnection: userfound.userLastConnection,
            userCodePhoneNumber: userfound.userCodePhoneNumber,
            userPhoneNumber: userfound.userPhoneNumber,
            userDocumentType: userfound.userDocumentType,
            userDocumentNumber: userfound.userDocumentNumber,
            createdAt: userfound.createdAt,
            updatedAt: userfound.updatedAt,
            userRole: "ADMIN"
        }

        const user = await createUserBusinessDB(userBusinessDB, req.prisma)

        res.status(201).json(userBusiness, user)
    } catch (error) {
        console.error('>>>>>> (userBusiness.controller.js) Error creating userbusiness:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
}

export const getUserBusinessByIdController = async (req, res) => {
    try {
        const userId = req.user.payload.id;
        const user = await getUserBusinessById(userId);
        res.status(200).json(user);
    } catch (error) {
        console.error("(userBusiness.controller.js): Error getting user in business table:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
