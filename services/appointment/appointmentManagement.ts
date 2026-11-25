import { z } from "zod";

import { getFrontendBaseUrl } from "../../emails/shared/layout.js";
import type { Appointment, Prisma } from "../../src/generated/business/index.js";
import {
  ensureAppointmentSettings,
  resolveAppointmentBusinessContext,
  serializeAppointmentLocation,
} from "./appointmentAccessService.js";
import {
  appointmentManagementId,
  createAppointmentManagementToken,
} from "./appointmentManagementToken.js";
import { deliverAppointmentNotice } from "./appointmentNotificationService.js";
import { ACTIVE_INBOX_STATUSES } from "./appointmentPolicy.js";
import { assertSlotIsBookable } from "./appointmentSlotService.js";
import { withAppointmentWriteLock } from "./appointmentWriteLock.js";

export const appointmentManagementActionSchema = z.discriminatedUnion("action", [
  z.object({ action: z.literal("cancel") }),
  z.object({ action: z.literal("reschedule"), startsAt: z.string().datetime({ offset: true }) }),
]);

type Action = z.infer<typeof appointmentManagementActionSchema>;
type Context = Awaited<ReturnType<typeof resolveAppointmentBusinessContext>>;
type Settings = Awaited<ReturnType<typeof ensureAppointmentSettings>>;

function invalidLink() {
  return Object.assign(new Error("Este enlace de citas no está disponible."), {
    statusCode: 404,
    code: "INVALID_APPOINTMENT_MANAGEMENT_LINK",
  });
}

function changeNotAvailable() {
  return Object.assign(new Error("Ya no puedes cambiar esta cita desde el enlace."), {
    statusCode: 409,
    code: "APPOINTMENT_CHANGE_NOT_AVAILABLE",
  });
}

export function buildAppointmentManagementUrl(businessId: string, token: string) {
  return `${getFrontendBaseUrl()}/registarcita/${encodeURIComponent(businessId)}#gestionar=${encodeURIComponent(token)}`;
}

function getPermissions(ctx: Context, settings: Settings, appointment: Appointment) {
  const canCancel =
    appointment.startsAt.getTime() > Date.now() &&
    ACTIVE_INBOX_STATUSES.some((status) => status === appointment.status);
  return {
    canCancel,
    canReschedule:
      canCancel &&
      ctx.isBusinessActive &&
      ctx.hasActiveSubscription &&
      ctx.appointmentsPlanAllowed &&
      Boolean(settings.appointmentsEnabled),
  };
}

function serializeManagement(ctx: Context, settings: Settings, appointment: Appointment) {
  const { name, logoUrl, phone, whatsappUrl } = ctx.branding;
  return {
    appointment: {
      appointmentId: appointment.appointmentId,
      startsAt: appointment.startsAt.toISOString(),
      endsAt: appointment.endsAt.toISOString(),
      status: appointment.status,
    },
    timezone: ctx.timezone,
    business: { name, logoUrl, phone, whatsappUrl },
    location: serializeAppointmentLocation(settings, ctx.branding),
    ...getPermissions(ctx, settings, appointment),
  };
}

async function loadManagementContext(businessId: string, authorization: string | undefined) {
  const appointmentId = appointmentManagementId(businessId, authorization);
  if (!appointmentId) throw invalidLink();
  const ctx = await resolveAppointmentBusinessContext(businessId);
  return { ctx, appointmentId };
}

export async function getAppointmentManagement(
  businessId: string,
  authorization: string | undefined,
) {
  const { ctx, appointmentId } = await loadManagementContext(businessId, authorization);
  const appointment = await ctx.prisma.appointment.findUnique({ where: { appointmentId } });
  if (!appointment) throw invalidLink();
  const settings = await ensureAppointmentSettings(ctx.prisma);
  return serializeManagement(ctx, settings, appointment);
}

export async function changeAppointmentManagement(
  businessId: string,
  authorization: string | undefined,
  action: Action,
) {
  const { ctx, appointmentId } = await loadManagementContext(businessId, authorization);
  const result = await withAppointmentWriteLock(
    ctx.prisma,
    businessId,
    async (tx: Prisma.TransactionClient) => {
      const appointment = await tx.appointment.findUnique({ where: { appointmentId } });
      if (!appointment) throw invalidLink();
      const settings = await ensureAppointmentSettings(tx);
      const permissions = getPermissions(ctx, settings, appointment);

      if (action.action === "cancel") {
        if (appointment.status === "CANCELLED") return { appointment, settings, changed: false };
        if (!permissions.canCancel) throw changeNotAvailable();
        const updated = await tx.appointment.update({
          where: { appointmentId },
          data: { status: "CANCELLED" },
        });
        return { appointment: updated, settings, changed: true };
      }

      if (!permissions.canReschedule) throw changeNotAvailable();
      if (appointment.startsAt.getTime() === Date.parse(action.startsAt)) {
        return { appointment, settings, changed: false };
      }
      const slot = await assertSlotIsBookable({
        prisma: tx,
        settings,
        timezone: ctx.timezone,
        startsAt: action.startsAt,
        excludeAppointmentId: appointmentId,
      });
      const updated = await tx.appointment.update({
        where: { appointmentId },
        data: { startsAt: slot.startsAt, endsAt: slot.endsAt, status: "PENDING" },
      });
      return { appointment: updated, settings, changed: true };
    },
  );

  if (result.changed && result.settings.customerNotificationsEnabled) {
    await deliverAppointmentNotice({
      enabled: true,
      kind: action.action === "cancel" ? "cancelled" : "reschedule_request",
      appointment: result.appointment,
      businessName: ctx.branding.name,
      businessLogoUrl: ctx.branding.logoUrl,
      businessEmail: ctx.branding.email,
      timezone: ctx.timezone,
      notifyBusiness: true,
      managementUrl: buildAppointmentManagementUrl(
        businessId,
        createAppointmentManagementToken(businessId, appointmentId),
      ),
    });
  }

  return serializeManagement(ctx, result.settings, result.appointment);
}
