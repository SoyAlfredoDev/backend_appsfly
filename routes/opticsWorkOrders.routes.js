import { Router } from "express";
import {
    createLaboratoryController,
    getLaboratoriesController,
    getLaboratoryByIdController,
    updateLaboratoryController,
    deleteLaboratoryController,
} from "../controllers/laboratory.controller.js";
import {
    listWorkOrdersController,
    listWorkOrdersBySaleController,
    getWorkOrderByIdController,
    generateWorkOrdersController,
    updateWorkOrderController,
    updateWorkOrderStatusController,
    receiveWorkOrderController,
    deleteWorkOrderController,
} from "../controllers/workOrder.controller.js";
import {
    listLabDispatchesController,
    getLabDispatchByIdController,
    createLabDispatchController,
    receiveLabDispatchController,
} from "../controllers/labDispatch.controller.js";
import { authRequired } from "../middlewares/auth.middleware.js";
import { dbSelectorMiddleware } from "../middlewares/dbSelectorMiddleware.js";
import { requirePlanCapability } from "../middlewares/planCapability.middleware.js";

const router = Router();
const auth = [authRequired, dbSelectorMiddleware];

/** Laboratorios */
router.get("/laboratories", ...auth, requirePlanCapability("laboratories"), getLaboratoriesController);
router.post("/laboratories", ...auth, requirePlanCapability("laboratories"), createLaboratoryController);
router.get("/laboratories/:id", ...auth, requirePlanCapability("laboratories"), getLaboratoryByIdController);
router.put("/laboratories/:id", ...auth, requirePlanCapability("laboratories"), updateLaboratoryController);
router.delete("/laboratories/:id", ...auth, requirePlanCapability("laboratories"), deleteLaboratoryController);

/** Órdenes de Trabajo */
router.get("/work-orders", ...auth, listWorkOrdersController);
router.post("/work-orders/generate", ...auth, generateWorkOrdersController);
router.get("/work-orders/:id", ...auth, getWorkOrderByIdController);
router.put("/work-orders/:id", ...auth, updateWorkOrderController);
router.patch("/work-orders/:id/status", ...auth, updateWorkOrderStatusController);
router.patch("/work-orders/:id/receive", ...auth, receiveWorkOrderController);
router.delete("/work-orders/:id", ...auth, deleteWorkOrderController);
router.get("/sales/:saleId/work-orders", ...auth, listWorkOrdersBySaleController);

/** Despachos a laboratorio */
router.get("/lab-dispatches", ...auth, requirePlanCapability("lab_dispatches"), listLabDispatchesController);
router.post("/lab-dispatches", ...auth, requirePlanCapability("lab_dispatches"), createLabDispatchController);
router.get("/lab-dispatches/:id", ...auth, requirePlanCapability("lab_dispatches"), getLabDispatchByIdController);
router.patch("/lab-dispatches/:id/receive", ...auth, requirePlanCapability("lab_dispatches"), receiveLabDispatchController);

export default router;
