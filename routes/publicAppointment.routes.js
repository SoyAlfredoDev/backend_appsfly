import { Router } from "express";
import {
    appointmentManagementController,
    createPublicAppointmentController,
    getPublicAppointmentPageController,
    getPublicAppointmentSlotsController,
} from "../controllers/publicAppointment.controller.js";

const router = Router();

router.get("/public/appointments/:businessId", getPublicAppointmentPageController);
router.get("/public/appointments/:businessId/slots", getPublicAppointmentSlotsController);
router.get("/public/appointments/:businessId/manage", appointmentManagementController);
router.patch("/public/appointments/:businessId/manage", appointmentManagementController);
router.post("/public/appointments/:businessId", createPublicAppointmentController);

export default router;
