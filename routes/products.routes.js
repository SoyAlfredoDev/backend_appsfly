import { Router } from "express";
import {
    createProductController,
    getProductsController,
    getProductViewController,
    updateProductController,
    getProductByIdController,
} from "../controllers/product.controller.js";

import { authRequired } from "../middlewares/auth.middleware.js";
import { dbSelectorMiddleware } from "../middlewares/dbSelectorMiddleware.js";
import { requireTenantAdmin } from "../middlewares/tenantRole.middleware.js";

const router = Router();
const auth = [authRequired, dbSelectorMiddleware];

router.post("/products", ...auth, requireTenantAdmin, createProductController);
router.get("/products", ...auth, getProductsController);
router.get("/products/:id/view", ...auth, getProductViewController);
router.get("/products/:id", ...auth, getProductByIdController);
router.put("/products/:id", ...auth, requireTenantAdmin, updateProductController);

export default router;
