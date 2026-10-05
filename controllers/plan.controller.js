import { getAllPlansService } from '../services/planService.js';
import { checkoutUrlForPlan } from '../services/billing/opticsPlanCatalog.ts';

export const getPlans = async (req, res) => {
    try {
        const plans = await getAllPlansService({ activeOnly: true });
        return res.json(
            plans.map((plan) => ({
                ...plan,
                checkoutUrl: checkoutUrlForPlan(plan.planId),
            })),
        );
    } catch (error) {
        console.error("(controllers/plan.controller.js): Error getting plans:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
