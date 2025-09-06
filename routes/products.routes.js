import { Router } from "express";
import { createProductController, getProductsController } from "../controllers/product.controller.js";
import { authRequired } from "../middlewares/auth.middleware.js";
import { dbSelectorMiddleware } from "../middlewares/dbSelectorMiddleware.js";

const router = Router();

router.post('/products', authRequired, dbSelectorMiddleware, createProductController);
router.get('/products', authRequired, dbSelectorMiddleware, getProductsController);

export default router;
