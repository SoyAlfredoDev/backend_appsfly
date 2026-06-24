import { createTaxDocumentRepository } from "../repositories/taxDocumentRepository.js";
import { normalizeRut } from "../../../libs/chileRut.js";

export async function listTaxDocumentsUseCase({ prisma, filters }) {
    const repo = createTaxDocumentRepository(prisma);
    const where = {};

    if (filters.status) where.status = filters.status;
    if (filters.documentType) where.documentType = filters.documentType;
    if (filters.folio) where.folio = filters.folio;
    if (filters.rut) where.receiverRut = normalizeRut(filters.rut);

    if (filters.search) {
        const q = filters.search.trim();
        where.OR = [
            { receiverName: { contains: q, mode: "insensitive" } },
            { receiverRut: { contains: q.replace(/\./g, ""), mode: "insensitive" } },
            { trackId: { contains: q, mode: "insensitive" } },
            { sale: { saleNumber: { contains: q, mode: "insensitive" } } },
        ];
    }

    const skip = (filters.page - 1) * filters.pageSize;
    const { rows, total } = await repo.list({
        where,
        skip,
        take: filters.pageSize,
    });

    return {
        rows,
        pagination: {
            page: filters.page,
            pageSize: filters.pageSize,
            total,
            totalPages: Math.ceil(total / filters.pageSize),
        },
    };
}

export async function getTaxBillingDashboardUseCase({ prisma }) {
    const repo = createTaxDocumentRepository(prisma);
    return repo.aggregateDashboard();
}

export async function getTaxDocumentByIdUseCase({ prisma, taxDocumentId }) {
    const repo = createTaxDocumentRepository(prisma);
    const doc = await repo.findById(taxDocumentId);
    if (!doc) {
        return null;
    }
    return doc;
}
