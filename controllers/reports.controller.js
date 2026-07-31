import {
    getMonthlySalesReport,
    getYearlySalesReport,
    getInventoryMovementsReport,
    getSalesBySellerReport,
} from "../services/reportsService.js";
import { assertUserBelongsToBusiness } from "../services/userBusinessService.js";
import { DEFAULT_BUSINESS_TIMEZONE } from "../libs/businessTimezone.js";

const REPORT_ERRORS = {
    INVALID_DATE_RANGE: "Rango de fechas inválido.",
    INVALID_DATE_ORDER: "La fecha de inicio debe ser anterior a la fecha de fin.",
    DATE_RANGE_TOO_LARGE: "El rango máximo permitido es de 366 días.",
    INVALID_SELLER: "El vendedor seleccionado no pertenece a este negocio.",
};

const tzOf = (req) => req.businessTimezone || DEFAULT_BUSINESS_TIMEZONE;

export const generateReportController = async (req, res) => {
    try {
        const { type } = req.params;
        const prisma = req.prisma;
        const timeZone = tzOf(req);

        switch (type) {
            case "monthly-sales": {
                const month = Number(req.query.month);
                const year = Number(req.query.year);
                if (!month || month < 1 || month > 12 || !year || year < 2000) {
                    return res.status(400).json({ error: "Mes y año inválidos." });
                }
                const data = await getMonthlySalesReport(month, year, prisma, timeZone);
                return res.status(200).json(data);
            }
            case "yearly-sales": {
                const year = Number(req.query.year);
                if (!year || year < 2000) {
                    return res.status(400).json({ error: "Año inválido." });
                }
                const data = await getYearlySalesReport(year, prisma, timeZone);
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
                        timeZone,
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
            case "sales-by-seller": {
                const { startDate, endDate, sellerId } = req.query;
                if (!startDate || !endDate) {
                    return res.status(400).json({ error: "Debes indicar fecha de inicio y fin." });
                }

                const trimmedSellerId = sellerId?.trim() || null;
                if (trimmedSellerId) {
                    const membership = await assertUserBelongsToBusiness(
                        trimmedSellerId,
                        req.tenantBusinessId,
                    );
                    if (!membership) {
                        return res.status(400).json({ error: REPORT_ERRORS.INVALID_SELLER });
                    }
                }

                try {
                    const data = await getSalesBySellerReport(
                        {
                            startDate,
                            endDate,
                            sellerId: trimmedSellerId,
                        },
                        prisma,
                        timeZone,
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
