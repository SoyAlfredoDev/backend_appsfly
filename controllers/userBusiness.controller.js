import {
    createUserBusinessService,
    getUserBusinessById,
    getBusinessMembersService,
    assertUserBelongsToBusiness,
} from '../services/userBusinessService.js';

export const createUserBusinessController = async (req, res) => {
    try {
        const { userBusinessBusinessId, userBusinessRole } = req.body;
        const userBusinessUserId = req.user.payload.id;
        const newUserBusiness = await createUserBusinessService({
            userBusinessUserId,
            userBusinessBusinessId,
            userBusinessRole,
        });
        if (!newUserBusiness) {
            return res.status(400).json({ error: 'Failed to create user-business relationship.' });
        }
        return res.status(201).json(newUserBusiness);
    } catch (error) {
        console.error('>>>>>> (userBusiness.controller.js) Error creating userbusiness:', error);
        if (error?.code === 'P2002') {
            return res.status(409).json({ message: 'La relación usuario-negocio ya existe.' });
        }
        return res.status(500).json({ error: 'Internal server error' });
    }
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
