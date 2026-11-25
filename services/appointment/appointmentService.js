import {
    addDaysToDateKey,
    getTodayBusinessDate,
} from "../../libs/businessTimezone.js";
import {
    assertPublicAppointmentAccess,
    appointmentSettingsWhere,
    buildPublicAppointmentUrl,
    ensureAppointmentSettings,
    mapBusinessBranding,
    resolveAppointmentBusinessContext,
    serializeAppointmentLocation,
    serializeSettings,
} from "./appointmentAccessService.js";
import { assertSlotIsBookable, listAvailableSlots } from "./appointmentSlotService.js";
import {
    ACTIVE_INBOX_STATUSES,
    appointmentNoticeKind,
    statusAfterTimeChange,
} from "./appointmentPolicy.js";
import { deliverAppointmentNotice } from "./appointmentNotificationService.js";
import { buildAppointmentManagementUrl } from "./appointmentManagement.js";
import { createAppointmentManagementToken } from "./appointmentManagementToken.js";
import { bookPublicAppointment } from "./appointmentRequest.js";
import { withAppointmentWriteLock } from "./appointmentWriteLock.js";
import { generalPrisma as general } from "../../dbGeneral.js";

export { withAppointmentWriteLock } from "./appointmentWriteLock.js";

export function serializeAppointment(appt) {
    return {
        appointmentId: appt.appointmentId,
        firstName: appt.firstName,
        lastName: appt.lastName,
        phoneCode: appt.phoneCode,
        phoneNumber: appt.phoneNumber,
        contactConsent: appt.contactConsent,
        customerEmail: appt.customerEmail || null,
        startsAt: appt.startsAt?.toISOString?.() || appt.startsAt,
        endsAt: appt.endsAt?.toISOString?.() || appt.endsAt,
        status: appt.status,
        notes: appt.notes,
        staffNotes: appt.staffNotes,
        createdAt: appt.createdAt?.toISOString?.() || appt.createdAt,
        updatedAt: appt.updatedAt?.toISOString?.() || appt.updatedAt,
    };
}

export async function getPublicAppointmentPage(businessId) {
    try {
        const ctx = await assertPublicAppointmentAccess(businessId);
        return {
            available: true,
            business: ctx.branding,
            timezone: ctx.timezone,
            visitorMessage: ctx.settings.visitorMessage,
            customerNotificationsEnabled: Boolean(ctx.settings.customerNotificationsEnabled),
            emailRequired: false,
            slotDurationMinutes: ctx.settings.slotDurationMinutes,
            maxDaysAhead: ctx.settings.maxDaysAhead,
            galleryImageUrls: (ctx.settings.galleryImageUrls || []).filter(Boolean),
            location: serializeAppointmentLocation(ctx.settings, ctx.branding),
        };
    } catch (error) {
        if (error.code === "BUSINESS_NOT_FOUND") throw error;

        // Soft response for public page: branding when possible, without leaking reason details
        try {
            const soft = await resolveAppointmentBusinessContext(businessId);
            return {
                available: false,
                business: soft.branding,
                timezone: soft.timezone,
                message: "El agendamiento no está disponible en este momento.",
            };
        } catch {
            throw error;
        }
    }
}

export async function getPublicAvailableSlots(businessId, { from, to } = {}) {
    const ctx = await assertPublicAppointmentAccess(businessId);
    const today = getTodayBusinessDate(ctx.timezone);
    const fromKey = from || today;
    const toKey = to || addDaysToDateKey(today, ctx.settings.maxDaysAhead || 30);

    const slots = await listAvailableSlots({
        prisma: ctx.prisma,
        settings: ctx.settings,
        timezone: ctx.timezone,
        fromKey,
        toKey,
    });

    return {
        timezone: ctx.timezone,
        slotDurationMinutes: ctx.settings.slotDurationMinutes,
        slots,
    };
}

export async function createPublicAppointment(businessId, payload) {
    const ctx = await assertPublicAppointmentAccess(businessId);
    const result = await bookPublicAppointment(ctx, businessId, payload);
    const { managementToken } = result;
    const appointment = serializeAppointment(result.row);
    if (!result.replayed) {
        await deliverAppointmentNotice({
            enabled: ctx.settings.customerNotificationsEnabled,
            kind: "requested",
            appointment,
            businessName: ctx.branding.name,
            businessLogoUrl: ctx.branding.logoUrl,
            businessEmail: ctx.branding.email,
            timezone: ctx.timezone,
            notifyBusiness: true,
            managementUrl: buildAppointmentManagementUrl(businessId, managementToken),
        });
    }

    return { appointment, timezone: ctx.timezone, managementToken, replayed: result.replayed };
}

export async function getTenantAppointmentSettings(prisma, businessId) {
    const settings = await ensureAppointmentSettings(prisma);
    return {
        ...serializeSettings(settings),
        publicLink: buildPublicAppointmentUrl(businessId),
    };
}

