import {
    getBusinessSettingsForUser,
    updateBusinessSettingsForUser,
} from "../services/businessSettingsService.js";

export const getBusinessSettingsController = async (req, res) => {
    try {
        const userId = req.user.payload.id;
        const { businessId } = req.params;
        const settings = await getBusinessSettingsForUser(userId, businessId);
        res.status(200).json(settings);
    } catch (error) {
        const status = error.statusCode ?? 500;
        if (status >= 500) {
            console.error("(businessSettings.controller):", error);
        }
        res.status(status).json({
            error: error.message ?? "Error interno del servidor",
            code: error.code,
        });
    }
};

export const updateBusinessSettingsController = async (req, res) => {
    try {
        const userId = req.user.payload.id;
        const { businessId } = req.params;
        const settings = await updateBusinessSettingsForUser(
            userId,
            businessId,
            req.body,
        );
        res.status(200).json(settings);
    } catch (error) {
        const status = error.statusCode ?? 500;
        if (status >= 500) {
            console.error("(businessSettings.controller):", error);
        }
        res.status(status).json({
            error: error.message ?? "Error interno del servidor",
            code: error.code,
        });
    }
};
