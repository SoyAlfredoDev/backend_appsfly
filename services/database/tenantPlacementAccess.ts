type Placement = {
  businessStatus?: string;
  businessDatabaseMode?: string;
  businessDatabaseStatus?: string;
  businessConnectionDB?: string | null;
};

export function assertTenantPlacement(placement: Placement, provisioning = false): void {
  const active =
    placement.businessStatus === "ACTIVE" && placement.businessDatabaseStatus === "ACTIVE";
  const preparing =
    provisioning &&
    placement.businessStatus === "PENDING" &&
    placement.businessDatabaseStatus === "PROVISIONING";
  if (!active && !preparing) {
    throw Object.assign(new Error("El espacio de trabajo no está listo para operar."), {
      statusCode: 503,
      code: "TENANT_PROVISIONING_INCOMPLETE",
    });
  }
  if (
    !["SHARED", "DEDICATED"].includes(placement.businessDatabaseMode ?? "") ||
    (placement.businessDatabaseMode === "DEDICATED" && !placement.businessConnectionDB)
  ) {
    throw Object.assign(new Error("La ubicación del negocio no es válida."), {
      statusCode: 503,
      code: "TENANT_DB_UNAVAILABLE",
    });
  }
}
