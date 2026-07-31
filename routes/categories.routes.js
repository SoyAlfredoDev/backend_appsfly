import { Router } from "express";
import {
    createCategoryController,
    getCategoriesController,
    updateCategoryController,
    deleteCategoryController,
    createCategoryAttributeController,
    updateCategoryAttributeController,
    deleteCategoryAttributeController,
} from "../controllers/categories.controller.js";
import { authRequired } from "../middlewares/auth.middleware.js";
import { dbSelectorMiddleware } from "../middlewares/dbSelectorMiddleware.js";
import { requireTenantAdmin } from "../middlewares/tenantRole.middleware.js";

const router = Router();
const auth = [authRequired, dbSelectorMiddleware];
const admin = [...auth, requireTenantAdmin];

router.post("/categories", ...admin, createCategoryController);
router.get("/categories", ...auth, getCategoriesController);
router.put("/categories/:id", ...admin, updateCategoryController);
router.delete("/categories/:id", ...admin, deleteCategoryController);

router.post("/categories/:id/attributes", ...admin, createCategoryAttributeController);
router.put("/categories/:id/attributes/:attributeId", ...admin, updateCategoryAttributeController);
router.patch("/categories/:id/attributes/:attributeId", ...admin, updateCategoryAttributeController);
router.delete("/categories/:id/attributes/:attributeId", ...admin, deleteCategoryAttributeController);

export default router;
