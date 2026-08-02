import { ZodError } from "zod";
import {
    listAppointmentsQuerySchema,
    patchAppointmentSchema,
    publicSlotsQuerySchema,
    updateAppointmentSettingsSchema,
} from "../services/appointment/appointmentSchemas.js";
import {
    getTenantAppointmentSettings,
    getTenantAvailableSlots,
    listTenantAppointments,
    patchTenantAppointment,
    updateTenantAppointmentSettings,
} from "../services/appointment/appointmentService.js";
import { buildPublicAppointmentUrl } from "../services/appointment/appointmentAccessService.js";
import { resolveBusinessTimezone } from "../libs/businessTimezone.js";

function sendZodError(res, error) {
    return res.status(400).json({
        message: error.issues?.[0]?.message || "Datos inválidos.",
        code: "VALIDATION_ERROR",
        issues: error.issues,
    });
}

export async function getAppointmentSettingsController(req, res) {
    try {
        const settings = await getTenantAppointmentSettings(
            req.prisma,
            req.tenantBusinessId,
        );
        res.status(200).json({ settings });
    } catch (error) {
        console.error("(appointment.controller): get settings", error);
        res.status(500).json({ message: "No se pudo cargar la configuración de citas." });
    }
}

export async function updateAppointmentSettingsController(req, res) {
    try {
        const payload = updateAppointmentSettingsSchema.parse(req.body);
        const settings = await updateTenantAppointmentSettings(
            req.prisma,
            req.tenantBusinessId,
            payload,
        );
        res.status(200).json({ settings });
    } catch (error) {
        if (error instanceof ZodError) return sendZodError(res, error);
        console.error("(appointment.controller): update settings", error);
        res.status(500).json({ message: "No se pudo guardar la configuración de citas." });
    }
}

export async function getAppointmentPublicLinkController(req, res) {
    try {
        res.status(200).json({
            publicLink: buildPublicAppointmentUrl(req.tenantBusinessId),
            businessId: req.tenantBusinessId,
        });
    } catch (error) {
        console.error("(appointment.controller): public link", error);
        res.status(500).json({ message: "No se pudo obtener el link público." });
    }
}

export async function listAppointmentsController(req, res) {
    try {
        const query = listAppointmentsQuerySchema.parse(req.query);
        const appointments = await listTenantAppointments(req.prisma, query);
        res.status(200).json({ appointments });
    } catch (error) {
        if (error instanceof ZodError) return sendZodError(res, error);
        console.error("(appointment.controller): list", error);
        res.status(500).json({ message: "No se pudieron cargar las citas." });
    }
}

export async function patchAppointmentController(req, res) {
    try {
        const payload = patchAppointmentSchema.parse(req.body);
        const timezone = resolveBusinessTimezone(req.businessTimezone);
        const appointment = await patchTenantAppointment(
            req.prisma,
            timezone,
            req.params.appointmentId,
            payload,
        );
        res.status(200).json({ appointment });
    } catch (error) {
        if (error instanceof ZodError) return sendZodError(res, error);
        const status = error.statusCode || 500;
        if (status >= 500) {
            console.error("(appointment.controller): patch", error);
        }
        res.status(status).json({
            message: error.message || "No se pudo actualizar la cita.",
            code: error.code,
        });
    }
}

export async function listTenantSlotsController(req, res) {
    try {
        const parsed = publicSlotsQuerySchema.parse(req.query);
        const timezone = resolveBusinessTimezone(req.businessTimezone);
        const result = await getTenantAvailableSlots(req.prisma, timezone, {
            ...parsed,
            excludeAppointmentId: req.query.excludeAppointmentId || null,
        });
        res.status(200).json(result);
    } catch (error) {
        if (error instanceof ZodError) return sendZodError(res, error);
        console.error("(appointment.controller): tenant slots", error);
        res.status(500).json({ message: "No se pudieron cargar los horarios." });
    }
}
