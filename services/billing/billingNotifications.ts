import crypto from "node:crypto";
import { generalPrisma } from "../../dbGeneral.js";
import type { PrismaClient } from "../../src/generated/general/index.js";
const general = generalPrisma as PrismaClient;
import { sendEmail } from "../../emails/core/sendEmail.js";
import { escapeHtml, primaryButton, wrapEmailLayout } from "../../emails/shared/layout.js";
import { jsonObject } from "./recurringSettlement.js";
import { subscriptionNoticeKind } from "./subscriptionLifecycle.js";

export type BillingNotice =
  "trial_started" | "authorized" | "paid" | "failed" | "due_7" | "due_1" | "expired";
export function billingNoticeContent(input: {
  kind: BillingNotice;
  businessName: string;
  planName: string;
  amount: number;
  currency: string;
  end: Date;
  automatic: boolean;
  trial: boolean;
}) {
  const date = new Intl.DateTimeFormat("es-CL", {
    dateStyle: "long",
    timeZone: "America/Santiago",
  }).format(input.end);
  const amount = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: input.currency,
  }).format(input.amount);
  const details: Record<BillingNotice, [string, string]> = {
    trial_started: [
      "Tu prueba gratuita de AppsFly está activa",
      `Tu prueba gratuita de dos meses está vigente hasta el ${date}. No se ha realizado ningún cobro. Puedes elegir tu próximo plan y autorizar una tarjeta desde Suscripción; el primer cobro se programará para el término de la prueba.`,
    ],
    authorized: [
      "Autorización de suscripción registrada",
      `Registramos la autorización de tu medio de pago. Esto no es un comprobante de cobro. El primer cobro de ${amount}, IVA incluido, está programado a partir del ${date}. Mercado Pago puede realizar una validación temporal de la tarjeta; esa validación no corresponde a la mensualidad.`,
    ],
    paid: [
      "Pago de suscripción confirmado",
      `Confirmamos la recepción de ${amount}, IVA incluido. La vigencia de tu plan se encuentra actualizada hasta el ${date}.`,
    ],
    failed: [
      "No pudimos confirmar el cobro de tu suscripción",
      `Mercado Pago no confirmó el pago de la mensualidad. Revisa tu medio de pago en Suscripción. Conservas cualquier período de acceso todavía vigente; este intento no lo acorta. Los reintentos dependen del estado de tu autorización en Mercado Pago.`,
    ],
    due_7: [
      input.trial
        ? "Tu prueba de AppsFly está por finalizar"
        : "Próximo vencimiento de tu suscripción",
      "",
    ],
    due_1: [
      input.trial
        ? "Tu prueba de AppsFly finaliza pronto"
        : "Recordatorio de vencimiento de tu suscripción",
      "",
    ],
    expired: [
      "Tu período de acceso a AppsFly ha vencido",
      `El período de acceso finalizó el ${date} y no tenemos un pago confirmado que lo renueve. Ingresa a Suscripción para revisar el estado. Si ya realizaste el pago, evita repetirlo y contacta a soporte para verificarlo.`,
    ],
  };
  const [subject, message] = details[input.kind];
  const body =
    message ||
    `Tu ${input.trial ? "prueba gratuita" : "período vigente"} finaliza el ${date}. ${
      input.automatic
        ? `Tienes una autorización de renovación registrada. El cobro se realizará según el calendario de Mercado Pago; recibirás una confirmación cuando se apruebe.`
        : "No tienes una renovación automática activa. Puedes elegir un plan y autorizar el medio de pago desde Suscripción para mantener la continuidad del servicio."
    }`;
  const text = `Hola,\n\n${input.businessName} · ${input.planName}\n\n${body}\n\nGestiona tu suscripción: https://appsfly.cl/configuration/subscription\n\nAtentamente,\nEquipo AppsFly`;
  const html = wrapEmailLayout({
    title: subject,
    preheader: body,
    bodyHtml: `<p>Hola,</p><p><strong>${escapeHtml(input.businessName)}</strong> · ${escapeHtml(input.planName)}</p><p style="font-size:16px;line-height:1.65">${escapeHtml(body)}</p>${primaryButton("https://appsfly.cl/configuration/subscription", "Gestionar suscripción")}<p>Atentamente,<br>Equipo AppsFly</p>`,
  });
  return { subject: `${subject} | AppsFly`, text, html };
}

