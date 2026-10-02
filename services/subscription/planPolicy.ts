export type PlanCapabilities = {
  modules: string[];
  maxUsers: number;
  maxBranches: number;
};

type PlanRecord = {
  planId?: string;
  planTier?: string | null;
  planBusinessType?: string | null;
  planOfferPriceUf?: unknown;
  planListPriceUf?: unknown;
  planOfferEndsAt?: Date | string | null;
};

export function isTrialPlan(plan: PlanRecord): boolean {
  return plan.planTier === "TRIAL" || plan.planId === "P001";
}

export function planMatchesBusinessType(plan: PlanRecord, businessType: string): boolean {
  return !plan.planBusinessType || plan.planBusinessType === businessType;
}

export function contractedUfPrice(plan: PlanRecord, at: Date = new Date()): number | null {
  const list = Number(plan.planListPriceUf);
  if (!Number.isFinite(list) || list <= 0) return null;
  const offer = Number(plan.planOfferPriceUf);
  const endsAt = plan.planOfferEndsAt ? new Date(plan.planOfferEndsAt) : null;
  if (
    Number.isFinite(offer) &&
    offer > 0 &&
    endsAt &&
    !Number.isNaN(endsAt.getTime()) &&
    at < endsAt
  ) {
    return offer;
  }
  return list;
}

export function readPlanCapabilities(value: unknown): PlanCapabilities | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const candidate = value as Record<string, unknown>;
  const modules = candidate.modules;
  const maxUsers = candidate.maxUsers;
  const maxBranches = candidate.maxBranches;
  if (!Array.isArray(modules) || !modules.every((module) => typeof module === "string"))
    return null;
  if (!Number.isInteger(maxUsers) || Number(maxUsers) < 1) return null;
  if (!Number.isInteger(maxBranches) || Number(maxBranches) < 1) return null;
  return { modules, maxUsers: Number(maxUsers), maxBranches: Number(maxBranches) };
}

export function hasPlanCapability(value: unknown, capability: string): boolean {
  // Legacy subscriptions predate structured capabilities and keep their contracted access.
  if (value === null || value === undefined) return true;
  const policy = readPlanCapabilities(value);
  return policy?.modules.includes(capability) ?? false;
}
