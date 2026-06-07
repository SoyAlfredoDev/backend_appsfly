import * as adminService from "../services/adminService.js";
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

export const getAdminSubscriptionCancellations = async (req, res) => {
    try {
        const limit = req.query.limit;
        const records = await fetchAdminSubscriptionCancellations({ limit });
        res.json({ cancellations: records, total: records.length });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
