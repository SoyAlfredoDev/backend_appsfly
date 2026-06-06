import { Router } from 'express';

import { authRequired } from "../middlewares/auth.middleware.js";
import { dbSelectorMiddleware } from "../middlewares/dbSelectorMiddleware.js";
import { createDailySaleController, getDailySalesController, getDailySaleByIdController, getClosureStatusController, closeAllPendingClosuresController, getDailySaleDetailController } from '../controllers/dailySalesRoutes.controller.js';

const router = Router();
router.post('/dailySales', authRequired, dbSelectorMiddleware, createDailySaleController);
router.post('/dailySales/close-all-pending', authRequired, dbSelectorMiddleware, closeAllPendingClosuresController);
router.get('/dailySales/closure-status', authRequired, dbSelectorMiddleware, getClosureStatusController);
router.get('/dailySales', authRequired, dbSelectorMiddleware, getDailySalesController);
router.get('/dailySales/:id/detail', authRequired, dbSelectorMiddleware, getDailySaleDetailController);
router.get('/dailySales/:id', authRequired, dbSelectorMiddleware, getDailySaleByIdController);





export default router;