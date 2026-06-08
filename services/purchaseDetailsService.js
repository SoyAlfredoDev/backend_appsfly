import { applyInventoryMovement } from "./inventory/inventoryService.js";

export const createPurchaseDetail = async (data, prisma) => {
    try {
        return await prisma.$transaction(async (tx) => {
            if (data.purchaseDetailType === "PRODUCT" && data.purchaseDetailProductId) {
                const existingMovement = await tx.inventoryMovement.findFirst({
                    where: {
                        referenceType: "PURCHASE_DETAIL",
                        referenceId: data.purchaseDetailId,
                    },
                });

                if (existingMovement) {
                    const existingDetail = await tx.purchaseDetail.findUnique({
                        where: { purchaseDetailId: data.purchaseDetailId },
                    });
                    if (existingDetail) return existingDetail;
                }
            }

            const purchaseDetail = await tx.purchaseDetail.create({ data });

            if (
                data.purchaseDetailType === "PRODUCT" &&
                data.purchaseDetailProductId
            ) {
                const purchase = await tx.purchase.findUnique({
                    where: { purchaseId: data.purchaseId },
                    select: { purchaseNumber: true, purchaseStatus: true },
                });

                if (purchase?.purchaseStatus === "COMPLETED") {
                    await applyInventoryMovement(tx, {
                        productId: data.purchaseDetailProductId,
                        movementType: "COMPRA",
                        quantityDelta: Number(data.purchaseDetailQuantity),
                        referenceType: "PURCHASE_DETAIL",
                        referenceId: data.purchaseDetailId,
                        referenceLabel: purchase?.purchaseNumber
                            ? `Compra #${purchase.purchaseNumber}`
                            : `Compra ${data.purchaseId}`,
                        createdByUserId: data.createdByUserId,
                        unitCost: Number(data.purchaseDetailPrice),
                    });
                }
            }

            return purchaseDetail;
        });
    } catch (error) {
        console.error("(purchaseDetailsService.js): Error creating purchase detail:", error);
        throw error;
    }
};
