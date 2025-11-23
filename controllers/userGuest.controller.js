import { createUserGuest, userGuestExists, userGuestResponseService, getUserGuests } from '../services/userGuestService.js'
import { registerUserBusinessAtBusinessDB } from '../controllers/businessDB/user.controller.js'

export const createUserGuestController = async (req, res) => {
    try {
        const { userGuestId, userGuestEmail, userGuestBusinessId, userGuestRole, userGuestStatus } = req.body;
        const userId = req.user.payload.id

        const data = {
            userGuestId,
            userGuestEmail: userGuestEmail.toLowerCase(),
            userGuestBusinessId,
            userGuestRole,
            userGuestUserId: userId,
            userGuestStatus
        }
        const userGuest = await createUserGuest(data)
        return res.status(201).json(userGuest)
    } catch (error) {
        console.error(">>>> userGuest.controller.js:  Error creating user guest:", error)
        return res.status(500).json({ error: "Internal Server Error" })
    }
};

export const userGuestExistsController = async (req, res) => {
    try {
        const { email } = req.params;
        const userGuest = await userGuestExists(email);
        return res.status(200).json(userGuest);
    } catch (error) {
        console.error(">>>> userGuest.controller.js:  Error checking if user guest exists:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const userGuestResponseController = async (req, res) => {
    try {
        const { userGuestId, response, userGuestRole } = req.body;
        const userId = req.user.payload.id;
        const userGuestResponse = response;
        const userGuest = await userGuestResponseService(userGuestId, userGuestResponse);
        if (response === 'ACCEPTED') {
            try {
                const user = await registerUserBusinessAtBusinessDB(userId, userGuest.userGuestBusinessId, userGuestRole);
                userGuest.registeredUserBusiness = user;
            } catch (error) {
                console.error(">>>> userGuest.controller.js:  Error registering user at business DB:", error);
            }
        }
        return res.status(200).json(userGuest);
    } catch (error) {
        console.error(">>>> userGuest.controller.js:  Error updating user guest:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getUserGuestsController = async (req, res) => {
    try {
        const userGuests = await getUserGuests();
        return res.status(200).json(userGuests);
    } catch (error) {
        console.error(">>>> userGuest.controller.js:  Error getting user guests:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
