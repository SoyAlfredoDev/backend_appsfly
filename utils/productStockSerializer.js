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

    const { productStock: _nestedStock, ...rest } = product;

    return {
        ...rest,
        productStock: quantityOnHand,
        quantityOnHand,
        productAllowZeroStock: product.productAllowZeroStock ?? false,
    };
}

export function serializeProductsWithStock(products) {
    return (products ?? []).map(serializeProductWithStock);
}