export async function updateTenantAppointmentSettings(prisma, businessId, payload) {
    if (payload.appointmentsEnabled && !(payload.weeklyAvailability || []).length) {
        const err = new Error("Agrega al menos una franja horaria para habilitar citas.");
        err.statusCode = 400;
        err.code = "APPOINTMENTS_AVAILABILITY_REQUIRED";
        throw err;
    }

    const current = await ensureAppointmentSettings(prisma);
    const availabilityWhere = current.businessId
        ? { businessId: current.businessId, settingsId: "default" }
        : { settingsId: "default" };

    const updated = await prisma.$transaction(async (tx) => {
        await tx.appointmentWeeklyAvailability.deleteMany({
            where: availabilityWhere,
        });

        return tx.appointmentSettings.update({
            where: appointmentSettingsWhere(current),
            data: {
                appointmentsEnabled: payload.appointmentsEnabled,
                slotDurationMinutes: payload.slotDurationMinutes,
                maxConcurrentPerSlot: payload.maxConcurrentPerSlot,
                maxDaysAhead: payload.maxDaysAhead,
                customerNotificationsEnabled: payload.customerNotificationsEnabled,
                visitorMessage:
                    payload.visitorMessage === undefined
                        ? undefined
                        : (payload.visitorMessage?.trim() || null),
                galleryImageUrls: (payload.galleryImageUrls || []).filter(Boolean),
                locationAddress:
                    payload.locationAddress === undefined
                        ? undefined
                        : (payload.locationAddress?.trim() || null),
                locationLatitude:
                    payload.locationLatitude === undefined
                        ? undefined
                        : payload.locationLatitude,
                locationLongitude:
                    payload.locationLongitude === undefined
                        ? undefined
                        : payload.locationLongitude,
                weeklyAvailability: {
                    create: (payload.weeklyAvailability || []).map((row) => ({
                        dayOfWeek: row.dayOfWeek,
                        startTime: row.startTime,
                        endTime: row.endTime,
                    })),
                },
            },
            include: {
                weeklyAvailability: {
                    orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
                },
            },
        });
    });

    return {
        ...serializeSettings(updated),
        publicLink: buildPublicAppointmentUrl(businessId),
    };
}

export async function listTenantAppointments(prisma, { status, from, to } = {}) {
    const where = {};

    if (status === "ACTIVE") {
        where.status = { in: [...ACTIVE_INBOX_STATUSES] };
    } else if (status) {
        where.status = status;
    }

    if (from || to) {
        where.startsAt = {};
        if (from) where.startsAt.gte = new Date(from);
        if (to) where.startsAt.lte = new Date(to);
    }

    const rows = await prisma.appointment.findMany({
        where,
        orderBy: [{ startsAt: "asc" }],
        take: 500,
    });

    return rows.map(serializeAppointment);
}

export async function patchTenantAppointment(prisma, timezone, appointmentId, payload, businessId) {
    const { existing, updated } = await withAppointmentWriteLock(prisma, businessId, async (tx) => {
        const existing = await tx.appointment.findUnique({ where: { appointmentId } });
        if (!existing) {
            const err = new Error("Cita no encontrada.");
            err.statusCode = 404;
            err.code = "APPOINTMENT_NOT_FOUND";
            throw err;
        }
        const data = {};
        if (payload.notes !== undefined) data.notes = payload.notes;
        if (payload.staffNotes !== undefined) data.staffNotes = payload.staffNotes;
        if (payload.status) data.status = payload.status;
        if (payload.startsAt && Date.parse(payload.startsAt) !== existing.startsAt.getTime()) {
            const settings = await ensureAppointmentSettings(tx);
            const slot = await assertSlotIsBookable({
                prisma: tx,
                settings,
                timezone,
                startsAt: payload.startsAt,
                excludeAppointmentId: appointmentId,
            });
            data.startsAt = slot.startsAt;
            data.endsAt = slot.endsAt;
            data.status = payload.status || statusAfterTimeChange(existing.status);
        }
        const updated = await tx.appointment.update({
            where: { appointmentId },
            data,
        });
        return { existing, updated };
    });
    const appointment = serializeAppointment(updated);
    await notifyTenantAppointmentChange({
        prisma,
        businessId,
        timezone,
        previous: existing,
        appointment,
        startsAtChanged: existing.startsAt.getTime() !== updated.startsAt.getTime(),
    });
    return appointment;
}

export async function getTenantAvailableSlots(prisma, timezone, { from, to, excludeAppointmentId } = {}) {
    const settings = await ensureAppointmentSettings(prisma);
    const today = getTodayBusinessDate(timezone);
    const fromKey = from || today;
    const toKey = to || addDaysToDateKey(today, settings.maxDaysAhead || 30);

    const slots = await listAvailableSlots({
        prisma,
        settings,
        timezone,
        fromKey,
        toKey,
        excludeAppointmentId: excludeAppointmentId || null,
    });

    return {
        timezone,
        slotDurationMinutes: settings.slotDurationMinutes,
        slots,
    };
}

async function notifyTenantAppointmentChange({
    prisma,
    businessId,
    timezone,
    previous,
    appointment,
    startsAtChanged,
}) {
    const statusChanged = appointment.status !== previous.status;
    const kind = appointmentNoticeKind({
        startsAtChanged,
        status: statusChanged ? appointment.status : null,
    });
    if (!kind) return;

    const settings = await ensureAppointmentSettings(prisma);
    if (!settings.customerNotificationsEnabled) return;

    let branding = { name: "Tu negocio", logoUrl: null, email: null };
    if (businessId) {
        const business = await general.business.findUnique({ where: { businessId } });
        if (business) branding = mapBusinessBranding(business);
    }

    await deliverAppointmentNotice({
        enabled: true,
        kind,
        appointment,
        businessName: branding.name,
        businessLogoUrl: branding.logoUrl,
        businessEmail: branding.email,
        timezone,
        notifyBusiness: false,
        managementUrl: businessId
            ? buildAppointmentManagementUrl(
                businessId,
                createAppointmentManagementToken(businessId, appointment.appointmentId),
            )
            : null,
    });
}
