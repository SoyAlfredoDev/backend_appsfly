import { TaxProviderType, TaxDocumentStatus } from "../../domain/enums.js";
import { createAuthClient } from "./authClient.js";
import { mapSaleToAuthPayload, mapAuthResponse } from "./authMappers.js";
import { TaxProviderError } from "../../errors.js";

/**
 * Implementación Auth.cl del contrato TaxProvider.
 * @implements {import("../TaxProvider.js").TaxProvider}
 */
export class AuthProvider {
    constructor({ business, taxAccount }) {
        this.business = business;
        this.taxAccount = taxAccount;
        this.client = createAuthClient(taxAccount);
    }

    get name() {
        return TaxProviderType.AUTH_CL;
    }

    async createBoleta(input) {
        return this.#emit(input, "BOLETA");
    }

    async createFactura(input) {
        return this.#emit(input, "FACTURA");
    }

    async #emit(input, documentType) {
        const payload = mapSaleToAuthPayload({
            sale: input.sale,
            business: this.business,
            taxAccount: this.taxAccount,
            documentType,
            receiver: input.receiver,
            taxSummary: input.taxSummary,
            lines: input.lines,
        });

        if (!this.client.isConfigured()) {
            return this.#simulateEmission({
                documentType,
                folio: input.folio,
                receiver: input.receiver,
                taxSummary: input.taxSummary,
            });
        }

        const response = await this.client.emitDte(payload);
        const mapped = mapAuthResponse(response, {
            documentType,
            receiver: input.receiver,
        });

        return {
            provider: TaxProviderType.AUTH_CL,
            documentType,
            folio: mapped.folio ?? input.folio,
            trackId: mapped.trackId,
            status: this.#mapStatus(mapped.status),
            siiStatus: mapped.siiStatus,
            pdfUrl: mapped.pdfUrl,
            xmlUrl: mapped.xmlUrl,
            providerResponse: mapped.providerResponse,
            netAmount: input.taxSummary.netAmount,
            taxAmount: input.taxSummary.taxAmount,
            totalAmount: input.taxSummary.totalAmount,
            receiverRut: mapped.receiverRut,
            receiverName: mapped.receiverName,
            receiverEmail: mapped.receiverEmail,
        };
    }

    #simulateEmission({ documentType, folio, receiver, taxSummary }) {
        const trackId = `auth-sim-${Date.now()}-${folio}`;
        return {
            provider: TaxProviderType.AUTH_CL,
            documentType,
            folio,
            trackId,
            status: TaxDocumentStatus.ACCEPTED,
            siiStatus: "SIMULATED",
            pdfUrl: null,
            xmlUrl: null,
            providerResponse: {
                simulated: true,
                message:
                    "Emisión simulada: configure AUTH_API_KEY o credenciales por empresa.",
            },
            netAmount: taxSummary.netAmount,
            taxAmount: taxSummary.taxAmount,
            totalAmount: taxSummary.totalAmount,
            receiverRut: receiver?.rut ?? null,
            receiverName: receiver?.businessName || receiver?.name || null,
            receiverEmail: receiver?.email ?? null,
        };
    }

    #mapStatus(providerStatus) {
        const value = String(providerStatus ?? "").toUpperCase();
        if (value.includes("ACEPT") || value.includes("ACCEPT")) {
            return TaxDocumentStatus.ACCEPTED;
        }
        if (value.includes("RECHAZ") || value.includes("REJECT")) {
            return TaxDocumentStatus.REJECTED;
        }
        if (value.includes("ERROR")) return TaxDocumentStatus.ERROR;
        if (value.includes("ENV") || value.includes("SENT") || value.includes("PROCESS")) {
            return TaxDocumentStatus.SENT;
        }
        return TaxDocumentStatus.PENDING;
    }

    async getStatus(trackId) {
        if (!this.client.isConfigured()) {
            return {
                trackId,
                status: TaxDocumentStatus.ACCEPTED,
                siiStatus: "SIMULATED",
            };
        }

        const response = await this.client.getDteStatus(trackId);
        return {
            trackId,
            status: this.#mapStatus(
                response?.estado ?? response?.status ?? response?.siiStatus,
            ),
            siiStatus:
                response?.estadoSii ?? response?.sii_status ?? response?.siiStatus ?? null,
            providerResponse: response,
        };
    }

    async generatePdf(documentId) {
        if (!this.client.isConfigured()) {
            throw new TaxProviderError("PDF no disponible en modo simulado.", {
                status: 404,
            });
        }

        const response = await this.client.getDtePdf(documentId);
        return response?.pdfUrl ?? response?.url ?? response?.pdf ?? null;
    }
}
