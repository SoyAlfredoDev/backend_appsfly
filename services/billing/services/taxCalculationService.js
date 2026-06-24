const IVA_RATE = 0.19;

export function splitIvaFromGross(grossAmount) {
    const total = Math.round(Number(grossAmount) || 0);
    const net = Math.round(total / (1 + IVA_RATE));
    const tax = total - net;
    return { net, tax, total };
}

export function buildTaxLinesFromSaleDetails(details) {
    return details.map((detail, index) => {
        const gross = detail.saleDetailTotal ?? 0;
        const { net, tax } = splitIvaFromGross(gross);
        const name =
            detail.product?.productName ||
            detail.service?.serviceName ||
            `Ítem ${index + 1}`;

        return {
            lineNumber: index + 1,
            name,
            quantity: detail.saleDetailQuantity ?? 1,
            unitPrice: detail.saleDetailPrice ?? gross,
            grossAmount: gross,
            netAmount: net,
            taxAmount: tax,
        };
    });
}

export function summarizeSaleTax(details) {
    const lines = buildTaxLinesFromSaleDetails(details);
    return lines.reduce(
        (acc, line) => ({
            netAmount: acc.netAmount + line.netAmount,
            taxAmount: acc.taxAmount + line.taxAmount,
            totalAmount: acc.totalAmount + line.grossAmount,
        }),
        { netAmount: 0, taxAmount: 0, totalAmount: 0 },
    );
}
