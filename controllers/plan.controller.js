import { getAllPlansService } from '../services/planService.js';

export const getPlans = async (req, res) => {
    try {
        const plans = await getAllPlansService();
        return res.json(plans);
    } catch (error) {
        console.error("(controllers/plan.controller.js): Error getting plans:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
