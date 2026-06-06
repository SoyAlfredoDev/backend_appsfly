import {
    getMonthlySalesReport,
    getYearlySalesReport,
    getInventoryMovementsReport,
} from "../services/reportsService.js";

const REPORT_ERRORS = {
    INVALID_DATE_RANGE: "Rango de fechas inválido.",
    INVALID_DATE_ORDER: "La fecha de inicio debe ser anterior a la fecha de fin.",
    DATE_RANGE_TOO_LARGE: "El rango máximo permitido es de 366 días.",
};

export const generateReportController = async (req, res) => {
    try {
        const { type } = req.params;
        const prisma = req.prisma;

        switch (type) {
            case "monthly-sales": {
                const month = Number(req.query.month);
                const year = Number(req.query.year);
                if (!month || month < 1 || month > 12 || !year || year < 2000) {
                    return res.status(400).json({ error: "Mes y año inválidos." });
                }
                const data = await getMonthlySalesReport(month, year, prisma);
                return res.status(200).json(data);
            }
            case "yearly-sales": {
                const year = Number(req.query.year);
                if (!year || year < 2000) {
                    return res.status(400).json({ error: "Año inválido." });
                }
                const data = await getYearlySalesReport(year, prisma);
                return res.status(200).json(data);
            }
            case "inventory-movements": {
                const { startDate, endDate, categoryId } = req.query;
                if (!startDate || !endDate) {
                    return res.status(400).json({ error: "Debes indicar fecha de inicio y fin." });
                }
                try {
                    const data = await getInventoryMovementsReport(
                        {
                            startDate,
                            endDate,
                            categoryId: categoryId || null,
                        },
                        prisma,
                    );
                    return res.status(200).json(data);
                } catch (rangeError) {
                    const message = REPORT_ERRORS[rangeError.message];
                    if (message) {
                        return res.status(400).json({ error: message });
                    }
                    throw rangeError;
                }
            }
            default:
                return res.status(404).json({ error: "Tipo de reporte no encontrado." });
        }
    } catch (error) {
        console.error("(reports.controller):", error);
        return res.status(500).json({ error: "No se pudo generar el reporte." });
    }
};
