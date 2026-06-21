import { Router } from "express";
import {
    getUsersController,
    validateRutExists,
    getUserByIdController,
    userIsSuperAdminController,
    userIsPlatformOwnerController,
    updateUserConfirmEmailController,
    countUsersController,
    sendUserConfirmEmailController,
} from "../controllers/user.controller.js";
import { getUsersControllerBusinessDB } from "../controllers/businessDB/user.controller.js";
import { authRequired } from "../middlewares/auth.middleware.js";
import { dbSelectorMiddleware } from "../middlewares/dbSelectorMiddleware.js";

const router = Router();

// --- 1. Rutas Específicas y de Listado (Van primero) ---
router.get('/users', authRequired, getUsersController);

router.get('/users/validateRutExists/:rut', authRequired, validateRutExists);

// Es vital que esta vaya ANTES de /users/:id para que "isSuperAdmin" no se confunda con un ID
router.get('/users/isSuperAdmin', authRequired, userIsSuperAdminController);
router.get('/users/isPlatformOwner', authRequired, userIsPlatformOwnerController);

// Rutas con middleware especial (Multi-tenancy)
router.get('/db/users', authRequired, dbSelectorMiddleware, getUsersControllerBusinessDB);

// Rutas de conteo
router.get('/users/count', authRequired, countUsersController);

// --- 2. Rutas Dinámicas (Con :id) ---
router.post('/users/:id/send-confirm-email', authRequired, sendUserConfirmEmailController);
router.put('/users/:id/confirm-email', updateUserConfirmEmailController);

// Esta ruta "comodín" debe ir al final de los GETs para no interceptar otras rutas
router.get('/users/:id', authRequired, getUserByIdController);

export default router;