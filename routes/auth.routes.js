import { Router } from "express";
import { register, login, logout, verifyAuthController, forgotPassword, resetPassword } from "../controllers/auth.controller.js";

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.get('/verify', verifyAuthController);
router.get('/', (req, res) => {
    res.send('API is running...');
});

export default router;
