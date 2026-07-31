/**
 * Normaliza la respuesta de producto incluyendo stock disponible.
 * Mantiene `productStock` como número para compatibilidad con vistas existentes.
 */
export function serializeProductWithStock(product) {
    if (!product) return null;

    const quantityOnHand =
        typeof product.productStock === "number"
            ? product.productStock
            : product.productStock?.quantityOnHand ?? product.quantityOnHand ?? 0;

    const { productStock: _nestedStock, attributeValues, codes, ...rest } = product;

    const attributesMap = {};
    const attributeValuesList = Array.isArray(attributeValues) ? attributeValues : [];
    for (const row of attributeValuesList) {
        const key = row.categoryAttribute?.attributeKey || row.categoryAttributeId;
        if (key) attributesMap[key] = row.value;
    }

    return {
        ...rest,
        productStock: quantityOnHand,
        quantityOnHand,
        productAllowZeroStock: product.productAllowZeroStock ?? false,
        productRequiresLabWork: product.productRequiresLabWork ?? false,
        attributeValues: attributeValuesList,
        attributes: attributesMap,
        codes: Array.isArray(codes) ? codes : [],
    };
}

export function serializeProductsWithStock(products) {
    return (products ?? []).map(serializeProductWithStock);
}
