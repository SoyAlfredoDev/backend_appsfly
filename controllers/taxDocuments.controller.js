import { ZodError } from "zod";
import {
    parseIssueTaxDocumentInput,
    parseListTaxDocumentsQuery,
} from "../services/billing/validation/taxDocumentSchemas.js";
import { issueTaxDocumentUseCase } from "../services/billing/useCases/issueTaxDocumentUseCase.js";
import {
    getTaxBillingDashboardUseCase,
    getTaxDocumentByIdUseCase,
    listTaxDocumentsUseCase,
} from "../services/billing/useCases/listTaxDocumentsUseCase.js";
import {
    retryTaxDocumentUseCase,
    syncTaxDocumentStatusUseCase,
} from "../services/billing/useCases/syncTaxDocumentStatusUseCase.js";
import { TaxBillingError } from "../services/billing/errors.js";
import { createTaxProviderAccountRepository } from "../services/billing/repositories/taxProviderAccountRepository.js";
import { mapTaxProviderAccount } from "../services/billing/domain/company.js";

function maskSecrets(account) {
    if (!account) return null;
    const mapped = mapTaxProviderAccount(account);
    return {
        ...mapped,
        apiKey: account.authApiKey ? "********" : null,
        apiSecret: account.authApiSecret ? "********" : null,
    };
}

function handleError(res, error, scope) {
    if (error instanceof ZodError) {
        return res.status(400).json({
            error: error.errors[0]?.message ?? "Datos inválidos.",
            code: "VALIDATION_ERROR",
        });
    }

    if (error instanceof TaxBillingError) {
        return res.status(error.status).json({
            error: error.message,
            code: error.code,
        });
    }

    console.error(`(${scope}):`, error);
    return res.status(500).json({ error: "Error interno de facturación electrónica." });
}

export const issueTaxDocumentController = async (req, res) => {
    try {
        const input = parseIssueTaxDocumentInput(req.body);
        const document = await issueTaxDocumentUseCase({
            prisma: req.prisma,
            businessId: req.tenantBusinessId,
            saleId: input.saleId,
            documentType: input.documentType,
            receiver: input.receiver,
        });
        return res.status(201).json({ document });
    } catch (error) {
        return handleError(res, error, "taxDocuments.issue");
    }
};

export const listTaxDocumentsController = async (req, res) => {
    try {
        const filters = parseListTaxDocumentsQuery(req.query);
        const result = await listTaxDocumentsUseCase({
            prisma: req.prisma,
            filters,
        });
        return res.status(200).json(result);
    } catch (error) {
        return handleError(res, error, "taxDocuments.list");
    }
};

export const getTaxDocumentController = async (req, res) => {
    try {
        const document = await getTaxDocumentByIdUseCase({
            prisma: req.prisma,
            taxDocumentId: req.params.id,
        });
        if (!document) {
            return res.status(404).json({ error: "Documento no encontrado." });
        }
        return res.status(200).json({ document });
    } catch (error) {
        return handleError(res, error, "taxDocuments.get");
    }
};

export const getTaxBillingDashboardController = async (req, res) => {
    try {
        const stats = await getTaxBillingDashboardUseCase({ prisma: req.prisma });
        return res.status(200).json(stats);
    } catch (error) {
        return handleError(res, error, "taxDocuments.dashboard");
    }
};

export const syncTaxDocumentStatusController = async (req, res) => {
    try {
        const document = await syncTaxDocumentStatusUseCase({
            prisma: req.prisma,
            businessId: req.tenantBusinessId,
            taxDocumentId: req.params.id,
        });
        return res.status(200).json({ document });
    } catch (error) {
        return handleError(res, error, "taxDocuments.sync");
    }
};

export const retryTaxDocumentController = async (req, res) => {
    try {
        const document = await retryTaxDocumentUseCase({
            prisma: req.prisma,
            businessId: req.tenantBusinessId,
            taxDocumentId: req.params.id,
        });
        return res.status(201).json({ document });
    } catch (error) {
        return handleError(res, error, "taxDocuments.retry");
    }
};

export const getTaxConfigController = async (req, res) => {
    try {
        const repo = createTaxProviderAccountRepository();
        const account = await repo.findByCompanyId(req.tenantBusinessId);
        return res.status(200).json({ account: maskSecrets(account) });
    } catch (error) {
        return handleError(res, error, "taxDocuments.config.get");
    }
};

export const upsertTaxConfigController = async (req, res) => {
    try {
        const repo = createTaxProviderAccountRepository();
        const {
            provider,
            authApiKey,
            authApiSecret,
            environment,
            businessActivity,
            businessAddress,
            businessCommune,
            businessCity,
            certificateStatus,
            isEnabled,
        } = req.body ?? {};

        const existing = await repo.findByCompanyId(req.tenantBusinessId);
        const account = await repo.upsert(req.tenantBusinessId, {
            provider: provider ?? existing?.provider ?? "AUTH_CL",
            authApiKey:
                authApiKey && authApiKey !== "********"
                    ? authApiKey
                    : existing?.authApiKey ?? null,
            authApiSecret:
                authApiSecret && authApiSecret !== "********"
                    ? authApiSecret
                    : existing?.authApiSecret ?? null,
            environment: environment ?? existing?.environment ?? "sandbox",
            businessActivity: businessActivity ?? existing?.businessActivity ?? null,
            businessAddress: businessAddress ?? existing?.businessAddress ?? null,
            businessCommune: businessCommune ?? existing?.businessCommune ?? null,
            businessCity: businessCity ?? existing?.businessCity ?? null,
            certificateStatus:
                certificateStatus ?? existing?.certificateStatus ?? "PENDING",
            isEnabled: typeof isEnabled === "boolean" ? isEnabled : existing?.isEnabled ?? false,
        });

        return res.status(200).json({ account: maskSecrets(account) });
    } catch (error) {
        return handleError(res, error, "taxDocuments.config.upsert");
    }
};
