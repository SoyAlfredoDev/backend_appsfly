import {
    escapeHtml,
    formatCurrency,
    receiptRow,
    wrapBusinessEmailLayout,
} from "../../shared/layout.js";

function lineItemRow({ index, name, sku, quantity, unitPrice, lineTotal, isLast }) {
    const border = isLast ? "none" : "1px solid #eef2f7";
    return `<tr>
      <td style="padding:10px 8px;border-bottom:${border};font-size:13px;color:#374151;font-family:Arial,Helvetica,sans-serif;">${index}</td>
      <td style="padding:10px 8px;border-bottom:${border};font-size:13px;color:#021f41;font-family:Arial,Helvetica,sans-serif;">
        <strong>${escapeHtml(name)}</strong>
        ${sku ? `<br><span style="font-size:11px;color:#9ca3af;">SKU: ${escapeHtml(sku)}</span>` : ""}
      </td>
      <td style="padding:10px 8px;border-bottom:${border};font-size:13px;color:#374151;text-align:center;font-family:Arial,Helvetica,sans-serif;">${quantity}</td>
      <td style="padding:10px 8px;border-bottom:${border};font-size:13px;color:#374151;text-align:right;font-family:Arial,Helvetica,sans-serif;">${escapeHtml(formatCurrency(unitPrice))}</td>
      <td style="padding:10px 8px;border-bottom:${border};font-size:13px;color:#021f41;font-weight:600;text-align:right;font-family:Arial,Helvetica,sans-serif;">${escapeHtml(formatCurrency(lineTotal))}</td>
    </tr>`;
}

function contactBlock({ businessName, contactEmail, contactPhone, contactAddress, contactDocument }) {
    const emailRow = contactEmail
        ? `<p style="margin:0 0 8px;font-size:18px;font-weight:700;color:#021f41;font-family:Arial,Helvetica,sans-serif;">
            <a href="mailto:${escapeHtml(contactEmail)}" style="color:#094fd1;text-decoration:none;">${escapeHtml(contactEmail)}</a>
          </p>`
        : "";
    const phoneRow = contactPhone
        ? `<p style="margin:0 0 6px;font-size:15px;color:#374151;font-family:Arial,Helvetica,sans-serif;">
            <strong>Teléfono:</strong> ${escapeHtml(contactPhone)}
          </p>`
        : "";
    const addressRow = contactAddress
        ? `<p style="margin:0 0 6px;font-size:14px;color:#6b7280;font-family:Arial,Helvetica,sans-serif;">
            ${escapeHtml(contactAddress)}
          </p>`
        : "";
    const docRow = contactDocument
        ? `<p style="margin:0;font-size:13px;color:#6b7280;font-family:Arial,Helvetica,sans-serif;">${escapeHtml(contactDocument)}</p>`
        : "";

    return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"
      bgcolor="#eff6ff" style="margin:24px 0 8px;background-color:#eff6ff;border-radius:12px;border:2px solid #094fd1;">
      <tr>
        <td style="padding:22px 24px;text-align:center;">
          <p style="margin:0 0 10px;font-size:11px;font-weight:700;color:#094fd1;text-transform:uppercase;letter-spacing:0.6px;font-family:Arial,Helvetica,sans-serif;">
            ¿Consultas sobre esta venta?
          </p>
          <p style="margin:0 0 12px;font-size:16px;font-weight:700;color:#021f41;font-family:Arial,Helvetica,sans-serif;">
            Contáctese directamente con ${escapeHtml(businessName)}
          </p>
          ${emailRow}
          ${phoneRow}
          ${addressRow}
          ${docRow}
          <p style="margin:14px 0 0;font-size:12px;color:#6b7280;line-height:1.5;font-family:Arial,Helvetica,sans-serif;">
            Puede responder a este correo y su mensaje llegará al equipo de la empresa.
          </p>
        </td>
      </tr>
    </table>`;
}

function publicLinkBlock(publicReceiptUrl) {
    if (!publicReceiptUrl?.trim()) return "";
    const url = escapeHtml(publicReceiptUrl.trim());
    return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 20px;">
      <tr>
        <td align="center" style="padding:16px 20px;background-color:#ecfdf5;border-radius:10px;border:1px solid #a7f3d0;">
          <p style="margin:0 0 12px;font-size:14px;color:#065f46;font-family:Arial,Helvetica,sans-serif;">
            También puede ver y descargar su comprobante en línea:
          </p>
          <a href="${url}" style="display:inline-block;padding:12px 24px;background-color:#059669;color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;border-radius:8px;font-family:Arial,Helvetica,sans-serif;">
            Ver comprobante
          </a>
        </td>
      </tr>
    </table>`;
}

export function saleReceiptEmailSubject({ businessName, saleNumber, documentLabel }) {
    const biz = businessName?.trim() || "su proveedor";
    const num = saleNumber ? ` #${saleNumber}` : "";
    const doc = documentLabel?.trim() || "Comprobante de venta";
    return `${doc}${num} — ${biz}`;
}

