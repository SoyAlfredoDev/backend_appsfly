import { Router } from "express";
import { createUserBusinessController, getUserBusinessByIdController } from "../controllers/userBusiness.controller.js";
import { authRequired } from "../middlewares/auth.middleware.js";

const router = Router();

router.post('/userBusiness', authRequired, createUserBusinessController);
router.get('/userBusiness', authRequired, getUserBusinessByIdController);

export default router;  
