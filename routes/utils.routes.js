import { Router } from "express";
import { getTotalFromColumnController, getCountDataTableController, deleteByTableAndIdController } from "../controllers/utils.controller.js";
import { authRequired } from "../middlewares/auth.middleware.js";
import { dbSelectorMiddleware } from "../middlewares/dbSelectorMiddleware.js"

const router = Router();

router.get('/utils/total/:tableName/:columnName', authRequired, dbSelectorMiddleware, getTotalFromColumnController);
router.get('/utils/count/:tableName', authRequired, dbSelectorMiddleware, getCountDataTableController);
router.delete('/utils/delete/:tableName/:id', authRequired, dbSelectorMiddleware, deleteByTableAndIdController);

export default router;
