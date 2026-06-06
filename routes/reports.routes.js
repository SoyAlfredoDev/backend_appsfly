import { Router } from "express";
import { authRequired } from "../middlewares/auth.middleware.js";
import { dbSelectorMiddleware } from "../middlewares/dbSelectorMiddleware.js";
import { generateReportController } from "../controllers/reports.controller.js";

const router = Router();

router.get(
    "/reports/:type",
    authRequired,
    dbSelectorMiddleware,
    generateReportController,
);

export default router;
