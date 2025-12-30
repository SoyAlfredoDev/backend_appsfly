import { Router } from "express";
import { createBusinessController, getBusinessController, getBusinessByIdController, countBusinessController } from "../controllers/business.controller.js";
import { authRequired } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/business", authRequired, createBusinessController);
router.get("/business", authRequired, getBusinessController);
router.get("/business/count", authRequired, countBusinessController)
router.get("/business/:businessId", authRequired, getBusinessByIdController);

export default router;
