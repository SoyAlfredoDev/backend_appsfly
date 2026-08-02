import {
    addDaysToDateKey,
    getTodayBusinessDate,
    toBusinessDateKey,
    zonedDateTimeToUtc,
} from "../../libs/businessTimezone.js";

const ACTIVE_STATUSES = ["PENDING", "CONFIRMED"];

function parseHm(hm) {
    const [h, m] = String(hm).split(":").map(Number);
    return h * 60 + m;
}

function minutesToHm(total) {
    const h = Math.floor(total / 60);
    const m = total % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/** 0 = domingo … 6 = sábado en la TZ del negocio. */
export function getWeekdayInTimezone(dateKey, timeZone) {
    const noonUtc = zonedDateTimeToUtc(dateKey, timeZone, {
        hour: 12,
        minute: 0,
        second: 0,
        millisecond: 0,
    });
    const weekday = new Intl.DateTimeFormat("en-US", {
        timeZone,
        weekday: "short",
    }).format(noonUtc);
    const map = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    return map[weekday] ?? 0;
}

function rangesOverlap(aStart, aEnd, bStart, bEnd) {
    return aStart < bEnd && bStart < aEnd;
}

/**
 * Genera slots libres en [fromKey, toKey] inclusivo.
 */
export async function listAvailableSlots({
    prisma,
    settings,
    timezone,
    fromKey,
    toKey,
    excludeAppointmentId = null,
}) {
    const duration = settings.slotDurationMinutes || 30;
    const availability = settings.weeklyAvailability || [];
    if (!availability.length) return [];

    const todayKey = getTodayBusinessDate(timezone);
    const maxKey = addDaysToDateKey(todayKey, settings.maxDaysAhead || 30);
    let cursor = fromKey < todayKey ? todayKey : fromKey;
    if (toKey > maxKey) {
        // clamp end
    }
    const endKey = toKey > maxKey ? maxKey : toKey;
    if (cursor > endKey) return [];

    const rangeStart = zonedDateTimeToUtc(cursor, timezone, { hour: 0, minute: 0 });
    const rangeEndExclusive = zonedDateTimeToUtc(addDaysToDateKey(endKey, 1), timezone, {
        hour: 0,
        minute: 0,
    });

    const occupied = await prisma.appointment.findMany({
        where: {
            status: { in: ACTIVE_STATUSES },
            startsAt: { lt: rangeEndExclusive },
            endsAt: { gt: rangeStart },
            ...(excludeAppointmentId
                ? { appointmentId: { not: excludeAppointmentId } }
                : {}),
        },
        select: {
            appointmentId: true,
            startsAt: true,
            endsAt: true,
        },
    });

    const now = new Date();
    const slots = [];

    while (cursor <= endKey) {
        const dayOfWeek = getWeekdayInTimezone(cursor, timezone);
        const dayWindows = availability.filter((w) => w.dayOfWeek === dayOfWeek);

        for (const window of dayWindows) {
            const startMin = parseHm(window.startTime);
            const endMin = parseHm(window.endTime);

            for (let minute = startMin; minute + duration <= endMin; minute += duration) {
                const hm = minutesToHm(minute);
                const [hour, min] = hm.split(":").map(Number);
                const startsAt = zonedDateTimeToUtc(cursor, timezone, {
                    hour,
                    minute: min,
                    second: 0,
                    millisecond: 0,
                });
                const endsAt = new Date(startsAt.getTime() + duration * 60_000);

                if (startsAt <= now) continue;

                const conflict = occupied.some((appt) =>
                    rangesOverlap(startsAt, endsAt, appt.startsAt, appt.endsAt),
                );
                if (conflict) continue;

                slots.push({
                    startsAt: startsAt.toISOString(),
                    endsAt: endsAt.toISOString(),
                    dateKey: cursor,
                    label: hm,
                });
            }
        }

        cursor = addDaysToDateKey(cursor, 1);
    }

    return slots;
}

export async function assertSlotIsBookable({
    prisma,
    settings,
    timezone,
    startsAt,
    excludeAppointmentId = null,
}) {
    const start = startsAt instanceof Date ? startsAt : new Date(startsAt);
    if (Number.isNaN(start.getTime())) {
        const err = new Error("Fecha/hora de cita inválida.");
        err.statusCode = 400;
        err.code = "INVALID_SLOT";
        throw err;
    }

    if (start <= new Date()) {
        const err = new Error("El horario seleccionado ya no está disponible.");
        err.statusCode = 409;
        err.code = "SLOT_UNAVAILABLE";
        throw err;
    }

    const duration = settings.slotDurationMinutes || 30;
    const endsAt = new Date(start.getTime() + duration * 60_000);
    const dateKey = toBusinessDateKey(start, timezone);
    const todayKey = getTodayBusinessDate(timezone);
    const maxKey = addDaysToDateKey(todayKey, settings.maxDaysAhead || 30);

    if (!dateKey || dateKey < todayKey || dateKey > maxKey) {
        const err = new Error("El horario está fuera del rango permitido.");
        err.statusCode = 400;
        err.code = "SLOT_OUT_OF_RANGE";
        throw err;
    }

    const daySlots = await listAvailableSlots({
        prisma,
        settings,
        timezone,
        fromKey: dateKey,
        toKey: dateKey,
        excludeAppointmentId,
    });

    const match = daySlots.find(
        (slot) => new Date(slot.startsAt).getTime() === start.getTime(),
    );

    if (!match) {
        const err = new Error("El horario seleccionado ya no está disponible.");
        err.statusCode = 409;
        err.code = "SLOT_UNAVAILABLE";
        throw err;
    }

    return { startsAt: start, endsAt };
}
