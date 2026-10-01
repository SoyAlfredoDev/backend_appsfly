import { Router } from "express";
import { sendEmailController } from "../controllers/email.controller.js";
import { authRequired } from "../middlewares/auth.middleware.js";
import { superAdminRequired } from "../middlewares/superAdminMiddleware.js";

const router = Router();

router.post("/send-email", authRequired, superAdminRequired, sendEmailController);

export default router;
