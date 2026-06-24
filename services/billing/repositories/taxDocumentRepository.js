import { randomUUID } from "node:crypto";

export function createTaxDocumentRepository(prisma) {
    return {
        async create(data) {
            return prisma.taxDocument.create({ data });
        },

        async update(taxDocumentId, data) {
            return prisma.taxDocument.update({
                where: { taxDocumentId },
                data,
            });
        },

        async findById(taxDocumentId) {
            return prisma.taxDocument.findUnique({
                where: { taxDocumentId },
                include: {
                    sale: {
                        include: {
                            customer: true,
                            SaleDetail: {
                                include: {
                                    product: true,
                                    service: true,
                                },
                            },
                            Payment: true,
                        },
                    },
                },
            });
        },

        async findBySaleId(saleId) {
            return prisma.taxDocument.findMany({
                where: { saleId },
                orderBy: { createdAt: "desc" },
            });
        },

        async list({ where, skip, take }) {
            const [rows, total] = await Promise.all([
                prisma.taxDocument.findMany({
                    where,
                    skip,
                    take,
                    orderBy: { createdAt: "desc" },
                    include: {
                        sale: {
                            select: {
                                saleId: true,
                                saleNumber: true,
                                createdAt: true,
                            },
                        },
                    },
                }),
                prisma.taxDocument.count({ where }),
            ]);
            return { rows, total };
        },

        async aggregateDashboard() {
            const [boletas, facturas, rejected, pending] = await Promise.all([
                prisma.taxDocument.count({
                    where: { documentType: "BOLETA", status: "ACCEPTED" },
                }),
                prisma.taxDocument.count({
                    where: { documentType: "FACTURA", status: "ACCEPTED" },
                }),
                prisma.taxDocument.count({
                    where: { status: "REJECTED" },
                }),
                prisma.taxDocument.count({
                    where: { status: { in: ["PENDING", "SENT"] } },
                }),
            ]);

            return {
                totalBoletas: boletas,
                totalFacturas: facturas,
                rejectedDocuments: rejected,
                pendingDocuments: pending,
            };
        },

        newId() {
            return randomUUID();
        },
    };
}
