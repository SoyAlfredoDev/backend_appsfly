import { Router } from 'express';
import { authRequired } from '../middlewares/auth.middleware.js';
import { superAdminRequired } from '../middlewares/superAdminMiddleware.js';
import * as adminController from '../controllers/adminController.js';
import * as adminPlanController from '../controllers/adminPlan.controller.js';

const router = Router();

router.get('/admin/kpis', authRequired, superAdminRequired, adminController.getDashboardKpis);
router.get('/admin/subscriptions', authRequired, superAdminRequired, adminController.getAdminSubscriptions);
router.get('/admin/businesses', authRequired, superAdminRequired, adminController.getAdminBusinesses);
router.get('/admin/businesses/:id', authRequired, superAdminRequired, adminController.getAdminBusinessById);
router.get('/admin/users', authRequired, superAdminRequired, adminController.getAdminUsers);
router.get('/admin/payments', authRequired, superAdminRequired, adminController.getAdminPayments);

router.get('/admin/plans', authRequired, superAdminRequired, adminPlanController.getAdminPlans);
router.post('/admin/plans', authRequired, superAdminRequired, adminPlanController.createAdminPlan);
router.patch('/admin/plans/:id', authRequired, superAdminRequired, adminPlanController.updateAdminPlan);
router.patch('/admin/plans/:id/status', authRequired, superAdminRequired, adminPlanController.suspendAdminPlan);
router.delete('/admin/plans/:id', authRequired, superAdminRequired, adminPlanController.deleteAdminPlan);

export default router;
