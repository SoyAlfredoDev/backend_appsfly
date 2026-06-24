import { createTaxProviderAccountRepository } from "../repositories/taxProviderAccountRepository.js";
import { createTaxDocumentRepository } from "../repositories/taxDocumentRepository.js";
import { createTaxDocumentAuditRepository } from "../repositories/taxDocumentAuditRepository.js";
import { createTaxProvider } from "../providers/index.js";
import { TaxBillingError } from "../errors.js";
import { getBusinessByIdService } from "../../businessService.js";
import { issueTaxDocumentUseCase } from "./issueTaxDocumentUseCase.js";
import { TaxDocumentStatus } from "../domain/enums.js";

export async function syncTaxDocumentStatusUseCase({
    prisma,
    businessId,
    taxDocumentId,
}) {
    const taxDocumentRepo = createTaxDocumentRepository(prisma);
    const auditRepo = createTaxDocumentAuditRepository(prisma);
    const accountRepo = createTaxProviderAccountRepository();

    const doc = await taxDocumentRepo.findById(taxDocumentId);
    if (!doc?.trackId) {
        throw new TaxBillingError(
            "TRACK_ID_MISSING",
            "El documento no tiene trackId para consultar estado.",
            400,
        );
    }

    const [business, taxAccount] = await Promise.all([
        getBusinessByIdService(businessId),
        accountRepo.findByCompanyId(businessId),
    ]);

    const provider = createTaxProvider({ business, taxAccount });
    const status = await provider.getStatus(doc.trackId);

    const updated = await taxDocumentRepo.update(taxDocumentId, {
        status: status.status,
        siiStatus: status.siiStatus ?? doc.siiStatus,
        providerResponse: status.providerResponse ?? doc.providerResponse,
    });

    await auditRepo.log({
        taxDocumentId,
        action: "STATUS_SYNC",
        previousStatus: doc.status,
        newStatus: status.status,
        payload: status,
    });

    return updated;
}

export async function retryTaxDocumentUseCase({
    prisma,
    businessId,
    taxDocumentId,
}) {
    const taxDocumentRepo = createTaxDocumentRepository(prisma);
    const doc = await taxDocumentRepo.findById(taxDocumentId);

    if (!doc) {
        throw new TaxBillingError("NOT_FOUND", "Documento no encontrado.", 404);
    }
    if (doc.status !== TaxDocumentStatus.ERROR) {
        throw new TaxBillingError(
            "NOT_RETRYABLE",
            "Solo se pueden reintentar documentos en estado ERROR.",
            400,
        );
    }

    return issueTaxDocumentUseCase({
        prisma,
        businessId,
        saleId: doc.saleId,
        documentType: doc.documentType,
        receiver: {
            rut: doc.receiverRut,
            businessName: doc.receiverName,
            name: doc.receiverName,
            email: doc.receiverEmail,
            businessActivity: "",
            address: "",
            commune: "",
            city: "",
        },
    });
}
