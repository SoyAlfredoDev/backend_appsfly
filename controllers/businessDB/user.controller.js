import { getUsersBusinessDB } from '../../services/businessDB/usersServices.js';
// Get all users 
export const getUsersControllerBusinessDB = async (req, res) => {
    try {
        const users = await getUsersBusinessDB(req.prisma);
        res.status(200).json(users);
    } catch (error) {
        console.error("(controller/businessDB/user.controller.js): Error getting users:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