/** Durable notification ledger lives on the billing event; no fire-and-forget work. */
export async function deliverBillingNotice(
  paymentId: string,
  kind: BillingNotice,
  end: Date,
  automatic = false,
) {
  const key = crypto
    .createHash("sha256")
    .update(`${paymentId}:${kind}:${end.toISOString()}`)
    .digest("hex");
  const claim = crypto.randomUUID();
  const payment = await general.$transaction(async (tx) => {
    await tx.$queryRaw`SELECT "subscriptionPaymentId" FROM "SubscriptionPayment" WHERE "subscriptionPaymentId" = ${paymentId} FOR UPDATE`;
    const p = await tx.subscriptionPayment.findUniqueOrThrow({
      where: { subscriptionPaymentId: paymentId },
      include: { business: true, plan: true, createdBy: true },
    });
    const meta = jsonObject(p.metadata),
      notices = jsonObject(meta.billingNotices),
      previous = jsonObject(notices[key]);
    if (
      previous.sentAt ||
      (typeof previous.claimedAt === "string" &&
        Date.now() - new Date(previous.claimedAt).getTime() < 300_000)
    )
      return null;
    await tx.subscriptionPayment.update({
      where: { subscriptionPaymentId: paymentId },
      data: {
        metadata: {
          ...meta,
          billingNotices: { ...notices, [key]: { claim, claimedAt: new Date().toISOString() } },
        },
      },
    });
    return p;
  });
  if (!payment) return;
  try {
    const content = billingNoticeContent({
      kind,
      end,
      automatic,
      trial: payment.subscriptionPlanId === "P001",
      businessName: payment.business.businessName,
      planName: payment.plan.planName,
      amount: payment.amount,
      currency: payment.currency,
    });
    const result = await sendEmail({
      to: payment.createdBy.userEmail,
      ...content,
      idempotencyKey: `billing-${key}`,
    });
    if (!result?.id) throw new Error("BILLING_EMAIL_NOT_DELIVERED");
    await updateClaim({ sentAt: new Date().toISOString(), providerId: result.id });
  } catch (error) {
    await updateClaim({ failedAt: new Date().toISOString() });
    throw error;
  }
  async function updateClaim(value: { sentAt?: string; providerId?: string; failedAt?: string }) {
    await general.$transaction(async (tx) => {
      await tx.$queryRaw`SELECT "subscriptionPaymentId" FROM "SubscriptionPayment" WHERE "subscriptionPaymentId" = ${paymentId} FOR UPDATE`;
      const p = await tx.subscriptionPayment.findUniqueOrThrow({
        where: { subscriptionPaymentId: paymentId },
      });
      const meta = jsonObject(p.metadata),
        notices = jsonObject(meta.billingNotices);
      if (jsonObject(notices[key]).claim !== claim) return;
      await tx.subscriptionPayment.update({
        where: { subscriptionPaymentId: paymentId },
        data: {
          metadata: {
            ...meta,
            ...(kind === "trial_started" && value.sentAt ? { trialWelcomePending: false } : {}),
            billingNotices: { ...notices, [key]: value },
          },
        },
      });
    });
  }
}

export async function runBillingNotices(now = new Date()) {
  const subscriptions = await general.subscription.findMany({
    where: {
      subscriptionEndDate: {
        gte: new Date(now.getTime() - 30 * 86_400_000),
        lte: new Date(now.getTime() + 7 * 86_400_000),
      },
      subscriptionStatus: { in: ["ACTIVE", "CANCELLED", "EXPIRED"] },
    },
    include: { payments: { orderBy: { createdAt: "desc" } } },
  });
  let failed = 0,
    processed = 0;
  for (const sub of subscriptions) {
    const replacement = await general.subscription.findFirst({
      where: {
        subscriptionBusinessId: sub.subscriptionBusinessId,
        subscriptionId: { not: sub.subscriptionId },
        subscriptionStatus: "ACTIVE",
        subscriptionEndDate: { gt: sub.subscriptionEndDate },
      },
    });
    if (replacement) continue;
    const kind = subscriptionNoticeKind(sub.subscriptionEndDate, now);
    // Anchor period notices to the original checkout so new failed attempts cannot resend them.
    const payment = sub.payments[sub.payments.length - 1];
    if (!kind || !payment) continue;
    const scheduled = await general.subscription.findFirst({
      where: {
        subscriptionBusinessId: sub.subscriptionBusinessId,
        mpPreapprovalStatus: "authorized",
        autoRenewEnabled: true,
      },
    });
    try {
      await deliverBillingNotice(
        payment.subscriptionPaymentId,
        kind,
        sub.subscriptionEndDate,
        Boolean(scheduled),
      );
      processed++;
    } catch {
      failed++;
    }
  }
  return { processed, failed };
}
