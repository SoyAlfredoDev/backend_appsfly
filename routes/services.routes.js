import { Router } from "express";
import { createServiceController, getServicesController } from "../controllers/services.controller.js";
import { authRequired } from "../middlewares/auth.middleware.js";
import { dbSelectorMiddleware } from "../middlewares/dbSelectorMiddleware.js"

const router = Router();

router.post('/services', authRequired, dbSelectorMiddleware, createServiceController);
router.get('/services', authRequired, dbSelectorMiddleware, getServicesController);

export default router;
