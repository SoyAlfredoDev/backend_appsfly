import { describe, expect, it } from "vitest";
import { parseClothingVariants } from "../services/sales/clothingVariants.js";

const parent = { name: "Polera", sku: "POL", categoryId: "ropa", price: 12000 };
const blackMedium = { sku: "POL-M", options: { talla: " M ", color: "Negro" }, initialStock: 2 };

describe("variantes de ropa", () => {
  it("normaliza talla y color, y fija la unidad sin aceptar opciones ajenas", () => {
    expect(parseClothingVariants({ parent, variants: [blackMedium] })).toEqual({
      parent: { ...parent, unit: "UNIT", priceFixed: true },
      variants: [{ sku: "POL-M", options: { talla: "M", color: "negro" }, initialStock: 2 }],
    });
  });

  it.each([
    { ...blackMedium, sku: "POL-L", options: { talla: "m", color: "negro" } },
    { ...blackMedium, sku: "pol-m", options: { talla: "L", color: "negro" } },
    { ...blackMedium, sku: "POL-L", options: { talla: "L", color: "" } },
    { ...blackMedium, sku: "POL-L", options: { talla: "L", color: "negro" }, initialStock: -1 },
  ])("rechaza un lote con combinaciones, SKU o stock inválidos", (variant) => {
    expect(() => parseClothingVariants({ parent, variants: [blackMedium, variant] })).toThrow(
      expect.objectContaining({ code: "INVALID_CLOTHING_VARIANTS", statusCode: 400 }),
    );
  });
});
