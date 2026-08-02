import { Router } from "express";
import { authRequired } from "../middlewares/auth.middleware.js";
import { dbSelectorMiddleware } from "../middlewares/dbSelectorMiddleware.js";
import {
    getAppointmentPublicLinkController,
    getAppointmentSettingsController,
    listAppointmentsController,
    listTenantSlotsController,
    patchAppointmentController,
    updateAppointmentSettingsController,
} from "../controllers/appointment.controller.js";

const router = Router();
const auth = [authRequired, dbSelectorMiddleware];

router.get("/appointments/settings", ...auth, getAppointmentSettingsController);
router.put("/appointments/settings", ...auth, updateAppointmentSettingsController);
router.get("/appointments/public-link", ...auth, getAppointmentPublicLinkController);
router.get("/appointments/slots", ...auth, listTenantSlotsController);
router.get("/appointments", ...auth, listAppointmentsController);
router.patch("/appointments/:appointmentId", ...auth, patchAppointmentController);

export default router;
