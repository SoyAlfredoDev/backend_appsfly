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

const router = Router();
const auth = [authRequired, dbSelectorMiddleware];

/** Laboratorios */
router.get("/laboratories", ...auth, getLaboratoriesController);
router.post("/laboratories", ...auth, createLaboratoryController);
router.get("/laboratories/:id", ...auth, getLaboratoryByIdController);
router.put("/laboratories/:id", ...auth, updateLaboratoryController);
router.delete("/laboratories/:id", ...auth, deleteLaboratoryController);

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
router.get("/lab-dispatches", ...auth, listLabDispatchesController);
router.post("/lab-dispatches", ...auth, createLabDispatchController);
router.get("/lab-dispatches/:id", ...auth, getLabDispatchByIdController);
router.patch("/lab-dispatches/:id/receive", ...auth, receiveLabDispatchController);

export default router;
