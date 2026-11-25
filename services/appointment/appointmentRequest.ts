import { randomUUID } from "node:crypto";
import type { z } from "zod";
import type { Prisma } from "../../src/generated/business/index.js";
import { ensureAppointmentSettings } from "./appointmentAccessService.js";
import {
  appointmentIdForRequest,
  createAppointmentManagementToken,
} from "./appointmentManagementToken.js";
import type { createPublicAppointmentSchema } from "./appointmentSchemas.js";
import { assertSlotIsBookable } from "./appointmentSlotService.js";
import { withAppointmentWriteLock } from "./appointmentWriteLock.js";
import type { assertPublicAppointmentAccess } from "./appointmentAccessService.js";

type AppointmentAccess = Awaited<ReturnType<typeof assertPublicAppointmentAccess>>;
type AppointmentPayload = z.infer<typeof createPublicAppointmentSchema>;

export async function bookPublicAppointment(
  ctx: AppointmentAccess,
  businessId: string,
  payload: AppointmentPayload,
) {
  const appointmentId = payload.clientRequestId
    ? appointmentIdForRequest(businessId, payload.clientRequestId)
    : randomUUID();
  const managementToken = createAppointmentManagementToken(businessId, appointmentId);
  const contact = {
    firstName: payload.firstName.trim(),
    lastName: payload.lastName.trim(),
    phoneCode: payload.phoneCode,
    phoneNumber: payload.phoneNumber.trim(),
  };
  const notes = payload.notes?.trim() || null;

  const result = await withAppointmentWriteLock(
    ctx.prisma,
    businessId,
    async (tx: Prisma.TransactionClient) => {
      const settings = await ensureAppointmentSettings(tx);
      const customerEmail = settings.customerNotificationsEnabled ? payload.customerEmail : null;
      if (payload.clientRequestId) {
        const existing = await tx.appointment.findUnique({ where: { appointmentId } });
        if (existing) {
          const sameContact = (Object.keys(contact) as (keyof typeof contact)[]).every(
            (key) => existing[key] === contact[key],
          );
          if (
            sameContact &&
            existing.customerEmail === customerEmail &&
            existing.notes === notes &&
            existing.startsAt.getTime() === Date.parse(payload.startsAt)
          ) {
            return { row: existing, replayed: true };
          }
          throw Object.assign(
            new Error("Esta solicitud ya se usó. Revisa los datos y vuelve a intentar."),
            { statusCode: 409, code: "APPOINTMENT_REQUEST_CONFLICT" },
          );
        }
      }
      if (!settings.appointmentsEnabled) {
        throw Object.assign(new Error("El agendamiento no está disponible para este negocio."), {
          statusCode: 403,
          code: "APPOINTMENTS_DISABLED",
        });
      }
      const { startsAt, endsAt } = await assertSlotIsBookable({
        prisma: tx,
        settings,
        timezone: ctx.timezone,
        startsAt: payload.startsAt,
      });
      const row = await tx.appointment.create({
        data: {
          appointmentId,
          ...contact,
          customerEmail,
          contactConsent: true,
          startsAt,
          endsAt,
          status: "PENDING",
          notes,
        },
      });
      return { row, replayed: false };
    },
  );

  return { ...result, managementToken };
}
