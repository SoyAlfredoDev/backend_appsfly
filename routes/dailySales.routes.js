import { Router } from 'express';

import { authRequired } from "../middlewares/auth.middleware.js";
import { dbSelectorMiddleware } from "../middlewares/dbSelectorMiddleware.js";
import { createDailySaleController, getDailySalesController } from '../controllers/dailySalesRoutes.controller.js';

const router = Router();
router.post('/dailySales', authRequired, dbSelectorMiddleware, createDailySaleController);
router.get('/dailySales', authRequired, dbSelectorMiddleware, getDailySalesController);





export default router;