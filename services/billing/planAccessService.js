import { generalPrisma as general } from "../../dbGeneral.js";
import { getSubscriptionsByBusinessIdService } from "../subscriptionService.js";
import { isSeatAvailable, maxUsersForPlan, planIncludesCapability } from "./opticsPlanCatalog.ts";

function isCurrent(subscription, now) {
  if (!subscription?.subscriptionStatus) return false;
  if (!["ACTIVE", "CANCELLED"].includes(subscription.subscriptionStatus)) return false;
  const end = new Date(subscription.subscriptionEndDate ?? "");
  return !Number.isNaN(end.getTime()) && end > now;
}

export function currentPlanId(subscriptions, now = new Date()) {
  const current = (subscriptions ?? []).find((subscription) => isCurrent(subscription, now));
  return current?.subscriptionPlanId ?? null;
}

export async function businessHasCapability(businessId, capabilityId) {
  const subscriptions = await getSubscriptionsByBusinessIdService(businessId);
  return planIncludesCapability(currentPlanId(subscriptions), capabilityId);
}

export async function assertCanInviteUser(businessId) {
  const subscriptions = await getSubscriptionsByBusinessIdService(businessId);
  const planId = currentPlanId(subscriptions);
  const maxUsers = maxUsersForPlan(planId);
  const [members, pendingInvites] = await Promise.all([
    general.userBusiness.count({ where: { userBusinessBusinessId: businessId } }),
    general.userGuest.count({
      where: { userGuestBusinessId: businessId, userGuestStatus: "PENDIENT" },
    }),
  ]);
  if (!isSeatAvailable({ maxUsers, occupied: members + pendingInvites })) {
    const error = new Error(
      `Este plan permite hasta ${maxUsers} usuario${maxUsers === 1 ? "" : "s"}.`,
    );
    error.code = "SEAT_LIMIT_REACHED";
    error.statusCode = 403;
    throw error;
  }
}
