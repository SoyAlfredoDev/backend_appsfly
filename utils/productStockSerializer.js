
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

    const {
        productStock: _nestedStock,
        attributeValues,
        codes,
        variantMetadata,
        variantParent,
        ...rest
    } = product;

    const attributesMap = {};
    const attributeValuesList = Array.isArray(attributeValues) ? attributeValues : [];
    for (const row of attributeValuesList) {
        const key = row.categoryAttribute?.attributeKey || row.categoryAttributeId;
        if (key) attributesMap[key] = row.value;
    }

    return {
        ...rest,
        productPrice: variantMetadata
            ? variantMetadata.priceOverride ?? variantParent?.productPrice ?? product.productPrice
            : product.productPrice,
        productPriceFixed: variantMetadata && variantMetadata.priceOverride == null
            ? variantParent?.productPriceFixed ?? product.productPriceFixed
            : product.productPriceFixed,
        productStock: quantityOnHand,
        quantityOnHand,
        productAllowZeroStock: product.productAllowZeroStock ?? false,
        productRequiresLabWork: product.productRequiresLabWork ?? false,
        attributeValues: attributeValuesList,
        attributes: attributesMap,
        variantParentId: product.variantParentId ?? null,
        variantOptions: variantMetadata?.optionsJson
            ? safeParseObject(variantMetadata.optionsJson)
            : {},
        codes: Array.isArray(codes) ? codes : [],
    };
}

function safeParseObject(value) {
    try {
        const parsed = JSON.parse(value);
        return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
    } catch {
        return {};
    }
}

export function serializeProductsWithStock(products) {
    return (products ?? []).map(serializeProductWithStock);
}

