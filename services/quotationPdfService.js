import PDFDocument from "pdfkit";

const BRAND = "#059669";

function formatCurrency(amount) {
    const value = Number(amount) || 0;
    return value.toLocaleString("es-CL", { style: "currency", currency: "CLP" });
}

function formatDate(value) {
    if (!value) return "—";
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) return String(value);
    return date.toLocaleDateString("es-CL", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

function resolveBusinessLines(business) {
    const name = business?.businessName?.trim() || "Empresa";
    const doc = business?.businessDocumentNumber?.trim()
        ? `${business.businessDocumentType || "RUT"}: ${business.businessDocumentNumber}`
        : null;
    const address = business?.businessReceiptAddress?.trim() || business?.businessCountry?.trim() || null;
    const phone =
        business?.businessReceiptPhone?.trim()
        || [business?.businessCodePhoneNumber, business?.businessPhoneNumber].filter(Boolean).join(" ").trim()
        || null;
    const email =
        business?.businessReceiptEmail?.trim()
        || business?.businessEmail?.trim()
        || null;
    return { name, doc, address, phone, email };
}

/**
 * Genera buffer PDF de cotización para adjuntar al correo.
 */
export function generateQuotationPdfBuffer({
    quotation,
    business,
    items = [],
    netTotal = 0,
    ivaTotal = 0,
    total = 0,
    customerName = "Cliente",
}) {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument({ size: "A4", margin: 48 });
        const chunks = [];

        doc.on("data", (chunk) => chunks.push(chunk));
        doc.on("end", () => resolve(Buffer.concat(chunks)));
        doc.on("error", reject);

        const contact = resolveBusinessLines(business);
        const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;
        let y = doc.page.margins.top;

        doc.font("Helvetica-Bold").fontSize(20).fillColor(BRAND).text(contact.name, 48, y);
        y = doc.y + 4;
        doc.font("Helvetica").fontSize(9).fillColor("#4b5563");
        [contact.doc, contact.address, contact.phone ? `Tel: ${contact.phone}` : null, contact.email]
            .filter(Boolean)
            .forEach((line) => {
                doc.text(line, 48, y);
                y = doc.y + 2;
            });

        y += 12;
        doc.moveTo(48, y).lineTo(48 + pageWidth, y).strokeColor(BRAND).lineWidth(2).stroke();
        y += 16;

        doc.font("Helvetica-Bold").fontSize(14).fillColor(BRAND)
            .text(`COTIZACIÓN N° ${quotation?.quotationNumber ?? "—"}`, 48, y);
        y = doc.y + 14;

        doc.font("Helvetica").fontSize(10).fillColor("#374151");
        const meta = [
            ["Fecha", formatDate(quotation?.quotationDate || quotation?.createdAt)],
            ["Cliente", customerName],
            ["Válida hasta", quotation?.quotationExpiresAt ? formatDate(quotation.quotationExpiresAt) : "—"],
        ];
        meta.forEach(([label, value]) => {
            doc.font("Helvetica-Bold").text(`${label}: `, 48, y, { continued: true });
            doc.font("Helvetica").text(value);
            y = doc.y + 4;
        });

        if (quotation?.quotationComment?.trim()) {
            y += 6;
            doc.font("Helvetica-Bold").text("Observaciones:", 48, y);
            y = doc.y + 2;
            doc.font("Helvetica").text(quotation.quotationComment.trim(), 48, y, { width: pageWidth });
            y = doc.y + 10;
        } else {
            y += 8;
        }

        const colX = [48, 90, 150, 320, 370, 430, 500];
        const headers = ["#", "SKU", "Descripción", "Cant.", "Precio", "Total"];
        doc.rect(48, y, pageWidth, 20).fill("#d1fae5");
        doc.fillColor("#111827").font("Helvetica-Bold").fontSize(8);
        headers.forEach((header, i) => {
            doc.text(header, colX[i] + 4, y + 6, { width: (colX[i + 1] ?? 560) - colX[i] - 8 });
        });
        y += 22;

        doc.font("Helvetica").fontSize(8).fillColor("#374151");
        items.forEach((item, index) => {
            if (y > doc.page.height - 120) {
                doc.addPage();
                y = doc.page.margins.top;
            }
            const row = [
                String(index + 1),
                item.sku || "—",
                item.name || "Ítem",
                String(item.quantity ?? 0),
                formatCurrency(item.unitPrice),
                formatCurrency(item.lineTotal),
            ];
            row.forEach((cell, i) => {
                doc.text(cell, colX[i] + 4, y, {
                    width: (colX[i + 1] ?? 560) - colX[i] - 8,
                    align: i >= 3 ? "right" : "left",
                });
            });
            y += 16;
            doc.moveTo(48, y - 4).lineTo(48 + pageWidth, y - 4).strokeColor("#e5e7eb").lineWidth(0.5).stroke();
        });

        y += 12;
        const summaryX = 340;
        doc.font("Helvetica").fontSize(10);
        [["Neto", netTotal], ["IVA (19%)", ivaTotal], ["Total", total]].forEach(([label, amount], idx) => {
            const isTotal = idx === 2;
            doc.font(isTotal ? "Helvetica-Bold" : "Helvetica")
                .fillColor(isTotal ? BRAND : "#374151")
                .text(label, summaryX, y, { width: 80, align: "left" });
            doc.text(formatCurrency(amount), summaryX + 90, y, { width: 100, align: "right" });
            y += isTotal ? 18 : 14;
        });

        const footerY = doc.page.height - 56;
        doc.moveTo(48, footerY).lineTo(48 + pageWidth, footerY).strokeColor("#e5e7eb").stroke();
        doc.font("Helvetica").fontSize(8).fillColor("#6b7280")
            .text(
                business?.businessReceiptFooterNote?.trim()
                    || "Documento informativo generado por AppsFly. Los valores pueden estar sujetos a confirmación.",
                48,
                footerY + 8,
                { width: pageWidth, align: "center" },
            );

        doc.end();
    });
}
