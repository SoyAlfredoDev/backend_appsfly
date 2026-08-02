import {
    addDaysToDateKey,
    getTodayBusinessDate,
} from "../../libs/businessTimezone.js";
import {
    assertPublicAppointmentAccess,
    buildPublicAppointmentUrl,
    ensureAppointmentSettings,
    resolveAppointmentBusinessContext,
    serializeSettings,
} from "./appointmentAccessService.js";
import { assertSlotIsBookable, listAvailableSlots } from "./appointmentSlotService.js";

export function serializeAppointment(appt) {
    return {
        appointmentId: appt.appointmentId,
        firstName: appt.firstName,
        lastName: appt.lastName,
        phoneCode: appt.phoneCode,
        phoneNumber: appt.phoneNumber,
        contactConsent: appt.contactConsent,
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
            visitorMessage: ctx.settings.visitorMessage,
            slotDurationMinutes: ctx.settings.slotDurationMinutes,
            maxDaysAhead: ctx.settings.maxDaysAhead,
        };
    } catch (error) {
        if (error.code === "BUSINESS_NOT_FOUND") throw error;

        // Soft response for public page: branding when possible, without leaking reason details
        try {
            const soft = await resolveAppointmentBusinessContext(businessId);
            return {
                available: false,
                business: soft.branding,
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
    const toKey = to || addDaysToDateKey(today, Math.min(ctx.settings.maxDaysAhead || 30, 14));

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
    const { startsAt, endsAt } = await assertSlotIsBookable({
        prisma: ctx.prisma,
        settings: ctx.settings,
        timezone: ctx.timezone,
        startsAt: payload.startsAt,
    });

    const created = await ctx.prisma.appointment.create({
        data: {
            firstName: payload.firstName.trim(),
            lastName: payload.lastName.trim(),
            phoneCode: payload.phoneCode || "+56",
            phoneNumber: payload.phoneNumber.trim(),
            contactConsent: true,
            startsAt,
            endsAt,
            status: "PENDING",
            notes: payload.notes?.trim() || null,
        },
    });

    return serializeAppointment(created);
}

export async function getTenantAppointmentSettings(prisma, businessId) {
    const settings = await ensureAppointmentSettings(prisma);
    return {
        ...serializeSettings(settings),
        publicLink: buildPublicAppointmentUrl(businessId),
    };
}

export async function updateTenantAppointmentSettings(prisma, businessId, payload) {
    await ensureAppointmentSettings(prisma);

    const updated = await prisma.$transaction(async (tx) => {
        await tx.appointmentWeeklyAvailability.deleteMany({
            where: { settingsId: "default" },
        });

        return tx.appointmentSettings.update({
            where: { settingsId: "default" },
            data: {
                appointmentsEnabled: payload.appointmentsEnabled,
                slotDurationMinutes: payload.slotDurationMinutes,
                maxDaysAhead: payload.maxDaysAhead,
                visitorMessage:
                    payload.visitorMessage === undefined
                        ? undefined
                        : (payload.visitorMessage?.trim() || null),
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
        where.status = { in: ["PENDING", "CONFIRMED"] };
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

export async function patchTenantAppointment(prisma, timezone, appointmentId, payload) {
    const existing = await prisma.appointment.findUnique({
        where: { appointmentId },
    });

    if (!existing) {
        const err = new Error("Cita no encontrada.");
        err.statusCode = 404;
        err.code = "APPOINTMENT_NOT_FOUND";
        throw err;
    }

    const data = {};

    if (payload.notes !== undefined) data.notes = payload.notes;
    if (payload.staffNotes !== undefined) data.staffNotes = payload.staffNotes;

    if (payload.startsAt) {
        const settings = await ensureAppointmentSettings(prisma);
        const { startsAt, endsAt } = await assertSlotIsBookable({
            prisma,
            settings,
            timezone,
            startsAt: payload.startsAt,
            excludeAppointmentId: appointmentId,
        });
        data.startsAt = startsAt;
        data.endsAt = endsAt;
        if (!payload.status) {
            data.status = existing.status === "PENDING" ? "PENDING" : "RESCHEDULED";
        }
    }

    if (payload.status) {
        data.status = payload.status;
    }

    const updated = await prisma.appointment.update({
        where: { appointmentId },
        data,
    });

    return serializeAppointment(updated);
}

export async function getTenantAvailableSlots(prisma, timezone, { from, to, excludeAppointmentId } = {}) {
    const settings = await ensureAppointmentSettings(prisma);
    const today = getTodayBusinessDate(timezone);
    const fromKey = from || today;
    const toKey = to || addDaysToDateKey(today, Math.min(settings.maxDaysAhead || 30, 14));

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
