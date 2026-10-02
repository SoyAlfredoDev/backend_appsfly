import type { NextFunction, Request, Response } from "express";
import { hasPlanCapability } from "../services/subscription/planPolicy.js";

type TenantRequest = Request & {
  tenantSubscription?: { subscriptionCapabilities?: unknown };
};

export function requirePlanCapability(capability: string) {
  return (req: TenantRequest, res: Response, next: NextFunction) => {
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
