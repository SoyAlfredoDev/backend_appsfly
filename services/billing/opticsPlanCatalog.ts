/**
 * Catálogo vigente de ópticas. Los precios netos en CLP fueron confirmados
 * el 4 de octubre de 2026. El historial y las reglas están en
 * backend/docs/plans-catalog.md.
 *
 * P002, P003 y P004 quedan como historial. No se les cambia el precio:
 * P002 tiene un preapproval de Mercado Pago por $11.888.
 */

export const OPTICS_VERTICAL = "optics" as const;

export type PlanVertical = typeof OPTICS_VERTICAL | "restaurant";

export type PriceApproval = "APPROVED";

export type CapabilityState = "available" | "requires_development" | "not_plan_gated";

export type OpticsTier = "start" | "pro" | "elite" | "trial";

export type CapabilityId =
  | "customers"
  | "prescriptions"
  | "sales"
  | "quotations"
  | "work_orders"
  | "laboratories"
  | "inventory"
  | "purchase_certificates"
  | "cash_and_expenses"
  | "reports"
  | "appointments"
  | "tax_documents"
  | "assistant"
  | "branches"
  | "seat_limit";

export type CatalogCapability = {
  id: CapabilityId;
  label: string;
  state: CapabilityState;
  evidence: string;
};

export type CatalogPrice = {
  currency: "CLP";
  netAmount: number;
  approval: PriceApproval;
  confirmedOn: "2026-10-04";
};

export type OpticsPlanDefinition = {
  planId: string;
  tier: OpticsTier;
  vertical: typeof OPTICS_VERTICAL;
  displayName: string;
  maxUsers: number;
  durationMonths: number;
  allowsAdditionalBranches: boolean;
  capabilities: CatalogCapability[];
  price: CatalogPrice | null;
  billable: boolean;
  databaseMode: "SHARED";
};

export const PLAN_IDS = {
  trial: "P001",
  legacyCommercial: "P002",
  legacyProfessional: "P003",
  legacyOptics: "P004",
  start: "P005",
  pro: "P006",
  elite: "P007",
} as const;

export const LEGACY_PLAN_IDS = [
  PLAN_IDS.legacyCommercial,
  PLAN_IDS.legacyProfessional,
  PLAN_IDS.legacyOptics,
] as const;

const CORE_OPTICS: CatalogCapability[] = [
  {
    id: "customers",
    label: "Clientes",
    state: "available",
    evidence: "Modelo Customer y rutas de clientes.",
  },
  {
    id: "prescriptions",
    label: "Recetas OD/OI",
    state: "available",
    evidence: "Modelo Prescription y rutas de recetas.",
  },
  {
    id: "sales",
    label: "Ventas",
    state: "available",
    evidence: "Modelo Sale y flujo de venta.",
  },
  {
    id: "quotations",
    label: "Cotizaciones",
    state: "available",
    evidence: "Modelo Quotation y envío de la cotización por correo.",
  },
  {
    id: "work_orders",
    label: "Órdenes de trabajo",
    state: "available",
    evidence: "Modelo WorkOrder y rutas de óptica.",
  },
  {
    id: "laboratories",
    label: "Laboratorios y despachos",
    state: "available",
    evidence: "Modelos Laboratory y LabDispatch.",
  },
  {
    id: "inventory",
    label: "Inventario",
    state: "available",
    evidence: "ProductStock e InventoryMovement.",
  },
  {
    id: "purchase_certificates",
    label: "Certificados de compra",
    state: "available",
    evidence: "Modelo PurchaseCertificate.",
  },
  {
    id: "cash_and_expenses",
    label: "Cierres diarios y gastos",
    state: "available",
    evidence: "Modelos DailySales y Expense.",
  },
  {
    id: "reports",
    label: "Reportes",
    state: "available",
    evidence: "Rutas de reportes.",
  },
];

const APPOINTMENTS: CatalogCapability = {
  id: "appointments",
  label: "Citas",
  state: "available",
  evidence: "Módulo de citas, habilitado por el identificador del plan.",
};

const TAX_DOCUMENTS: CatalogCapability = {
  id: "tax_documents",
  label: "Boleta y factura electrónica",
  state: "not_plan_gated",
  evidence: "TaxDocument existe. La emisión además exige la cuenta de facturación del negocio.",
};

const ASSISTANT: CatalogCapability = {
  id: "assistant",
  label: "Asistente con IA",
  state: "not_plan_gated",
  evidence: "El asistente existe. El plan Pro, Élite y la prueba lo incluyen.",
};

const BRANCHES: CatalogCapability = {
  id: "branches",
  label: "Sucursales",
  state: "requires_development",
  evidence: "No hay entidad de sucursal. No se ofrece como función disponible.",
};

const SEAT_LIMIT: CatalogCapability = {
  id: "seat_limit",
  label: "Tope de usuarios",
  state: "available",
  evidence: "El servidor rechaza invitaciones que superan maxUsers del plan vigente.",
};

