import { registerUserBusinessServiceBusinessDB } from '../../services/businessDB/userBusiness.js';
import { getUsersBusinessDB } from '../../services/businessDB/usersServices.js';
import { getConnectionDBServicio } from '../../services/businessService.js';
import { getUserById } from '../../services/usersService.js';
// Get all users 
export const getUsersControllerBusinessDB = async (req, res) => {
    try {
        const users = await getUsersBusinessDB(req.prisma);
        res.status(200).json(users);
    } catch (error) {
        console.error("(controller/businessDB/user.controller.js): Error getting users:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
// Register user-business in businessDB
export const registerUserBusinessAtBusinessDB = async (userId, businessId, userRole) => {
    try {
        const user = await getUserById(userId);
        const prismaURL = await getConnectionDBServicio(businessId);
        if (!prismaURL) {
            return null;
        };
        const data = {
            userId,
            userFirstName: user.userFirstName,
            userLastName: user.userLastName,
            userEmail: user.userEmail,
            userLastConnection: null,
            userCodePhoneNumber: user.userCodePhoneNumber,
            userPhoneNumber: user.userPhoneNumber,
            userDocumentType: user.userDocumentType,
            userDocumentNumber: user.userDocumentNumber,
            userRole: userRole
        }
        const newUserBusiness = await registerUserBusinessServiceBusinessDB(data, prismaURL);
        if (!newUserBusiness) {
            console.error('>>>>>> (userBusiness.controller.js) Failed to create user-business relationship.');
            return null;
        };
        return newUserBusiness;
    } catch (error) {
        console.error('>>>>>> (userBusiness.controller.js) Error creating userbusiness:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
};

