import { Router } from "express";
import { getTotalFromColumnController, getCountDataTableController, deleteByTableAndIdController } from "../controllers/utils.controller.js";
import { authRequired } from "../middlewares/auth.middleware.js";
import { dbSelectorMiddleware } from "../middlewares/dbSelectorMiddleware.js";
import { requireTenantAdmin } from "../middlewares/tenantRole.middleware.js";

const router = Router();
const admin = [authRequired, dbSelectorMiddleware, requireTenantAdmin];

router.get("/utils/total/:tableName/:columnName", ...admin, getTotalFromColumnController);
router.get("/utils/count/:tableName", ...admin, getCountDataTableController);
router.delete("/utils/delete/:tableName/:id", ...admin, deleteByTableAndIdController);

export default router;
