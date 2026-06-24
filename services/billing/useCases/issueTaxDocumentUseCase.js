import { DocumentType, TaxDocumentStatus } from "../domain/enums.js";
import { createTaxDocumentRepository } from "../repositories/taxDocumentRepository.js";
import { createTaxDocumentAuditRepository } from "../repositories/taxDocumentAuditRepository.js";
import { createTaxProviderAccountRepository } from "../repositories/taxProviderAccountRepository.js";
import { createTaxProvider } from "../providers/index.js";
import { summarizeSaleTax, buildTaxLinesFromSaleDetails } from "../services/taxCalculationService.js";
import { TaxBillingError } from "../errors.js";
import { isValidRut, normalizeRut } from "../../../libs/chileRut.js";
import { getBusinessByIdService } from "../../businessService.js";
import { getTaxRetryMaxAttempts } from "../../../config/authEnv.js";

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function isRetryableProviderError(error) {
    if (error instanceof TaxBillingError) return false;
    const status = error.status ?? 0;
    return status >= 500 || status === 429 || status === 408 || status === 0;
}

async function emitWithRetries(emitFn, { maxAttempts, auditRepo, taxDocumentId }) {
    let lastError;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await emitFn();
        } catch (error) {
            lastError = error;
            const canRetry = attempt < maxAttempts && isRetryableProviderError(error);
            if (canRetry) {
                await auditRepo.log({
                    taxDocumentId,
                    action: "EMIT_RETRY",
                    payload: {
                        attempt,
                        maxAttempts,
                        message: error.message,
                    },
                });
                await sleep(500 * attempt);
                continue;
            }
            throw error;
        }
    }
    throw lastError;
}

function validateReceiver(documentType, receiver) {
    if (documentType === DocumentType.FACTURA) {
        if (!receiver) {
            throw new TaxBillingError(
                "FACTURA_RECEIVER_REQUIRED",
                "Debes completar los datos del receptor para factura electrónica.",
            );
        }
        if (!isValidRut(receiver.rut)) {
            throw new TaxBillingError("INVALID_RUT", "RUT del receptor inválido.");
        }
    }
}

/**
 * Emite DTE para una venta ya registrada.
 */
export async function issueTaxDocumentUseCase({
    prisma,
    businessId,
    saleId,
    documentType,
    receiver,
}) {
    if (documentType === DocumentType.RECEIPT) {
        throw new TaxBillingError(
            "INVALID_DOCUMENT_TYPE",
            "El comprobante interno no requiere emisión DTE.",
        );
    }

    validateReceiver(documentType, receiver);

    const taxDocumentRepo = createTaxDocumentRepository(prisma);
    const auditRepo = createTaxDocumentAuditRepository(prisma);
    const configRepo = createTaxProviderAccountRepository();

    const [sale, business, taxAccount] = await Promise.all([
        prisma.sale.findUnique({
            where: { saleId },
            include: {
                SaleDetail: {
                    include: { product: true, service: true },
                },
                customer: true,
            },
        }),
        getBusinessByIdService(businessId),
        configRepo.findByCompanyId(businessId),
    ]);

    if (!sale) {
        throw new TaxBillingError("SALE_NOT_FOUND", "Venta no encontrada.", 404);
    }

    if (!taxAccount?.isEnabled) {
        throw new TaxBillingError(
            "TAX_NOT_ENABLED",
            "La facturación electrónica no está habilitada para este negocio.",
            403,
        );
    }

    const existing = await taxDocumentRepo.findBySaleId(saleId);
    const active = existing.find((doc) =>
        [TaxDocumentStatus.PENDING, TaxDocumentStatus.SENT, TaxDocumentStatus.ACCEPTED].includes(
            doc.status,
        ),
    );
    if (active) {
        throw new TaxBillingError(
            "TAX_DOCUMENT_EXISTS",
            "Esta venta ya tiene un documento tributario activo.",
            409,
        );
    }

    const taxSummary = summarizeSaleTax(sale.SaleDetail);
    const lines = buildTaxLinesFromSaleDetails(sale.SaleDetail);
    const folio = await configRepo.reserveFolio(businessId, documentType);
    const provider = createTaxProvider({ business, taxAccount });

    const taxDocumentId = taxDocumentRepo.newId();
    let persisted = await taxDocumentRepo.create({
        taxDocumentId,
        saleId,
        documentType,
        provider: provider.name,
        folio,
        status: TaxDocumentStatus.PENDING,
        netAmount: taxSummary.netAmount,
        taxAmount: taxSummary.taxAmount,
        totalAmount: taxSummary.totalAmount,
        receiverRut: receiver?.rut ? normalizeRut(receiver.rut) : null,
        receiverName: receiver?.businessName || receiver?.name || null,
        receiverEmail: receiver?.email ?? null,
    });

    await auditRepo.log({
        taxDocumentId,
        action: "CREATED",
        newStatus: TaxDocumentStatus.PENDING,
    });

    try {
        const emissionInput = {
            sale,
            receiver: receiver ?? {
                rut: sale.customer?.customerDocumentNumber,
                name: `${sale.customer?.customerFirstName ?? ""} ${sale.customer?.customerLastName ?? ""}`.trim(),
                email: sale.customer?.customerEmail,
            },
            folio,
            taxSummary,
            lines,
        };

        const result = await emitWithRetries(
            () =>
                documentType === DocumentType.FACTURA
                    ? provider.createFactura(emissionInput)
                    : provider.createBoleta(emissionInput),
            {
                maxAttempts: getTaxRetryMaxAttempts(),
                auditRepo,
                taxDocumentId,
            },
        );

        persisted = await taxDocumentRepo.update(taxDocumentId, {
            folio: result.folio ?? folio,
            trackId: result.trackId,
            status: result.status,
            siiStatus: result.siiStatus,
            pdfUrl: result.pdfUrl,
            xmlUrl: result.xmlUrl,
            providerResponse: result.providerResponse,
            receiverRut: result.receiverRut,
            receiverName: result.receiverName,
            receiverEmail: result.receiverEmail,
            lastError: null,
        });

        await prisma.sale.update({
            where: { saleId },
            data: { documentType },
        });

        await auditRepo.log({
            taxDocumentId,
            action: "EMITTED",
            previousStatus: TaxDocumentStatus.PENDING,
            newStatus: result.status,
            payload: { trackId: result.trackId, folio: result.folio },
        });

        return persisted;
    } catch (error) {
        const message = error.message ?? "Error al emitir DTE.";
        const canRetry = persisted.retryCount < getTaxRetryMaxAttempts();

        persisted = await taxDocumentRepo.update(taxDocumentId, {
            status: TaxDocumentStatus.ERROR,
            lastError: message,
            retryCount: { increment: 1 },
            providerResponse: error.raw ?? { message },
        });

        await auditRepo.log({
            taxDocumentId,
            action: "EMIT_FAILED",
            previousStatus: TaxDocumentStatus.PENDING,
            newStatus: TaxDocumentStatus.ERROR,
            payload: { message, canRetry },
        });

        throw error;
    }
}
