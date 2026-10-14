import { generalPrisma } from "../../dbGeneral.js";
import type { PrismaClient } from "../../src/generated/general/index.js";
const general = generalPrisma as PrismaClient;
import {
  getMercadoPagoAuthorizedPayment,
  getMercadoPagoPayment,
  getMercadoPagoPreapproval,
} from "../mercadopago/mpApiClient.js";
import {
  jsonObject,
  registerRecurringAuthorization,
  settleRecurringCharge,
  type Preapproval,
} from "./recurringSettlement.js";
import { deliverBillingNotice } from "./billingNotifications.js";

export async function processRecurringAuthorization(id: string) {
  const remote = (await getMercadoPagoPreapproval(id)) as Preapproval;
  if (String(remote.id) !== id || !remote.external_reference)
    throw new Error("PREAPPROVAL_REFERENCE_MISSING");
  if (remote.status === "authorized") {
    const result = await registerRecurringAuthorization(remote.external_reference, remote);
    if (result.subscription && result.authorizationOnly) {
      await deliverBillingNotice(
        result.payment.subscriptionPaymentId,
        "authorized",
        result.subscription.subscriptionStartDate,
        true,
      );
    }
    return { processed: true, reason: "SUBSCRIPTION_AUTHORIZED", ...result };
  }
  // Update only this mandate. A stale cancellation must not expire a replacement plan.
  const subscription = await general.subscription.findUnique({ where: { mpPreapprovalId: id } });
  if (!subscription) return { processed: false, reason: "SUBSCRIPTION_NOT_FOUND" };
  if (["cancelled", "canceled", "paused"].includes(remote.status)) {
    await general.$transaction(async (tx) => {
      await tx.$queryRaw`SELECT "subscriptionId" FROM "Subscription" WHERE "subscriptionId" = ${subscription.subscriptionId} FOR UPDATE`;
      const current = await tx.subscription.findUniqueOrThrow({
        where: { subscriptionId: subscription.subscriptionId },
      });
      await tx.subscription.update({
        where: { subscriptionId: subscription.subscriptionId },
        data: {
          mpPreapprovalStatus: remote.status,
          autoRenewEnabled: false,
          subscriptionCancelledAt: current.subscriptionCancelledAt || new Date(),
          subscriptionStatus:
            current.subscriptionStatus === "PENDIENT"
              ? "INACTIVE"
              : current.subscriptionEndDate > new Date()
                ? "CANCELLED"
                : "EXPIRED",
        },
      });
      // Cancel the pending checkout as well so the business may contract again.
      await tx.subscriptionPayment.updateMany({
        where: { subscriptionId: subscription.subscriptionId, status: "PENDING" },
        data: { status: "REJECTED" },
      });
    });
  }
  return { processed: true, reason: "MANDATE_STATUS_UPDATED" };
}

export async function processRecurringInvoice(id: string) {
  const invoice = await getMercadoPagoAuthorizedPayment(id);
  const preapprovalId = String(invoice.preapproval_id || "");
  const paymentId = invoice.payment?.id || invoice.payment_id;
  if (!preapprovalId || !paymentId)
    return { processed: true, reason: "SUBSCRIPTION_PAYMENT_PENDING" };
  // Invoice processed/authorized is not payment approved. Fetch the actual payment.
  const charge = await getMercadoPagoPayment(String(paymentId));
  if (String(charge.id) !== String(paymentId)) throw new Error("PAYMENT_ID_MISMATCH");
  const remote = (await getMercadoPagoPreapproval(preapprovalId)) as Preapproval;
  const reference = String(remote.external_reference || "");
  if (
    !reference ||
    String(invoice.external_reference || "") !== reference ||
    String(charge.external_reference || "") !== reference
  )
    throw new Error("PAYMENT_REFERENCE_MISMATCH");
  let subscription = await general.subscription.findUnique({
    where: { mpPreapprovalId: preapprovalId },
  });
  if (!subscription) {
    await registerRecurringAuthorization(reference, remote);
    subscription = await general.subscription.findUnique({
      where: { mpPreapprovalId: preapprovalId },
    });
  }
  if (!subscription) throw new Error("SUBSCRIPTION_NOT_READY");
  const dueDate = new Date(invoice.debit_date);
  if (!Number.isFinite(dueDate.getTime())) throw new Error("INVOICE_DUE_DATE_MISSING");
  if (charge.status === "approved") {
    const result = await settleRecurringCharge({
      id: String(paymentId),
      invoiceId: id,
      preapprovalId,
      externalReference: reference,
      status: charge.status,
      amount: Number(charge.transaction_amount),
      currency: String(charge.currency_id || ""),
      dueDate,
    });
    const meta = jsonObject(result.payment.metadata);
    const receiptEnd =
      typeof meta.entitlementEnd === "string"
        ? new Date(meta.entitlementEnd)
        : result.subscription.subscriptionEndDate;
    await deliverBillingNotice(
      result.payment.subscriptionPaymentId,
      "paid",
      receiptEnd,
      subscription.autoRenewEnabled,
    );
    return {
      processed: true,
      reason: result.duplicate
        ? "RECURRING_PAYMENT_ALREADY_RECORDED"
        : "RECURRING_PAYMENT_APPROVED",
      ...result,
    };
  }
  if (["rejected", "cancelled", "canceled"].includes(charge.status)) {
    // A failed attempt neither shortens paid access nor disables gateway retries.
    const failure = await general.subscriptionPayment.upsert({
      where: { subscriptionPaymentId: `mp-attempt-${paymentId}` },
      update: {},
      create: {
        subscriptionPaymentId: `mp-attempt-${paymentId}`,
        subscriptionId: subscription.subscriptionId,
        subscriptionBusinessId: subscription.subscriptionBusinessId,
        subscriptionPlanId: subscription.subscriptionPlanId,
        amount: Number(charge.transaction_amount || subscription.subscriptionAmount),
        currency: charge.currency_id || "CLP",
        paymentMethod: "MERCADO_PAGO",
        status: "REJECTED",
        mpPaymentId: String(paymentId),
        createdByUserId: subscription.createdByUserId,
        externalReference: reference,
        metadata: {
          source: "failed_attempt",
          authorizedPaymentId: id,
          dueDate: dueDate.toISOString(),
        },
      },
    });
    await deliverBillingNotice(
      failure.subscriptionPaymentId,
      "failed",
      dueDate,
      subscription.autoRenewEnabled,
    );
    return { processed: true, reason: "RECURRING_PAYMENT_FAILED" };
  }
  // Refunds/chargebacks are not card-validation receipts and never expire unrelated plans.
  return { processed: true, reason: "SUBSCRIPTION_PAYMENT_PENDING" };
}
