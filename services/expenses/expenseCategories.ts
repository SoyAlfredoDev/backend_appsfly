export const SYSTEM_EXPENSE_CATEGORIES = [
  { code: "RENT", name: "Arriendo" },
  { code: "UTILITIES", name: "Servicios básicos" },
  { code: "SUPPLIES", name: "Insumos" },
  { code: "PAYROLL", name: "Remuneraciones" },
  { code: "MARKETING", name: "Marketing" },
  { code: "OTHER", name: "Otros" },
] as const;

export type SystemExpenseCategoryCode = (typeof SYSTEM_EXPENSE_CATEGORIES)[number]["code"];
