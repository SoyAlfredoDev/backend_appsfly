import { ZodError } from "zod";
import {
    createPublicAppointmentSchema,
    publicSlotsQuerySchema,
} from "../services/appointment/appointmentSchemas.js";
import {
    createPublicAppointment,
    getPublicAppointmentPage,
    getPublicAvailableSlots,
} from "../services/appointment/appointmentService.js";

function sendZodError(res, error) {
    return res.status(400).json({
        message: error.issues?.[0]?.message || "Datos inválidos.",
        code: "VALIDATION_ERROR",
        issues: error.issues,
    });
}

export async function getPublicAppointmentPageController(req, res) {
    try {
        const { businessId } = req.params;
        const page = await getPublicAppointmentPage(businessId);
        res.status(200).json(page);
    } catch (error) {
        const status = error.statusCode || 500;
        if (status >= 500) {
            console.error("(publicAppointment.controller): page", error);
        }
        res.status(status).json({
            message: error.message || "No se pudo cargar el agendamiento.",
            code: error.code,
        });
    }
}

export async function getPublicAppointmentSlotsController(req, res) {
    try {
        const { businessId } = req.params;
        const query = publicSlotsQuerySchema.parse(req.query);
        const result = await getPublicAvailableSlots(businessId, query);
        res.status(200).json(result);
    } catch (error) {
        if (error instanceof ZodError) return sendZodError(res, error);
        const status = error.statusCode || 500;
        if (status >= 500) {
            console.error("(publicAppointment.controller): slots", error);
        }
        res.status(status).json({
            message: error.message || "No se pudieron cargar los horarios.",
            code: error.code,
        });
    }
}

export async function createPublicAppointmentController(req, res) {
    try {
        const { businessId } = req.params;
        const payload = createPublicAppointmentSchema.parse(req.body);
        const appointment = await createPublicAppointment(businessId, payload);
        res.status(201).json({ appointment });
    } catch (error) {
        if (error instanceof ZodError) return sendZodError(res, error);
        const status = error.statusCode || 500;
        if (status >= 500) {
            console.error("(publicAppointment.controller): create", error);
        }
        res.status(status).json({
            message: error.message || "No se pudo agendar la cita.",
            code: error.code,
        });
    }
}
