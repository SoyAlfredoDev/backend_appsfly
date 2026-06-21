import { Router } from 'express';

import { authRequired } from "../middlewares/auth.middleware.js";
import { dbSelectorMiddleware } from "../middlewares/dbSelectorMiddleware.js";
import { requireTenantAdmin } from "../middlewares/tenantRole.middleware.js";
import { createDailySaleController, getDailySalesController, getDailySaleByIdController, getClosureStatusController, closeAllPendingClosuresController, getDailySaleDetailController } from '../controllers/dailySalesRoutes.controller.js';

const router = Router();
const auth = [authRequired, dbSelectorMiddleware];
const admin = [...auth, requireTenantAdmin];

router.post('/dailySales', ...admin, createDailySaleController);
router.post('/dailySales/close-all-pending', ...admin, closeAllPendingClosuresController);
router.get('/dailySales/closure-status', ...auth, getClosureStatusController);
router.get('/dailySales', ...admin, getDailySalesController);
router.get('/dailySales/:id/detail', ...admin, getDailySaleDetailController);
router.get('/dailySales/:id', ...admin, getDailySaleByIdController);

export default router;
