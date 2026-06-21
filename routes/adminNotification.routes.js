import { Router } from "express";
import { authRequired } from "../middlewares/auth.middleware.js";
import { superAdminRequired } from "../middlewares/superAdminMiddleware.js";
import {
    clearAdminNotificationsController,
    getAdminNotificationsUnreadCountController,
    listAdminNotificationsController,
    markAdminNotificationReadController,
    markAllAdminNotificationsReadController,
} from "../controllers/adminNotification.controller.js";

const router = Router();

router.get(
    "/admin/notifications",
    authRequired,
    superAdminRequired,
    listAdminNotificationsController,
);

router.get(
    "/admin/notifications/unread-count",
    authRequired,
    superAdminRequired,
    getAdminNotificationsUnreadCountController,
);

router.patch(
    "/admin/notifications/:id/read",
    authRequired,
    superAdminRequired,
    markAdminNotificationReadController,
);

router.post(
    "/admin/notifications/mark-all-read",
    authRequired,
    superAdminRequired,
    markAllAdminNotificationsReadController,
);

router.post(
    "/admin/notifications/clear",
    authRequired,
    superAdminRequired,
    clearAdminNotificationsController,
);

export default router;
