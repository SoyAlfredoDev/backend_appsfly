import * as adminService from '../services/adminService.js';

export const getDashboardKpis = async (req, res) => {
    try {
        const kpis = await adminService.getKpis();
        res.json(kpis);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