export function saleReceiptEmailTemplate({
    businessName,
    businessLogoUrl = null,
    contactEmail,
    contactPhone,
    contactAddress,
    contactDocument,
    customerName,
    saleNumber,
    saleDate,
    documentLabel,
    saleComment,
    items,
    netTotal,
    ivaTotal,
    total,
    publicReceiptUrl = null,
    hasPdfAttachment = false,
}) {
    const itemRows = (items ?? [])
        .map((item, idx) =>
            lineItemRow({
                index: idx + 1,
                name: item.name,
                sku: item.sku,
                quantity: item.quantity,
                unitPrice: item.unitPrice,
                lineTotal: item.lineTotal,
                isLast: idx === items.length - 1,
            }),
        )
        .join("");

    const bodyHtml = `
      <p class="email-body-text" style="margin:0 0 8px;font-size:16px;line-height:1.65;color:#374151;font-family:Arial,Helvetica,sans-serif;">
        Estimado/a <strong class="email-heading" style="color:#021f41;">${escapeHtml(customerName)}</strong>,
      </p>
      <p class="email-body-text" style="margin:0 0 20px;font-size:16px;line-height:1.65;color:#374151;font-family:Arial,Helvetica,sans-serif;">
        <strong class="email-heading" style="color:#021f41;">${escapeHtml(businessName)}</strong> le envía el siguiente
        <strong class="email-heading" style="color:#021f41;"> ${escapeHtml(documentLabel)}</strong>
        ${saleNumber ? `<strong class="email-heading" style="color:#021f41;"> #${escapeHtml(String(saleNumber))}</strong>` : ""}.
        ${hasPdfAttachment ? " Adjuntamos el detalle en formato PDF." : ""}
      </p>

      ${publicLinkBlock(publicReceiptUrl)}

      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:20px;">
        ${receiptRow("Fecha", escapeHtml(saleDate || "—"))}
        ${receiptRow("Ítems", String(items?.length ?? 0), true)}
      </table>

      <p class="email-heading" style="margin:0 0 10px;font-size:12px;font-weight:700;color:#021f41;text-transform:uppercase;letter-spacing:0.4px;font-family:Arial,Helvetica,sans-serif;">Detalle</p>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:16px;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
        <tr bgcolor="#f8fafc" style="background-color:#f8fafc;">
          <th align="left" style="padding:10px 8px;font-size:11px;color:#6b7280;text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;">#</th>
          <th align="left" style="padding:10px 8px;font-size:11px;color:#6b7280;text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;">Producto / Servicio</th>
          <th align="center" style="padding:10px 8px;font-size:11px;color:#6b7280;text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;">Cant.</th>
          <th align="right" style="padding:10px 8px;font-size:11px;color:#6b7280;text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;">Precio</th>
          <th align="right" style="padding:10px 8px;font-size:11px;color:#6b7280;text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;">Total</th>
        </tr>
        ${itemRows || `<tr><td colspan="5" style="padding:16px;text-align:center;color:#9ca3af;font-size:13px;">Sin ítems</td></tr>`}
      </table>

      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:8px;">
        ${receiptRow("Neto", escapeHtml(formatCurrency(netTotal)))}
        ${receiptRow("IVA (19%)", escapeHtml(formatCurrency(ivaTotal)))}
        ${receiptRow("Total", `<span style="font-size:18px;font-weight:800;">${escapeHtml(formatCurrency(total))}</span>`, true)}
      </table>

      ${saleComment?.trim()
        ? `<p class="email-muted" style="margin:16px 0 0;font-size:14px;line-height:1.6;color:#6b7280;font-family:Arial,Helvetica,sans-serif;">
            <strong>Notas:</strong> ${escapeHtml(saleComment.trim())}
          </p>`
        : ""}

      ${contactBlock({
        businessName,
        contactEmail,
        contactPhone,
        contactAddress,
        contactDocument,
      })}`;

    return wrapBusinessEmailLayout({
        title: saleReceiptEmailSubject({ businessName, saleNumber, documentLabel }),
        preheader: `${documentLabel} de ${businessName} por ${formatCurrency(total)}.`,
        businessName,
        businessLogoUrl,
        bodyHtml,
    });
}

export function saleReceiptEmailText({
    businessName,
    contactEmail,
    contactPhone,
    contactAddress,
    contactDocument,
    customerName,
    saleNumber,
    saleDate,
    documentLabel,
    saleComment,
    items,
    netTotal,
    ivaTotal,
    total,
    publicReceiptUrl = null,
    hasPdfAttachment = false,
}) {
    const lines = (items ?? []).map((item, idx) =>
        `${idx + 1}. ${item.name} x${item.quantity} — ${formatCurrency(item.lineTotal)}`,
    );

    const linkLine = publicReceiptUrl?.trim()
        ? `\nVer comprobante en línea: ${publicReceiptUrl.trim()}\n`
        : "";
    const pdfLine = hasPdfAttachment ? "\n(Se adjunta PDF con el detalle.)\n" : "";

    return `${documentLabel}${saleNumber ? ` #${saleNumber}` : ""} — ${businessName}

Estimado/a ${customerName},

${businessName} le envía el siguiente ${documentLabel}.${pdfLine}${linkLine}

Fecha: ${saleDate || "—"}
Ítems: ${items?.length ?? 0}

DETALLE
${lines.join("\n")}

Neto: ${formatCurrency(netTotal)}
IVA (19%): ${formatCurrency(ivaTotal)}
Total: ${formatCurrency(total)}

${saleComment?.trim() ? `Notas: ${saleComment.trim()}\n` : ""}
---
CONTACTO — ${businessName}
${contactEmail ? `Correo: ${contactEmail}\n` : ""}${contactPhone ? `Teléfono: ${contactPhone}\n` : ""}${contactAddress ? `Dirección: ${contactAddress}\n` : ""}${contactDocument ? `${contactDocument}\n` : ""}
Puede responder a este correo y su mensaje llegará al equipo de la empresa.
`;
}
