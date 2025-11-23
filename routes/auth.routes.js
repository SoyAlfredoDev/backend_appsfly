import { Router } from "express";
import { register, login, logout, verifyAuthController } from "../controllers/auth.controller.js";

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/verify', verifyAuthController);
router.get('/', (req, res) => {
    res.send('API is running...');
});

export default router;
