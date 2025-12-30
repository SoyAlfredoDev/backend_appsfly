import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { createPurchaseController } from "../controllers/purchases.controller.js";

const router = Router();

router.use(verifyToken);

router.post("/", createPurchaseController);

export default router;
