import { Router } from "express";
import {
    createPrescriptionController,
    listPrescriptionsByCustomerController,
    getPrescriptionByIdController,
    updatePrescriptionController,
    deletePrescriptionController,
} from "../controllers/prescription.controller.js";
import { authRequired } from "../middlewares/auth.middleware.js";
import { dbSelectorMiddleware } from "../middlewares/dbSelectorMiddleware.js";

const router = Router();
const auth = [authRequired, dbSelectorMiddleware];

router.get("/customers/:customerId/prescriptions", ...auth, listPrescriptionsByCustomerController);
router.post("/customers/:customerId/prescriptions", ...auth, createPrescriptionController);
router.get("/prescriptions/:prescriptionId", ...auth, getPrescriptionByIdController);
router.put("/prescriptions/:prescriptionId", ...auth, updatePrescriptionController);
router.delete("/prescriptions/:prescriptionId", ...auth, deletePrescriptionController);

export default router;
