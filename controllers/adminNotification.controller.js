import {
    listAdminNotifications,
    countUnreadAdminNotifications,
    markNotificationRead,
    markAllNotificationsRead,
    clearReadNotifications,
    clearAllNotifications,
} from "../services/adminNotificationService.js";

export const listAdminNotificationsController = async (req, res) => {
    try {
        const unreadOnly = req.query.unreadOnly === "true";
        const notifications = await listAdminNotifications({ unreadOnly });
        const unreadCount = await countUnreadAdminNotifications();
        return res.json({ notifications, unreadCount });
    } catch (error) {
        console.error("(adminNotifications.list):", error);
        return res.status(500).json({ message: "No se pudieron cargar las notificaciones." });
    }
};

export const getAdminNotificationsUnreadCountController = async (req, res) => {
    try {
        const unreadCount = await countUnreadAdminNotifications();
        return res.json({ unreadCount });
    } catch (error) {
        console.error("(adminNotifications.count):", error);
        return res.status(500).json({ message: "Error al contar notificaciones." });
    }
};

export const markAdminNotificationReadController = async (req, res) => {
    try {
        const notification = await markNotificationRead(req.params.id);
        return res.json(notification);
    } catch (error) {
        console.error("(adminNotifications.read):", error);
        return res.status(500).json({ message: "No se pudo marcar como leída." });
    }
};

export const markAllAdminNotificationsReadController = async (req, res) => {
    try {
        await markAllNotificationsRead();
        return res.json({ ok: true });
    } catch (error) {
        console.error("(adminNotifications.readAll):", error);
        return res.status(500).json({ message: "No se pudieron marcar las notificaciones." });
    }
};

export const clearAdminNotificationsController = async (req, res) => {
    try {
        const mode = req.body?.mode ?? "read";
        if (mode === "all") {
            await clearAllNotifications();
        } else {
            await clearReadNotifications();
        }
        return res.json({ ok: true });
    } catch (error) {
        console.error("(adminNotifications.clear):", error);
        return res.status(500).json({ message: "No se pudieron limpiar las notificaciones." });
    }
};
