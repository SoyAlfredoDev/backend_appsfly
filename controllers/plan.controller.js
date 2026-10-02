import { getAllPlansService } from '../services/planService.js';

export const getPlans = async (req, res) => {
    try {
        const plans = await getAllPlansService({ activeOnly: false });
        return res.json(plans.filter((plan) => plan.planActive !== false || ['OPT-START', 'OPT-STANDARD'].includes(plan.planId)));
    } catch (error) {
        console.error("(controllers/plan.controller.js): Error getting plans:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
