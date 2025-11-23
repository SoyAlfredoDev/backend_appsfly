import { Router } from "express";
import { createBusinessController, getBusinessController } from "../controllers/business.controller.js";
import { authRequired } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/business", authRequired, createBusinessController);
router.get("/business", authRequired, getBusinessController);




export default router;
