/**
 * Etiquetas de roles de negocio (tenant). No aplica al panel /admin de AppsFly.
 * El valor persistido en BD para vendedor sigue siendo "USER".
 */
export function getTenantRoleLabel(role) {
    if (role === "ADMIN") return "Administrador";
    if (role === "USER") return "Vendedor";
    return role ?? "—";
}
