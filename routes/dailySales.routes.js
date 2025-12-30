import { Router } from 'express';

import { authRequired } from "../middlewares/auth.middleware.js";
import { dbSelectorMiddleware } from "../middlewares/dbSelectorMiddleware.js";
import { createDailySaleController, getDailySalesController, getDailySaleByIdController } from '../controllers/dailySalesRoutes.controller.js';

const router = Router();
router.post('/dailySales', authRequired, dbSelectorMiddleware, createDailySaleController);
router.get('/dailySales', authRequired, dbSelectorMiddleware, getDailySalesController);
router.get('/dailySales/:id', authRequired, dbSelectorMiddleware, getDailySaleByIdController);





export default router;