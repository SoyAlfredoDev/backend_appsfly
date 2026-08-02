import { z } from "zod";

const TIME_RE = /^([01]\d|2[0-3]):([0-5]\d)$/;
const CHILE_MOBILE_RE = /^9\d{8}$/;

export const chilePhoneSchema = z.object({
    phoneCode: z.literal("+56").default("+56"),
    phoneNumber: z
        .string()
        .trim()
        .regex(CHILE_MOBILE_RE, "Ingresa un celular chileno válido (9 dígitos, comienza con 9)."),
});

export const weeklyAvailabilityItemSchema = z.object({
    dayOfWeek: z.number().int().min(0).max(6),
    startTime: z.string().regex(TIME_RE, "Hora de inicio inválida (HH:mm)."),
    endTime: z.string().regex(TIME_RE, "Hora de fin inválida (HH:mm)."),
}).refine((row) => row.startTime < row.endTime, {
    message: "La hora de inicio debe ser anterior a la de fin.",
    path: ["endTime"],
});

export const updateAppointmentSettingsSchema = z.object({
    appointmentsEnabled: z.boolean(),
    slotDurationMinutes: z.number().int().min(10).max(240),
    maxDaysAhead: z.number().int().min(1).max(90),
    visitorMessage: z.string().trim().max(500).nullable().optional(),
    weeklyAvailability: z.array(weeklyAvailabilityItemSchema).max(40),
});

export const createPublicAppointmentSchema = z.object({
    firstName: z.string().trim().min(1, "El nombre es obligatorio.").max(80),
    lastName: z.string().trim().min(1, "El apellido es obligatorio.").max(80),
    phoneCode: z.literal("+56").default("+56"),
    phoneNumber: z
        .string()
        .trim()
        .regex(CHILE_MOBILE_RE, "Ingresa un celular chileno válido (9 dígitos, comienza con 9)."),
    contactConsent: z
        .boolean()
        .refine((value) => value === true, {
            message: "Debes autorizar que te contactemos.",
        }),
    startsAt: z.string().datetime({ offset: true }).or(z.string().datetime()),
    notes: z.string().trim().max(500).optional().nullable(),
});

export const listAppointmentsQuerySchema = z.object({
    status: z
        .enum(["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED", "RESCHEDULED", "ACTIVE"])
        .optional(),
    from: z.string().optional(),
    to: z.string().optional(),
});

export const patchAppointmentSchema = z.object({
    status: z.enum(["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED", "RESCHEDULED"]).optional(),
    startsAt: z.string().datetime({ offset: true }).or(z.string().datetime()).optional(),
    notes: z.string().trim().max(500).nullable().optional(),
    staffNotes: z.string().trim().max(500).nullable().optional(),
}).refine((data) => Object.keys(data).length > 0, {
    message: "Debes enviar al menos un campo para actualizar.",
});

export const publicSlotsQuerySchema = z.object({
    from: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    to: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
});
