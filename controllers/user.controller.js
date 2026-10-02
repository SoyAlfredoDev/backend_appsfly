import {
  getUsers,
  validateUserRutExists,
  getUserById,
  updateUserConfirmEmail,
} from "../services/usersService.js";
import userSuperAdmin from "../superAdmin.js";
import { isUserPlatformOwner } from "../middlewares/platformOwnerMiddleware.js";
import { sendConfirmEmail } from "../emails/dispatchers/confirmEmail.dispatcher.js";
import { canUserViewUser } from "../services/userBusinessService.js";
import { verifyEmailConfirmationToken } from "../services/auth/emailConfirmationToken.js";
import { toPublicUser, toPublicUsers } from "../services/auth/publicUser.js";
export const getUsersController = async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).json(toPublicUsers(users));
  } catch (error) {
    console.error("(user.controller.js): Error getting users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const validateRutExists = async (req, res) => {
  try {
    const { rut } = req.params;
    const rutExists = await validateUserRutExists(rut);
    res.status(200).json({ rutExists });
  } catch (error) {
    console.error("(user.controller.js): Error validating user RUT:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const requesterId = req.user?.payload?.id;
    const canView =
      userSuperAdmin.includes(requesterId) ||
      (requesterId && (await canUserViewUser(requesterId, id)));
    if (!canView) {
      return res.status(403).json({
        message: "No tienes acceso a este usuario.",
        code: "USER_FORBIDDEN",
      });
    }
    const user = await getUserById(id);
    if (user) {
      res.status(200).json(toPublicUser(user));
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("(user.controller.js): Error getting user by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const userIsSuperAdminController = (req, res) => {
  try {
    const userId = req.user.payload.id;
    if (!userId) return res.status(200).json({ isSuperAdmin: false });
    if (userSuperAdmin.includes(userId)) {
      res.status(200).json({ isSuperAdmin: true });
    } else {
      res.status(200).json({ isSuperAdmin: false });
    }
  } catch (error) {
    console.error("(user.controller.js): Error checking super admin status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const userIsPlatformOwnerController = async (req, res) => {
  try {
    const userId = req.user?.payload?.id;
    if (!userId) {
      return res.status(200).json({ isPlatformOwner: false });
    }
    const isPlatformOwner = await isUserPlatformOwner(userId);
    return res.status(200).json({ isPlatformOwner });
  } catch (error) {
    console.error("(user.controller.js): Error checking platform owner:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const sendUserConfirmEmailController = async (req, res) => {
  try {
    const { id } = req.params;
    const requesterId = req.user?.payload?.id;

    if (!requesterId || requesterId !== id) {
      return res.status(403).json({ message: "No tienes permiso para enviar este correo." });
    }

    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.userConfirmEmail) {
      return res.status(409).json({ message: "El correo ya está confirmado." });
    }

    await sendConfirmEmail({
      to: user.userEmail,
      userId: user.userId,
      firstName: user.userFirstName,
      lastName: user.userLastName,
    });

    return res.status(200).json({ message: "Correo de confirmación enviado.", emailSent: true });
  } catch (error) {
    console.error("(user.controller.js): Error sending confirm email:", error);
    return res.status(500).json({ message: "No se pudo enviar el correo de confirmación." });
  }
};

export const updateUserConfirmEmailController = async (req, res) => {
  try {
    const { id } = req.params;
    const tokenUserId = verifyEmailConfirmationToken(req.body?.token);
    if (tokenUserId !== id) {
      return res.status(403).json({
        message: "El enlace de confirmación no es válido.",
        code: "INVALID_EMAIL_CONFIRMATION_TOKEN",
      });
    }
    const user = await updateUserConfirmEmail(id);
    if (user) {
      res.status(200).json(toPublicUser(user));
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("(user.controller.js): Error updating user confirm email:", error);
    const status = error?.code === "INVALID_EMAIL_CONFIRMATION_TOKEN" ? 403 : 500;
    res.status(status).json({
      message:
        status === 403
          ? "El enlace de confirmación expiró o no es válido."
          : "Internal server error",
      code: status === 403 ? "INVALID_EMAIL_CONFIRMATION_TOKEN" : "INTERNAL_ERROR",
    });
  }
};

export const countUsersController = async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).json(users.length);
  } catch (error) {
    console.error("(user.controller.js): Error counting users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
