import { generalPrisma } from "../../dbGeneral.js";
import type { PrismaClient } from "../../src/generated/general/index.js";
const general = generalPrisma as PrismaClient;
import type { Prisma } from "../../src/generated/general/index.js";
import {
  assertChargeMatches,
  paidPeriodEnd,
  assertDeferredStart,
} from "./subscriptionLifecycle.js";

export function jsonObject(value: unknown): Prisma.JsonObject {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Prisma.JsonObject)
    : {};
}

export type Preapproval = {
  id: string;
  status: string;
  external_reference?: string;
  auto_recurring?: { transaction_amount?: number; currency_id?: string; start_date?: string };
};

/** Authorization is a mandate, never evidence that money was received. */
export async function registerRecurringAuthorization(paymentId: string, remote: Preapproval) {
  return general.$transaction(async (tx) => {
    await tx.$queryRaw`SELECT "subscriptionPaymentId" FROM "SubscriptionPayment" WHERE "subscriptionPaymentId" = ${paymentId} FOR UPDATE`;
    const payment = await tx.subscriptionPayment.findUniqueOrThrow({
      where: { subscriptionPaymentId: paymentId },
      include: { plan: true },
    });
    const metadata = jsonObject(payment.metadata);
    if (
      remote.external_reference !== (payment.externalReference || paymentId) ||
      (metadata.mpPreapprovalId && metadata.mpPreapprovalId !== remote.id)
    ) {
      throw new Error("PREAPPROVAL_REFERENCE_MISMATCH");
    }
    assertChargeMatches({
      status: "approved",
      amount: Number(remote.auto_recurring?.transaction_amount),
      currency: remote.auto_recurring?.currency_id || "",
      expectedAmount: payment.amount,
      expectedCurrency: payment.currency,
    });
    const agreedStart =
      typeof metadata.firstChargeAt === "string" ? new Date(metadata.firstChargeAt) : null;
    assertDeferredStart(agreedStart?.toISOString() || null, remote.auto_recurring?.start_date);
    if (remote.status !== "authorized")
      return { payment, subscription: null, alreadyProcessed: false };
    const subscriptionId = payment.subscriptionId || String(metadata.pendingSubscriptionId || "");
    if (!subscriptionId) throw new Error("PENDING_SUBSCRIPTION_MISSING");
    let subscription = await tx.subscription.findUnique({ where: { subscriptionId } });
    if (subscription && subscription.subscriptionBusinessId !== payment.subscriptionBusinessId)
      throw new Error("SUBSCRIPTION_TENANT_MISMATCH");
    if (!subscription) {
      const start = agreedStart || new Date();
      subscription = await tx.subscription.create({
        data: {
          subscriptionId,
          subscriptionBusinessId: payment.subscriptionBusinessId,
          subscriptionPlanId: payment.subscriptionPlanId,
          subscriptionStartDate: start,
          subscriptionEndDate: start,
          subscriptionDuration: payment.plan.planDuration,
          subscriptionStatus: "PENDIENT",
          subscriptionAmount: payment.amount,
          subscriptionPaymentMethod: "MercadoPago",
          subscriptionPlanFeatures: payment.plan.planFeatures as Prisma.InputJsonValue,
          createdByUserId: payment.createdByUserId,
          mpPreapprovalId: remote.id,
          mpPreapprovalStatus: remote.status,
          autoRenewEnabled: true,
        },
      });
    }
    // Late authorization events cannot reactivate a cancelled mandate or extend access.
    const updated = await tx.subscriptionPayment.update({
      where: { subscriptionPaymentId: paymentId },
      data: {
        subscriptionId,
        metadata: {
          ...metadata,
          mpPreapprovalId: remote.id,
          mpPreapprovalStatus: remote.status,
          authorizationRecordedAt: metadata.authorizationRecordedAt || new Date().toISOString(),
          billingVersion: 2,
        },
      },
    });
    return {
      payment: updated,
      subscription,
      alreadyProcessed: Boolean(payment.subscriptionId),
      authorizationOnly: updated.status !== "APPROVED",
      firstChargeAt: agreedStart?.toISOString() || null,
    };
  });
}

