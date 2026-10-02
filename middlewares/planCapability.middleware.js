// Generated from middlewares/planCapability.middleware.ts by npm run build:runtime.
import { hasPlanCapability } from "../services/subscription/planPolicy.js";
export function requirePlanCapability(capability) {
    return (req, res, next) => {
        if (!req.tenantSubscription) {
            return res
                .status(402)
                .json({ code: "SUBSCRIPTION_REQUIRED", error: "Se requiere una suscripción vigente." });
        }
        if (!hasPlanCapability(req.tenantSubscription.subscriptionCapabilities, capability)) {
            return res.status(403).json({
                code: "PLAN_FEATURE_UNAVAILABLE",
                error: "Esta función no está incluida en el plan del negocio.",
            });
        }
        next();
    };
}
