import { Router } from 'express';
import * as adminController from '../controllers/adminController.js';

const router = Router();

router.get('/admin/kpis', adminController.getDashboardKpis);

export default router;
