import { Router } from "express";
import { createProductController, getProductsController, getProductViewController } from "../controllers/product.controller.js";

import { authRequired } from "../middlewares/auth.middleware.js";
import { dbSelectorMiddleware } from "../middlewares/dbSelectorMiddleware.js";

const router = Router();

router.post('/products', authRequired, dbSelectorMiddleware, createProductController);
router.get('/products', authRequired, dbSelectorMiddleware, getProductsController);
router.get('/products/:id/view', authRequired, dbSelectorMiddleware, getProductViewController);

export default router;