const PRO_CAPABILITIES: CatalogCapability[] = [
  ...CORE_OPTICS,
  APPOINTMENTS,
  TAX_DOCUMENTS,
  ASSISTANT,
  SEAT_LIMIT,
];

function approvedPrice(netAmount: number): CatalogPrice {
  return {
    currency: "CLP",
    netAmount,
    approval: "APPROVED",
    confirmedOn: "2026-10-04",
  };
}

export const OPTICS_PLANS: readonly OpticsPlanDefinition[] = [
  {
    planId: PLAN_IDS.start,
    tier: "start",
    vertical: OPTICS_VERTICAL,
    displayName: "Start",
    maxUsers: 1,
    durationMonths: 1,
    allowsAdditionalBranches: false,
    capabilities: [...CORE_OPTICS, SEAT_LIMIT],
    price: approvedPrice(24990),
    billable: true,
    databaseMode: "SHARED",
  },
  {
    planId: PLAN_IDS.pro,
    tier: "pro",
    vertical: OPTICS_VERTICAL,
    displayName: "Pro",
    maxUsers: 5,
    durationMonths: 1,
    allowsAdditionalBranches: false,
    capabilities: PRO_CAPABILITIES,
    price: approvedPrice(39990),
    billable: true,
    databaseMode: "SHARED",
  },
  {
    planId: PLAN_IDS.elite,
    tier: "elite",
    vertical: OPTICS_VERTICAL,
    displayName: "Élite",
    maxUsers: 10,
    durationMonths: 1,
    allowsAdditionalBranches: false,
    capabilities: [...PRO_CAPABILITIES, BRANCHES],
    price: approvedPrice(49990),
    billable: true,
    databaseMode: "SHARED",
  },
  {
    planId: PLAN_IDS.trial,
    tier: "trial",
    vertical: OPTICS_VERTICAL,
    displayName: "Prueba Pro",
    maxUsers: 5,
    durationMonths: 2,
    allowsAdditionalBranches: false,
    capabilities: PRO_CAPABILITIES,
    price: null,
    billable: false,
    databaseMode: "SHARED",
  },
];

export const VERTICAL_CATALOGS: Record<
  PlanVertical,
  { enabled: boolean; plans: readonly OpticsPlanDefinition[] }
> = {
  optics: { enabled: true, plans: OPTICS_PLANS },
  restaurant: { enabled: false, plans: [] },
};

const LEGACY_APPOINTMENT_PLAN_IDS = [PLAN_IDS.legacyCommercial, PLAN_IDS.legacyProfessional];

export function findOpticsPlan(planId: string | null | undefined): OpticsPlanDefinition | null {
  return OPTICS_PLANS.find((plan) => plan.planId === planId) ?? null;
}

export function publicFeatureLabels(plan: OpticsPlanDefinition): string[] {
  const seatLabel = plan.maxUsers === 1 ? "1 usuario" : `Hasta ${plan.maxUsers} usuarios`;
  const items = plan.capabilities
    .filter((capability) => capability.id !== "seat_limit" && capability.id !== "branches")
    .filter((capability) => capability.state !== "requires_development")
    .map((capability) => capability.label);
  return [seatLabel, ...items];
}

export function planIncludesCapability(
  planId: string | null | undefined,
  capabilityId: CapabilityId,
): boolean {
  const current = findOpticsPlan(planId);
  if (current) {
    const capability = current.capabilities.find((item) => item.id === capabilityId);
    return capability != null && capability.state !== "requires_development";
  }
  if (capabilityId === "appointments") {
    return LEGACY_APPOINTMENT_PLAN_IDS.includes(
      planId as (typeof LEGACY_APPOINTMENT_PLAN_IDS)[number],
    );
  }
  if (capabilityId === "tax_documents" || capabilityId === "assistant") {
    return planId === PLAN_IDS.legacyProfessional;
  }
  return false;
}

export function maxUsersForPlan(planId: string | null | undefined): number | null {
  return findOpticsPlan(planId)?.maxUsers ?? null;
}

export function canClaimOpticsTrial(existingSubscriptionCount: number): boolean {
  return existingSubscriptionCount === 0;
}

export function isOpticsPlanBillable(plan: OpticsPlanDefinition): boolean {
  return plan.billable && plan.price?.approval === "APPROVED" && plan.price.netAmount > 0;
}

export function assertApprovedCheckoutPrice(plan: OpticsPlanDefinition): void {
  if (!isOpticsPlanBillable(plan)) {
    const error = new Error("Este plan no tiene una tarifa aprobada para cobrar.");
    error.name = "PLAN_PRICE_NOT_APPROVED";
    throw error;
  }
}

export function isSeatAvailable(input: { maxUsers: number | null; occupied: number }): boolean {
  if (input.maxUsers == null) return true;
  return input.occupied < input.maxUsers;
}
