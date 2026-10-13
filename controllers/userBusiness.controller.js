import {
  getUserBusinessById,
  getBusinessMembersService,
  assertUserBelongsToBusiness,
} from "../services/userBusinessService.js";

// Memberships are created only by business provisioning or verified invitations.
export const createUserBusinessController = async (_req, res) => {
  return res.status(403).json({
    error: "Usa una invitación del administrador para acceder a un negocio.",
    code: "MEMBERSHIP_SELF_ASSIGNMENT_FORBIDDEN",
  });
};

export const getUserBusinessByIdController = async (req, res) => {
  try {
    const userId = req.user.payload.id;
    const user = await getUserBusinessById(userId);
    return res.status(200).json(user);
  } catch (error) {
    console.error("(userBusiness.controller.js): Error getting user in business table:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getBusinessMembersController = async (req, res) => {
  try {
    const { businessId } = req.params;
    const userId = req.user.payload.id;

    if (!businessId) {
      return res.status(400).json({ message: "Negocio no especificado." });
    }

    const membership = await assertUserBelongsToBusiness(userId, businessId);
    if (!membership) {
      return res.status(403).json({ message: "No tienes acceso a este negocio." });
    }

    const members = await getBusinessMembersService(businessId);
    return res.status(200).json(members);
  } catch (error) {
    console.error("(userBusiness.controller.js): Error listing business members:", error);
    return res.status(500).json({ message: "Error al listar usuarios del negocio." });
  }
};
