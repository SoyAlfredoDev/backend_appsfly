import { z } from "zod";
import { DocumentType } from "../domain/enums.js";

const rutSchema = z
    .string()
    .trim()
    .min(8, "RUT inválido.")
    .max(12, "RUT inválido.");

export const facturaReceiverSchema = z.object({
    businessName: z.string().trim().min(2, "Razón social requerida."),
    rut: rutSchema,
    businessActivity: z.string().trim().min(2, "Giro requerido."),
    address: z.string().trim().min(3, "Dirección requerida."),
    commune: z.string().trim().min(2, "Comuna requerida."),
    city: z.string().trim().min(2, "Ciudad requerida."),
    email: z.string().trim().email("Email inválido."),
});

export const boletaReceiverSchema = z
    .object({
        rut: z.string().trim().optional(),
        name: z.string().trim().optional(),
        email: z.string().trim().email("Email inválido.").optional(),
    })
    .optional();

export const issueTaxDocumentSchema = z.object({
    saleId: z.string().uuid("ID de venta inválido."),
    documentType: z.enum([
        DocumentType.BOLETA,
        DocumentType.FACTURA,
    ]),
    receiver: z.union([facturaReceiverSchema, boletaReceiverSchema]).optional(),
});

export const listTaxDocumentsSchema = z.object({
    page: z.coerce.number().int().min(1).default(1),
    pageSize: z.coerce.number().int().min(1).max(100).default(20),
    status: z.string().trim().optional(),
    documentType: z.string().trim().optional(),
    folio: z.coerce.number().int().optional(),
    rut: z.string().trim().optional(),
    search: z.string().trim().optional(),
});

export const completeSaleTaxSchema = z.object({
    sale: z.object({
        saleId: z.string().uuid(),
        saleCustomerId: z.string().uuid(),
        saleTotal: z.number().int().nonnegative(),
        saleTotalPayments: z.number().int().nonnegative(),
        saleComment: z.string().optional().nullable(),
        saleImageUrl: z.string().optional().nullable(),
        documentType: z
            .enum([DocumentType.RECEIPT, DocumentType.BOLETA, DocumentType.FACTURA])
            .default(DocumentType.RECEIPT),
    }),
    saleDetails: z.array(z.record(z.unknown())).min(1),
    payments: z.array(z.record(z.unknown())).default([]),
    receiver: z.union([facturaReceiverSchema, boletaReceiverSchema]).optional(),
});

export function parseIssueTaxDocumentInput(body) {
    return issueTaxDocumentSchema.parse(body ?? {});
}

export function parseListTaxDocumentsQuery(query) {
    return listTaxDocumentsSchema.parse(query ?? {});
}
