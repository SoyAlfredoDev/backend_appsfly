import { applyInventoryMovement, InsufficientStockError } from "./inventory/inventoryService.js";
import { businessDateRangeBoundsUtc, DEFAULT_BUSINESS_TIMEZONE } from "../libs/businessTimezone.js";

export { InsufficientStockError };

export const createDetailSale = async (data, prisma) => {
    try {
        return await prisma.$transaction(async (tx) => {
            if (data.saleDetailType === "PRODUCT" && data.saleDetailProductId) {
                const existingMovement = await tx.inventoryMovement.findFirst({
                    where: {
                        referenceType: "SALE_DETAIL",
                        referenceId: data.saleDetailId,
                    },
                });

                if (existingMovement) {
                    const existingDetail = await tx.saleDetail.findUnique({
                        where: { saleDetailId: data.saleDetailId },
                    });
                    if (existingDetail) return existingDetail;
                }
            }

            const saleDetail = await tx.saleDetail.create({ data });

            if (data.saleDetailType === "PRODUCT" && data.saleDetailProductId) {
                const sale = await tx.sale.findUnique({
                    where: { saleId: data.saleId },
                    select: { saleNumber: true },
                });

                await applyInventoryMovement(tx, {
                    productId: data.saleDetailProductId,
                    movementType: "VENTA",
                    quantityDelta: -Number(data.saleDetailQuantity),
                    referenceType: "SALE_DETAIL",
                    referenceId: data.saleDetailId,
                    referenceLabel: sale?.saleNumber
                        ? `Venta #${sale.saleNumber}`
                        : `Venta ${data.saleId}`,
                    createdByUserId: data.createdByUserId,
                });
            }

            return saleDetail;
        });
    } catch (error) {
        console.error("(salesServices.js): Error creating detail sale:", error);
        throw error;
    }
};

export const getSaleDetails = async (prisma) => {
    try {
        const res = await prisma.saleDetail.findMany({
            include: {
                product: {
                    select: {
                        productId: true,
                        productName: true
                    }

                },
                service: {
                    select: {
                        serviceId: true,
                        serviceName: true
                    }
                }
            }
        });
        return res;
    } catch (error) {
        console.error("(salesServices.js): Error getting sale details:", error);
        throw error;
    }
};

export const getSaleDetailById = async (id, prisma) => {
    try {
        const res = await prisma.saleDetail.findMany({
            where: { saleId: id },
            include: {
                product: {
                    select: {
                        productId: true,
                        productName: true,
                        productSKU: true
                    }
                },
                service: {
                    select: {
                        serviceId: true,
                        serviceName: true,
                        serviceSKU: true
                    }
                }
            }
        });
        return res;
    } catch (error) {
        console.error("(salesServices.js): Error getting sale detail by ID:", error);
        throw error;
    }
};

export const updateSaleDetail = async (id, data, prisma) => {
    try {
        const res = await prisma.saleDetail.update({
            where: { id: Number(id) },
            data
        });
        return res;
    } catch (error) {
        console.error("(salesServices.js): Error updating sale detail:", error);
        throw error;
    }
};

export const deleteSaleDetail = async (id, prisma) => {
    try {
        const res = await prisma.saleDetail.delete({
            where: { id: Number(id) }
        });
        return res;
    } catch (error) {
        console.error("(salesServices.js): Error deleting sale detail:", error);
        throw error;
    }
};


// get detail sales between two dates (inclusive), business timezone
export const getSaleDetailByDate = async (
    startDate,
    endDate,
    prisma,
    timeZone = DEFAULT_BUSINESS_TIMEZONE,
) => {
    try {
        const { start, endInclusive } = businessDateRangeBoundsUtc(
            startDate,
            endDate,
            timeZone,
        );
        const saleDetails = await prisma.saleDetail.findMany({
            where: {
                createdAt: {
                    gte: start,
                    lte: endInclusive,
                },
            },
        });
        return saleDetails || [];
    } catch (error) {
        console.error("(salesServices.js): Error getting sale detail by date:", error);
        throw error;
    }
};

export const getSaleDetailByCustomerIdService = async (customerId, prisma) => {
    try {
        const sales = await prisma.saleDetail.findMany({
            where: { saleCustomerId: customerId }
        });
        return sales;
    } catch (error) {
        console.error("(saleDetailsServices.js): Error getting sales by customer ID:", error);
        throw error;
    }
}