export type VerifiedCharge = {
  id: string;
  invoiceId: string;
  preapprovalId: string;
  externalReference: string;
  status: string;
  amount: number;
  currency: string;
  dueDate: Date;
};

/** Lock + receipt + entitlement in one transaction, shared by webhook and reconciliation. */
export async function settleRecurringCharge(charge: VerifiedCharge) {
  return general.$transaction(async (tx) => {
    await tx.$queryRaw`SELECT "subscriptionId" FROM "Subscription" WHERE "mpPreapprovalId" = ${charge.preapprovalId} FOR UPDATE`;
    const subscription = await tx.subscription.findUniqueOrThrow({
      where: { mpPreapprovalId: charge.preapprovalId },
      include: { plan: true },
    });
    const origin = await tx.subscriptionPayment.findUniqueOrThrow({
      where: { subscriptionPaymentId: charge.externalReference },
    });
    if (
      origin.subscriptionId !== subscription.subscriptionId ||
      origin.subscriptionBusinessId !== subscription.subscriptionBusinessId
    )
      throw new Error("PAYMENT_TENANT_MISMATCH");
    assertChargeMatches({
      status: charge.status,
      amount: charge.amount,
      currency: charge.currency,
      expectedAmount: subscription.subscriptionAmount,
      expectedCurrency: origin.currency,
    });
    const existing = await tx.subscriptionPayment.findFirst({
      where: { mpPaymentId: charge.id, status: "APPROVED" },
    });
    if (existing) {
      if (existing.subscriptionId !== subscription.subscriptionId)
        throw new Error("PAYMENT_ALREADY_ASSIGNED");
      return { subscription, payment: existing, duplicate: true };
    }
    const originMeta = jsonObject(origin.metadata);
    const firstChargeAt =
      typeof originMeta.firstChargeAt === "string" ? new Date(originMeta.firstChargeAt) : null;
    const end = paidPeriodEnd({
      dueDate: charge.dueDate,
      currentEnd: subscription.subscriptionEndDate,
      months: subscription.subscriptionDuration,
      firstChargeAt,
    });
    const updated = await tx.subscription.update({
      where: { subscriptionId: subscription.subscriptionId },
      data: {
        subscriptionEndDate: end,
        subscriptionStatus: end > new Date() ? "ACTIVE" : "EXPIRED",
      },
    });
    const metadata = {
      source: "webhook_renewal",
      billingVersion: 2,
      authorizedPaymentId: charge.invoiceId,
      dueDate: charge.dueDate.toISOString(),
      entitlementEnd: end.toISOString(),
      paymentStatus: charge.status,
    };
    // Complete the pending checkout, rather than counting mandate and first charge as two payments.
    const payment = !origin.mpPaymentId
      ? await tx.subscriptionPayment.update({
          where: { subscriptionPaymentId: origin.subscriptionPaymentId },
          data: {
            status: "APPROVED",
            mpPaymentId: charge.id,
            amount: charge.amount,
            metadata: { ...originMeta, ...metadata, source: "webhook_activation" },
          },
        })
      : await tx.subscriptionPayment.create({
          data: {
            subscriptionPaymentId: `mp-charge-${charge.id}`,
            subscriptionId: subscription.subscriptionId,
            subscriptionBusinessId: subscription.subscriptionBusinessId,
            subscriptionPlanId: subscription.subscriptionPlanId,
            amount: charge.amount,
            currency: charge.currency,
            paymentMethod: "MERCADO_PAGO",
            status: "APPROVED",
            mpPaymentId: charge.id,
            externalReference: charge.externalReference,
            createdByUserId: subscription.createdByUserId,
            metadata,
          },
        });
    return { subscription: updated, payment, duplicate: false };
  });
}
