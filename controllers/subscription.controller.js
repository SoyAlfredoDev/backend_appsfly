import { getSubscriptionsByBusinessIdService, createSubscriptionService } from '../services/subscriptionService.js';
import { getPlanById } from '../services/planService.js';

export const checkActiveSubscription = async (req, res) => {
    const businessId = req.params.businessId;

    try {
        const subscription = await getSubscriptionsByBusinessIdService(businessId);
        if (!subscription) {
            return res.status(404).json({ message: 'No subscription found for this business.' });
        }
        return res.status(200).json(subscription);
    } catch (error) {
        console.error("Error checking active subscription:", error);
        return res.status(500).json({ message: "Server error checking subscription" });
    }
};

export const createSubscriptionController = async (req, res) => {
    try {
        const { subscriptionId, subscriptionBusinessId, subscriptionPlanId, subscriptionPaymentMethod = null } = req.body;
        const userId = req.user.payload.id;

        const planSelected = await getPlanById(subscriptionPlanId);
        const subscriptionDuration = planSelected.planDuration;
        const subscriptionAmount = planSelected.planPrice;
        const subscriptionPlanFeatures = planSelected.planFeatures;

        let subscriptionStartDate = null;
        let subscriptionEndDate = null;
        let subscriptionStatus = null;
        let paymentMethod = null;


        // Si NO es el plan gratuito
        if (subscriptionPlanId !== 'P001') {
            paymentMethod = subscriptionPaymentMethod;
            subscriptionStartDate = new Date();
            subscriptionEndDate = new Date(subscriptionStartDate);
            subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + subscriptionDuration);
            subscriptionStatus = 'ACTIVE';

        } else {
            // Plan gratuito (promoción)
            subscriptionStartDate = new Date();
            subscriptionEndDate = new Date(subscriptionStartDate);
            subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + subscriptionDuration);
            subscriptionStatus = 'ACTIVE';
            paymentMethod = 'FreeMonths';
            subscriptionPlanFeatures
        }

        const data = {
            subscriptionId,
            subscriptionBusinessId,
            subscriptionPlanId,
            subscriptionStartDate,
            subscriptionEndDate,
            subscriptionDuration,
            subscriptionStatus,
            subscriptionAmount,
            subscriptionPlanFeatures,
            subscriptionPaymentMethod: paymentMethod,
            createdByUserId: userId
        };
        console.log("Creating subscription with data:", data);

        const subscription = await createSubscriptionService(data);

        return res.status(201).json(subscription);

    } catch (error) {
        console.error("Error creating subscription:", error);
        return res.status(500).json({ message: "Server error creating subscription" });
    }
};
