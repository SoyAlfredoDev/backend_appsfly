import { Router } from "express";
import { createCustomerController, getCustomerController, validateRutExists, deleteCustomerByIdController, getCustomerByIdController, updateCustomerController } from "../controllers/customer.controller.js";
import { authRequired } from "../middlewares/auth.middleware.js";
import { dbSelectorMiddleware } from "../middlewares/dbSelectorMiddleware.js";
import { requireTenantAdmin } from "../middlewares/tenantRole.middleware.js";

const router = Router();
const auth = [authRequired, dbSelectorMiddleware];

router.post('/customers', ...auth, createCustomerController);
router.get('/customers', ...auth, getCustomerController);
router.get('/customers/validateRutExists/:rut', ...auth, validateRutExists);
router.get('/customers/:customerId', ...auth, getCustomerByIdController);
router.put('/customers/:customerId', ...auth, updateCustomerController);
router.delete('/customers/:customerId', ...auth, requireTenantAdmin, deleteCustomerByIdController);

export default router;
