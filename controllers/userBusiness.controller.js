import { createUserBusinessService, getUserBusinessById } from '../services/userBusinessService.js';

export const createUserBusinessController = async (req, res) => {
    try {
        const { userBusinessBusinessId, userBusinessRole, } = req.body;
        const userBusinessUserId = req.user.payload.id;
        //register relation user and business at generalDB/userBusiness
        const newUserBusiness = await createUserBusinessService({ userBusinessUserId, userBusinessBusinessId, userBusinessRole })
        if (!newUserBusiness) {
            res.status(400).json({ error: 'Failed to create user-business relationship.' })
            throw new Error('Failed to create user-business relationship.')
        };
        res.status(201).json(newUserBusiness);
    } catch (error) {
        console.error('>>>>>> (userBusiness.controller.js) Error creating userbusiness:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
};

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