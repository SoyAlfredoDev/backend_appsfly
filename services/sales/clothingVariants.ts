function invalid(message: string): never {
  throw Object.assign(new Error(message), { statusCode: 400, code: "INVALID_CLOTHING_VARIANTS" });
}

function record(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    invalid("Revisa los datos del modelo y las variantes.");
  }
  return value as Record<string, unknown>;
}

function text(value: unknown, label: string, maxLength = 80) {
  if (typeof value !== "string") invalid(`Completa ${label}.`);
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > maxLength) invalid(`Revisa ${label}.`);
  return trimmed;
}

function integer(value: unknown, label: string) {
  if (typeof value !== "number" || !Number.isInteger(value) || value < 0 || value > 2_000_000_000) {
    invalid(`Ingresa ${label} como un número entero válido.`);
  }
  return value;
}

export function parseClothingVariants(value: unknown) {
  const body = record(value);
  const parent = record(body.parent);
  if (!Array.isArray(body.variants) || body.variants.length === 0) {
    invalid("Agrega al menos una combinación de talla y color.");
  }
  if (body.variants.length > 1000) invalid("La familia admite hasta 1.000 variantes.");

  const parentSku = text(parent.sku, "el SKU del modelo");
  const seenSkus = new Set([parentSku.toLocaleUpperCase("es-CL")]);
  const seenOptions = new Set<string>();
  const variants = body.variants.map((value: unknown) => {
    const item = record(value);
    const options = record(item.options);
    const talla = text(options.talla, "la talla", 40).toLocaleUpperCase("es-CL");
    const color = text(options.color, "el color", 60).toLocaleLowerCase("es-CL");
    const sku = text(item.sku, "el SKU de la variante");
    const normalizedSku = sku.toLocaleUpperCase("es-CL");
    const key = JSON.stringify({ color, talla });
    if (seenOptions.has(key)) invalid(`La combinación ${talla} / ${color} está repetida.`);
    if (seenSkus.has(normalizedSku)) invalid(`El SKU ${sku} está repetido en el modelo.`);
    seenOptions.add(key);
    seenSkus.add(normalizedSku);
    return {
      sku,
      options: { talla, color },
      initialStock: integer(item.initialStock, "el stock inicial"),
    };
  });

  return {
    parent: {
      name: text(parent.name, "el nombre del modelo", 120),
      sku: parentSku,
      categoryId: text(parent.categoryId, "la categoría"),
      price: integer(parent.price, "el precio"),
      priceFixed: true,
      unit: "UNIT",
    },
    variants,
  };
}

// Las familias antiguas podían guardar las etiquetas con mayúsculas o usar «size».
export function clothingCombinationKey(optionsJson: string | undefined) {
  if (!optionsJson) return null;
  try {
    const options = Object.entries(record(JSON.parse(optionsJson)));
    const get = (...keys: string[]) =>
      options.find(([name]) => keys.includes(name.trim().toLowerCase()))?.[1];
    const size = get("talla", "size");
    const color = get("color");
    if (typeof size !== "string" || typeof color !== "string") return null;
    return JSON.stringify({
      color: color.trim().toLocaleLowerCase("es-CL"),
      talla: size.trim().toLocaleUpperCase("es-CL"),
    });
  } catch {
    return null;
  }
}
