/**
 * @typedef {object} TaxDocumentRecord
 * @property {string} taxDocumentId
 * @property {string} saleId
 * @property {string} documentType
 * @property {string} provider
 * @property {number|null} folio
 * @property {string|null} trackId
 * @property {string} status
 * @property {string|null} siiStatus
 * @property {string|null} pdfUrl
 * @property {string|null} xmlUrl
 */

/**
 * @typedef {object} CreateDteInput
 * @property {object} sale
 * @property {object} receiver
 * @property {number} folio
 * @property {{ netAmount: number, taxAmount: number, totalAmount: number }} taxSummary
 * @property {object[]} lines
 */

/**
 * Contrato de proveedor tributario (Strategy).
 * La lógica de negocio solo depende de esta interfaz.
 *
 * @interface TaxProvider
 */
export class TaxProvider {
    /** @returns {Promise<TaxDocumentRecord>} */
    async createBoleta(_data) {
        throw new Error("createBoleta not implemented");
    }

    /** @returns {Promise<TaxDocumentRecord>} */
    async createFactura(_data) {
        throw new Error("createFactura not implemented");
    }

    /** @returns {Promise<{ trackId: string, status: string, siiStatus?: string|null }>} */
    async getStatus(_trackId) {
        throw new Error("getStatus not implemented");
    }

    /** @returns {Promise<string|null>} */
    async generatePdf(_trackId) {
        throw new Error("generatePdf not implemented");
    }
}
