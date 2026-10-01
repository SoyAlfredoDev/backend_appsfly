import { registerUserBusinessServiceBusinessDB } from "../../services/businessDB/userBusiness.js";
import { getUsersBusinessDB } from "../../services/businessDB/usersServices.js";
import { getPrismaForBusinessId } from "../../db.js";
import { getUserById } from "../../services/usersService.js";
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
    const tenantPrisma = await getPrismaForBusinessId(businessId);
    if (!tenantPrisma) {
      return null;
    }
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
      userRole: userRole,
    };
    const newUserBusiness = await registerUserBusinessServiceBusinessDB(data, tenantPrisma);
    if (!newUserBusiness) {
      console.error(
        ">>>>>> (userBusiness.controller.js) Failed to create user-business relationship.",
      );
      return null;
    }
    return newUserBusiness;
  } catch (error) {
    console.error(">>>>>> (userBusiness.controller.js) Error creating userbusiness:", error);
    throw error;
  }
};
