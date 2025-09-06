import { Router } from "express";
import { createCategoryController, getCategoriesController } from "../controllers/categories.controller.js";
import { authRequired } from "../middlewares/auth.middleware.js";
import { dbSelectorMiddleware } from "../middlewares/dbSelectorMiddleware.js"

const router = Router();

router.post('/categories', authRequired, dbSelectorMiddleware, createCategoryController);
router.get('/categories', authRequired, dbSelectorMiddleware, getCategoriesController);


export default router;
