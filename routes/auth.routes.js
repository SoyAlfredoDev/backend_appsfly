import { Router } from "express";
import { register, login, logout, verifyAuthController, forgotPassword, resetPassword } from "../controllers/auth.controller.js";
import { authRateLimit } from "../services/auth/rateLimit.ts";

const router = Router();

router.post('/register', authRateLimit, register);
router.post('/login', authRateLimit, login);
router.post('/logout', logout);
router.post('/forgot-password', authRateLimit, forgotPassword);
router.post('/reset-password', authRateLimit, resetPassword);
router.get('/verify', verifyAuthController);
router.get('/', (req, res) => {
    res.send('API is running...');
});

export default router;
