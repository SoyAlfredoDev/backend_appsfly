import type { CategoryAttribute } from "../../src/generated/business/index.js";

type AttributeDefinition = Pick<
  CategoryAttribute,
  | "categoryAttributeId"
  | "attributeKey"
  | "attributeLabel"
  | "dataType"
  | "isRequired"
  | "optionsJson"
>;

function invalid(message: string) {
  return Object.assign(new Error(message), {
    statusCode: 400,
    code: "INVALID_PRODUCT_ATTRIBUTES",
  });
}

function listOptions(optionsJson: string | null): unknown[] {
  try {
    const options: unknown = JSON.parse(optionsJson ?? "[]");
    return Array.isArray(options) ? options : [];
  } catch {
    return [];
  }
}

export function validateHardwareProductAttributes(
  definitions: AttributeDefinition[],
  input: unknown,
  {
    requireAll,
    previousValues,
  }: { requireAll: boolean; previousValues: Map<string, string | null> },
) {
  if (input != null && (typeof input !== "object" || Array.isArray(input))) {
    throw invalid("Los atributos del producto deben enviarse por nombre o identificador.");
  }
  const values = (input ?? {}) as Record<string, unknown>;
  const validated: Record<string, string | null> = Object.create(null);

  for (const definition of definitions) {
    const { attributeKey, categoryAttributeId, attributeLabel, dataType, isRequired, optionsJson } =
      definition;
    const key = Object.hasOwn(values, attributeKey) ? attributeKey : categoryAttributeId;
    const supplied = Object.hasOwn(values, key);
    if (!supplied && !requireAll) continue;

    const raw = values[key];
    const value = typeof raw === "string" ? raw.trim() : raw;
    if (value == null || value === "") {
      if (isRequired) throw invalid(`Completa el atributo «${attributeLabel}».`);
      if (supplied) validated[attributeKey] = null;
      continue;
    }

    const valid =
      (dataType === "TEXT" && typeof value === "string") ||
      (dataType === "NUMBER" &&
        (typeof value === "number" || typeof value === "string") &&
        Number.isFinite(Number(value))) ||
      (dataType === "BOOLEAN" &&
        (typeof value === "boolean" || value === "true" || value === "false")) ||
      (dataType === "SELECT" &&
        typeof value === "string" &&
        (listOptions(optionsJson).includes(value) ||
          previousValues.get(categoryAttributeId) === value));
    if (!valid) throw invalid(`Ingresa un valor válido para «${attributeLabel}».`);

    validated[attributeKey] = String(value);
  }
  return validated;
}
