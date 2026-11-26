import { raw, Router, urlencoded } from 'express';
import { newsletterUnsubscribeController } from '../controllers/newsletterUnsubscribe.controller.js';
import * as newsletterController from '../controllers/newsletterController.js';

const router = Router();

router.post('/newsletter/subscribe', newsletterController.subscribe);
router.get('/newsletter/unsubscribe/:token', newsletterUnsubscribeController);
router.post(
    '/newsletter/unsubscribe/:token',
    urlencoded({ extended: false, limit: '1kb' }),
    raw({ type: 'multipart/form-data', limit: '1kb' }),
    newsletterUnsubscribeController,
);

export default router;
