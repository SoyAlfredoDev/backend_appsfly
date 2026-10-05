import { planIncludesCapability } from "../billing/opticsPlanCatalog.js";

/** Citas: prueba Pro, Pro, Élite y los planes pagos históricos P002 y P003. Start no las incluye. */
export const APPOINTMENTS_PLAN_IDS = ["P001", "P002", "P003", "P006", "P007"] as const;

export const SLOT_OCCUPYING_STATUSES = ["PENDING", "CONFIRMED", "RESCHEDULED"] as const;

/** Filtro por defecto del panel. Reagendada sigue visible y sigue ocupando la hora. */
export const ACTIVE_INBOX_STATUSES = ["PENDING", "CONFIRMED", "RESCHEDULED"] as const;

const ACTIVE_SUBSCRIPTION_STATUSES = new Set(["ACTIVE", "CANCELLED"]);

export type SubscriptionSnapshot = {
  subscriptionPlanId?: string | null;
  subscriptionStatus?: string | null;
  subscriptionEndDate?: string | Date | null;
};

export type AppointmentNoticeKind =
  "requested" | "confirmed" | "cancelled" | "rescheduled" | "completed";

export function isSubscriptionCurrentlyActive(
  subscription: SubscriptionSnapshot | null | undefined,
  now: Date = new Date(),
): boolean {
  if (!subscription?.subscriptionStatus) return false;
  if (!ACTIVE_SUBSCRIPTION_STATUSES.has(subscription.subscriptionStatus)) return false;
  const end = new Date(subscription.subscriptionEndDate ?? "");
  return !Number.isNaN(end.getTime()) && end > now;
}

export function canUseAppointmentsPlan(planId: string | null | undefined): boolean {
  return planIncludesCapability(planId, "appointments");
}

/**
 * Basta con que una suscripción vigente incluya citas.
 * La prueba P001 incluye las funciones de Pro.
 */
export function hasAppointmentsPlan(
  subscriptions: SubscriptionSnapshot[] | null | undefined,
  now: Date = new Date(),
): boolean {
  return (subscriptions ?? []).some(
    (subscription) =>
      isSubscriptionCurrentlyActive(subscription, now) &&
      canUseAppointmentsPlan(subscription.subscriptionPlanId),
  );
}

export function normalizeConcurrentSlots(value: unknown): number {
  const parsed = typeof value === "number" ? value : Number(value);
  if (!Number.isInteger(parsed) || parsed < 1) return 1;
  return Math.min(parsed, 20);
}

export function isSlotOpen(overlappingCount: number, maxConcurrent: unknown): boolean {
  return overlappingCount < normalizeConcurrentSlots(maxConcurrent);
}

/** Mover la hora no cambia el estado: confirmada sigue confirmada y sigue en el panel. */
export function statusAfterTimeChange(currentStatus: string): string {
  return currentStatus;
}

export function appointmentNoticeKind(input: {
  startsAtChanged: boolean;
  status?: string | null;
}): AppointmentNoticeKind | null {
  if (input.startsAtChanged) return "rescheduled";
  if (input.status === "CONFIRMED") return "confirmed";
  if (input.status === "CANCELLED") return "cancelled";
  if (input.status === "COMPLETED") return "completed";
  return null;
}
