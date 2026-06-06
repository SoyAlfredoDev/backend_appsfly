import { Router } from "express";
import { createCustomerController, getCustomerController, validateRutExists, deleteCustomerByIdController, getCustomerByIdController, updateCustomerController } from "../controllers/customer.controller.js";
import { authRequired } from "../middlewares/auth.middleware.js";
import { dbSelectorMiddleware } from "../middlewares/dbSelectorMiddleware.js"

const router = Router();

router.post('/customers', authRequired, dbSelectorMiddleware, createCustomerController);
router.get('/customers', authRequired, dbSelectorMiddleware, getCustomerController);
router.get('/customers/:customerId', authRequired, dbSelectorMiddleware, getCustomerByIdController);
router.get('/customers/validateRutExists/:rut', authRequired, dbSelectorMiddleware, validateRutExists);
router.delete('/customers/:customerId', authRequired, dbSelectorMiddleware, deleteCustomerByIdController);
router.put('/customers/:customerId', authRequired, dbSelectorMiddleware, updateCustomerController);

export default router;