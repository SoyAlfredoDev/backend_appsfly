import { Router } from "express";
import { register, login, logout } from "../controllers/auth.controller.js";
import { dbSelectorMiddleware } from "../middlewares/dbSelectorMiddleware.js";

const router = Router();

router.post('/register', dbSelectorMiddleware, register);

router.post('/login', dbSelectorMiddleware, login);

router.post('/logout', logout)

export default router;
