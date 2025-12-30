import { Router } from 'express';
import * as newsletterController from '../controllers/newsletterController.js';

const router = Router();

router.post('/newsletter/subscribe', newsletterController.subscribe);

export default router;
