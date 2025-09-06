import { Router } from "express";
import { createCustomerController, getCustomerController, validateRutExists } from "../controllers/customer.controller.js";
import { authRequired } from "../middlewares/auth.middleware.js";
import { dbSelectorMiddleware } from "../middlewares/dbSelectorMiddleware.js"

const router = Router();

router.post('/customers', authRequired, dbSelectorMiddleware, createCustomerController);
router.get('/customers', authRequired, dbSelectorMiddleware, getCustomerController);
router.get('/customers/validateRutExists/:rut', authRequired, dbSelectorMiddleware, validateRutExists);

export default router;