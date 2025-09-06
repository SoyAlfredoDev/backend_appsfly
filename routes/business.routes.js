import { Router } from "express";
import { createBusinessController } from "../controllers/business.controller.js";
import { authRequired } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/business", authRequired, createBusinessController);

export default router;
