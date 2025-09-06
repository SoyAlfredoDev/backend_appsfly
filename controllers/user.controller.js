import { getUsers, validateUserRutExists } from "../services/usersService.js";

export const getUsersController = async (req, res) => {
    try {
        const users = await getUsers();
        res.status(200).json(users)

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

