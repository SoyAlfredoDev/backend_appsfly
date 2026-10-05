import * as adminService from "../services/adminService.js";
import {
    assignBusinessPlan,
    recordBusinessLinkPayment,
} from "../services/billing/adminBusinessSubscription.js";
import {
    getAdminSubscriptionCancellations as fetchAdminSubscriptionCancellations,
} from "../services/mercadopago/mpSubscriptionBillingService.js";

export const getDashboardKpis = async (req, res) => {
    try {
        const kpis = await adminService.getKpis();
        res.json(kpis);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAdminSubscriptions = async (req, res) => {
    try {
        const subscriptions = await adminService.getSubscriptions();
        res.json(subscriptions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAdminBusinesses = async (req, res) => {
    try {
        const businesses = await adminService.getBusinesses();
        res.json(businesses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAdminBusinessById = async (req, res) => {
    try {
        const { id } = req.params;
        const detail = await adminService.getBusinessDetail(id);
        if (!detail) {
            return res.status(404).json({ message: "Negocio no encontrado." });
        }
        res.json(detail);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAdminUsers = async (req, res) => {
    try {
        const users = await adminService.getUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAdminPayments = async (req, res) => {
    try {
        const data = await adminService.getSubscriptionPayments();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

function adminUserId(req) {
    return req.user?.payload?.id ?? null;
}

function sendAdminError(res, error, fallback) {
    const status = Number.isInteger(error.statusCode) ? error.statusCode : 500;
    return res.status(status).json({
        message: error.message || fallback,
        ...(error.code ? { code: error.code } : {}),
    });
}

export const assignAdminBusinessPlan = async (req, res) => {
    try {
        const userId = adminUserId(req);
        const { planId } = req.body ?? {};
        if (!userId) {
            return res.status(401).json({ message: "Sesión inválida.", code: "AUTH_REQUIRED" });
        }
        if (!planId) {
            return res.status(400).json({ message: "Falta el plan.", code: "PLAN_ID_REQUIRED" });
        }
        const result = await assignBusinessPlan({
            businessId: req.params.id,
            planId,
            adminUserId: userId,
        });
        return res.status(200).json(result);
    } catch (error) {
        console.error("(adminController.js): Error assigning business plan:", error);
        return sendAdminError(res, error, "No se pudo cambiar el plan.");
    }
};

export const recordAdminBusinessLinkPayment = async (req, res) => {
    try {
        const userId = adminUserId(req);
        if (!userId) {
            return res.status(401).json({ message: "Sesión inválida.", code: "AUTH_REQUIRED" });
        }
        const result = await recordBusinessLinkPayment({
            businessId: req.params.id,
            adminUserId: userId,
        });
        return res.status(201).json(result);
    } catch (error) {
        console.error("(adminController.js): Error recording link payment:", error);
        return sendAdminError(res, error, "No se pudo registrar el pago del link.");
    }
};

export const getAdminSubscriptionCancellations = async (req, res) => {
    try {
        const limit = req.query.limit;
        const records = await fetchAdminSubscriptionCancellations({ limit });
        res.json({ cancellations: records, total: records.length });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
