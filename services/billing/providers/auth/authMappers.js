import { DTE_TYPE_CODE } from "../../domain/enums.js";
import { formatRut, normalizeRut } from "../../../../libs/chileRut.js";
import { mapBusinessToCompany } from "../../domain/company.js";

/**
 * Mapea venta AppsFly → payload Auth.cl / YAMT API.
 */
export function mapSaleToAuthPayload({
    sale,
    business,
    taxAccount,
    documentType,
    receiver,
    taxSummary,
    lines,
}) {
    const company = mapBusinessToCompany(business);
    const tipo =
        documentType === "FACTURA" ? DTE_TYPE_CODE.FACTURA : DTE_TYPE_CODE.BOLETA;

    const receptor =
        documentType === "FACTURA"
            ? {
                  rut: formatRut(receiver.rut),
                  razon_social: receiver.businessName,
                  giro: receiver.businessActivity,
                  direccion: receiver.address,
                  comuna: receiver.commune,
                  ciudad: receiver.city,
                  email: receiver.email,
              }
            : {
                  rut: receiver?.rut ? formatRut(receiver.rut) : undefined,
                  razon_social: receiver?.name,
                  email: receiver?.email,
              };

    return {
        tipo,
        ambiente: taxAccount?.environment === "production" ? "production" : "sandbox",
        emisor: {
            rut: formatRut(company.rut),
            razon_social: company.businessName,
            giro: taxAccount?.businessActivity || company.businessActivity,
            direccion: taxAccount?.businessAddress || "",
            comuna: taxAccount?.businessCommune || "",
            ciudad: taxAccount?.businessCity || company.city,
            email: company.email,
        },
        receptor,
        totales: {
            neto: taxSummary.netAmount,
            iva: taxSummary.taxAmount,
            total: taxSummary.totalAmount,
        },
        detalle: lines.map((line) => ({
            nombre: line.name,
            cantidad: line.quantity,
            precio: line.unitPrice,
            monto: line.grossAmount,
        })),
        referencia_interna: {
            saleId: sale.saleId,
            saleNumber: sale.saleNumber,
            companyId: company.id,
        },
    };
}

export function mapAuthResponse(response, { documentType, receiver }) {
    const id = response?.id ?? response?.dteId ?? null;
    return {
        folio: response?.folio ?? response?.Folio ?? null,
        trackId:
            response?.trackId ??
            response?.track_id ??
            response?.trackID ??
            id,
        documentId: id,
        status: response?.estado ?? response?.status ?? response?.siiStatus ?? "SENT",
        siiStatus: response?.estadoSii ?? response?.sii_status ?? response?.siiStatus ?? null,
        pdfUrl: response?.pdfUrl ?? response?.pdf_url ?? response?.urlPdf ?? null,
        xmlUrl: response?.xmlUrl ?? response?.xml_url ?? response?.urlXml ?? null,
        providerResponse: response,
        receiverRut: receiver?.rut ? normalizeRut(receiver.rut) : null,
        receiverName: receiver?.businessName || receiver?.name || null,
        receiverEmail: receiver?.email ?? null,
    };
}
