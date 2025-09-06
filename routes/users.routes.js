import { Router } from "express";
import { getUsersController, validateRutExists } from "../controllers/user.controller.js";
import { getUsersControllerBusinessDB } from "../controllers/businessDB/user.controller.js"
import { authRequired } from "../middlewares/auth.middleware.js";
import { dbSelectorMiddleware } from "../middlewares/dbSelectorMiddleware.js"

const router = Router();

router.get('/users', authRequired, getUsersController);
router.get('/users/validateRutExists/:rut', authRequired, validateRutExists);

router.get('/db/users/', authRequired, dbSelectorMiddleware, getUsersControllerBusinessDB);

export default router;
