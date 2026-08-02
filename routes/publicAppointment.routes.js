import { Router } from "express";
import {
    createPublicAppointmentController,
    getPublicAppointmentPageController,
    getPublicAppointmentSlotsController,
} from "../controllers/publicAppointment.controller.js";

const router = Router();

router.get("/public/appointments/:businessId", getPublicAppointmentPageController);
router.get("/public/appointments/:businessId/slots", getPublicAppointmentSlotsController);
router.post("/public/appointments/:businessId", createPublicAppointmentController);

export default router;
