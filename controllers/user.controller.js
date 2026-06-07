import { getUsers, validateUserRutExists, getUserById, updateUserConfirmEmail } from "../services/usersService.js";
import userSuperAdmin from '../superAdmin.js';
import { sendConfirmEmail } from "../emails/dispatchers/confirmEmail.dispatcher.js";
export const getUsersController = async (req, res) => {
    try {
        const users = await getUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error("(user.controller.js): Error getting users:", error);
        res.status(500).json({ message: "Internal server error" });

    }

}

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
        const user = await getUserById(id);
        if (user) {
            res.status(200).json(user);
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
}

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
        const user = await updateUserConfirmEmail(id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error("(user.controller.js): Error updating user confirm email:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const countUsersController = async (req, res) => {
    try {
        const users = await getUsers();
        res.status(200).json(users.length);
    } catch (error) {
        console.error("(user.controller.js): Error counting users:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


