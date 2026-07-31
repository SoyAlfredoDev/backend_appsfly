import { createSale, getSaleById, getSales, getSalesForDashboardView, getMonthlySales, getDaySales, getSalesByCustomerIdService, countSalesMonthService, markSaleAsDelivered } from '../services/salesServices.js';
import { assertSaleWorkOrdersAllowDelivery } from '../services/workOrdersService.js';
import { sendSaleReceiptEmailToCustomer } from '../services/saleEmailService.js';
import { getOrCreateSaleShareLink } from '../services/salePublicShareService.js';
import defineSaleNumber from '../libs/defineSaleNumber.js';
import { isCreditSalesAllowed, isDeliveryControlEnabled } from '../services/businessSettingsService.js';
import { getBusinessByIdService } from '../services/businessService.js';
import { getTodayBusinessDate, DEFAULT_BUSINESS_TIMEZONE } from '../libs/businessTimezone.js';

const tzOf = (req) => req.businessTimezone || DEFAULT_BUSINESS_TIMEZONE;

export const createSaleController = async (req, res) => {
    try {
        const { saleId, saleCustomerId, saleTotal, saleTotalPayments, saleComment, saleImageUrl, documentType, saleDeliveryStatus } = req.body;
        const userId = req.user.payload.id
        const numberSale = await defineSaleNumber(req.prisma);

        const total = Number(saleTotal);
        const totalPayments = Number(saleTotalPayments);

        const creditAllowed = await isCreditSalesAllowed(req.tenantBusinessId);
        if (!creditAllowed && totalPayments !== total) {
            return res.status(400).json({
                message:
                    totalPayments < total
                        ? "Este negocio no permite ventas a crédito. Debes registrar un método de pago por el monto total de la venta."
                        : "El monto pagado debe ser exactamente igual al total de la venta.",
                code: "CREDIT_SALES_DISABLED",
            });
        }

        const formatOptionalUrl = (url) => {
            const trimmed = url?.trim();
            return trimmed || null;
        };

        const allowedDocTypes = ["RECEIPT", "BOLETA", "FACTURA"];
        const normalizedDocType = allowedDocTypes.includes(documentType)
            ? documentType
            : "RECEIPT";

        const deliveryControl = await isDeliveryControlEnabled(req.tenantBusinessId);
        const business = await getBusinessByIdService(req.tenantBusinessId);
        const isOptics = business?.businessType === "optics";
        // En óptica la entrega la marca el flujo de OT; no dejar PENDING al crear la venta.
        let normalizedDeliveryStatus = null;
        if (deliveryControl && saleDeliveryStatus === "PENDING" && !isOptics) {
            normalizedDeliveryStatus = "PENDING";
        }

        const data = {
            saleId,
            saleNumber: numberSale,
            saleCustomerId,
            createdByUserId: userId,
            saleTotal: total,
            saleTotalPayments: totalPayments,
            salePendingAmount: (total - totalPayments),
            saleComment,
            saleImageUrl: formatOptionalUrl(saleImageUrl),
            documentType: normalizedDocType,
            saleDeliveryStatus: normalizedDeliveryStatus,
        };
        const sale = await createSale(data, req.prisma);
        res.status(201).json({
            message: 'Sale created successfully',
            sale
        });
    } catch (error) {
        console.error("(sales.controller.js): Error creating sale:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getSalesController = async (req, res) => {
    try {
        const { page, limit, q, deliveryStatus } = req.query;
        const business = await getBusinessByIdService(req.tenantBusinessId);
        const deliveryByWorkOrders = business?.businessType === "optics";
        const result = await getSales(req.prisma, {
            page,
            limit,
            q,
            deliveryStatus,
            deliveryByWorkOrders,
        });
        res.status(200).json(result);
    } catch (error) {
        console.error("(sales.controller.js): Error fetching sales:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getDashboardSalesViewController = async (req, res) => {
    try {
        const { view } = req.params;
        const sales = await getSalesForDashboardView(view, req.prisma, tzOf(req));
        res.status(200).json(sales);
    } catch (error) {
        const status = error.statusCode ?? 500;
        if (status >= 500) {
            console.error("(sales.controller.js): Error fetching dashboard sales view:", error);
        }
        res.status(status).json({
            message: error.message ?? "Internal server error",
        });
    }
};

export const getSaleByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const sale = await getSaleById(id, req.prisma);
        if (!sale) {
            return res.status(404).json({ message: "Sale not found" });
        }
        res.status(200).json(sale);
    } catch (error) {
        console.error("(sales.controller.js): Error fetching sale by ID:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getMonthlySalescontroller = async (req, res) => {
    try {
        const { month, year } = req.params;
        res.status(200).json(await getMonthlySales(Number(month), Number(year), req.prisma, tzOf(req)));
    } catch (error) {
        console.error("(sales.controller.js): Error getting monthly sales:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getMonthlySalesNowController = async (req, res) => {
    try {
        const today = getTodayBusinessDate(tzOf(req));
        const [year, month] = today.split("-").map(Number);

        res.status(200).json(await getMonthlySales(month, year, req.prisma, tzOf(req)));
    } catch (error) {
        console.error("(sales.controller.js): Error getting monthly sales:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getDaySalesController = async (req, res) => {
    try {
        const { day, month, year } = req.params;
        res.status(200).json(await getDaySales(Number(day), Number(month), Number(year), req.prisma, tzOf(req)));
    } catch (error) {
        console.error("(sales.controller.js): Error getting day sales:", error);
        res.status(500).json({ message: "Internal server error" });

    }
};

export const getSalesByCustomerIdController = async (req, res) => {
    try {
        const { customerId } = req.params;
        const salesFound = await getSalesByCustomerIdService(customerId, req.prisma);
        res.status(200).json(salesFound);
    } catch (error) {
        console.error("(sales.controller.js): Error getting sales by customer ID:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const countSalesMonthController = async (req, res) => {
    try {
        const { month, year } = req.params;
        res.status(200).json(await countSalesMonthService(Number(month), Number(year), req.prisma, tzOf(req)));
    } catch (error) {
        console.error("(sales.controller.js): Error counting sales:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const markSaleDeliveredController = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.payload.id;

        const deliveryControl = await isDeliveryControlEnabled(req.tenantBusinessId);
        if (!deliveryControl) {
            return res.status(400).json({
                message: "El control de entrega no está habilitado para este negocio.",
                code: "DELIVERY_CONTROL_DISABLED",
            });
        }

        // Óptica: si la venta tiene OT, todas deben estar entregadas al cliente
        const business = await getBusinessByIdService(req.tenantBusinessId);
        if (business?.businessType === "optics") {
            await assertSaleWorkOrdersAllowDelivery(id, req.prisma);
        }

        const sale = await markSaleAsDelivered(id, userId, req.prisma);
        res.status(200).json({
            message: "Venta marcada como entregada",
            sale,
        });
    } catch (error) {
        const status = error.statusCode ?? 500;
        if (status >= 500) {
            console.error("(sales.controller.js): Error marking sale delivered:", error);
        }
        res.status(status).json({
            message: error.message ?? "Internal server error",
            code: error.code,
        });
    }
};

export const sendSaleEmailController = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await sendSaleReceiptEmailToCustomer(
            id,
            req.tenantBusinessId,
            req.prisma,
        );
        res.status(200).json({
            message: "Sale email sent successfully",
            ...result,
        });
    } catch (error) {
        console.error("(sales.controller.js): Error sending sale email:", error);
        const status = error.statusCode || 500;
        res.status(status).json({
            message: error.message || "Failed to send sale email",
            code: error.code,
        });
    }
};

export const getSaleShareLinkController = async (req, res) => {
    try {
        const { id } = req.params;
        const sale = await getSaleById(id, req.prisma);
        if (!sale) {
            return res.status(404).json({ message: "Venta no encontrada." });
        }

        const link = await getOrCreateSaleShareLink(req.tenantBusinessId, id);
        res.status(200).json({
            message: "Share link ready",
            ...link,
        });
    } catch (error) {
        console.error("(sales.controller.js): Error creating sale share link:", error);
        const status = error.statusCode || 500;
        res.status(status).json({
            message: error.message || "No se pudo generar el enlace.",
            code: error.code,
        });
    }
};
