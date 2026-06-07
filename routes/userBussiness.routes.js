import { Router } from "express";
import {
    createUserBusinessController,
    getUserBusinessByIdController,
    getBusinessMembersController,
} from "../controllers/userBusiness.controller.js";
import { authRequired } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/userBusiness", authRequired, createUserBusinessController);
router.get("/userBusiness", authRequired, getUserBusinessByIdController);
router.get("/userBusiness/:businessId/members", authRequired, getBusinessMembersController);

export default router;
