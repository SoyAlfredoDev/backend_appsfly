# Catálogo de planes de AppsFly

Documento interno. Describe el historial, el catálogo vigente y la forma de operarlo. El código que manda es `backend/services/billing/opticsPlanCatalog.ts`.

## Cómo se trabaja un plan

1. El plan vive en GeneralDB, tabla `Plan`. El identificador (`P001`, `P005`, …) no se reutiliza para otro producto.
2. `planPrice` es el neto mensual en CLP. El cobro suma IVA de 19% y Mercado Pago guarda ese total en el preapproval del cliente. Cambiar el precio del plan no cambia un preapproval ya autorizado.
3. `planFeatures` es la lista visible. Los límites y las funciones que el servidor aplica salen del catálogo, no del texto.
4. Una suscripción guarda una copia de las funciones y el monto cobrado. Esa copia no se reescribe al editar el plan.
5. La prueba se activa una sola vez por negocio, solo si no existe ninguna suscripción previa. Al terminar no se crea un cobro.
6. Los planes nuevos usan base compartida (`SHARED`). No se cambia ese modo si el plan ya tiene suscriptores.
7. Otros rubros, como restaurantes, no tienen planes. El catálogo está separado por `vertical`.

## Historial

Hasta el 4 de octubre de 2026 el catálogo publicado era este:

| ID   | Nombre           | Neto mensual   | Estado entonces                                             |
| ---- | ---------------- | -------------- | ----------------------------------------------------------- |
| P001 | Plan Básico      | $0 por 2 meses | Prueba. No incluía citas ni las funciones de Pro.           |
| P002 | Plan Comercial   | $9.990         | Cobro recurrente. Total con IVA: $11.888.                   |
| P003 | Plan Profesional | $39.990        | Publicado. Sin suscripciones activas.                       |
| P004 | Plan Óptica      | $19.990        | Activo en la API y oculto en la interfaz. Sin suscriptores. |

Había propuestas en UF (Start 0,6 o 0,7, Pro cerca de 1, Élite cerca de 1,5) que no se confirmaron y no se cobraron.

En producción hay un preapproval autorizado de «AppsFly — Plan Comercial» por $11.888 CLP al mes, con próximo cobro el 4 de noviembre de 2026. No está ligado a una fila de `Subscription`. Ese cobro no se modifica desde este catálogo.

## Catálogo vigente

Confirmado el 4 de octubre de 2026. Precios netos, más IVA. Solo ópticas.

| ID   | Plan       | Usuarios | Neto mensual | Duración                     | Funciones                                                                                                                          |
| ---- | ---------- | -------- | ------------ | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| P001 | Prueba Pro | 5        | $0           | 2 meses, una vez por negocio | Las de Pro. No inicia cobro al terminar.                                                                                           |
| P005 | Start      | 1        | $24.990      | 1 mes                        | Operación de óptica: clientes, recetas, ventas, cotizaciones, órdenes, laboratorios, inventario, certificados, cierres y reportes. |
| P006 | Pro        | 5        | $39.990      | 1 mes                        | Start, más citas, boleta y factura electrónica, y asistente.                                                                       |
| P007 | Élite      | 10       | $49.990      | 1 mes                        | Las de Pro, con el cupo de 10 usuarios. No se ofrece ni se cobra por ahora.                                                        |

P002, P003 y P004 quedan inactivos para nuevas contrataciones. Se conservan el identificador, el nombre y el precio.

El cobro de Start y Pro no usa el checkout de la API. Cada plan abre su link de Mercado Pago:

| Plan  | Link                       |
| ----- | -------------------------- |
| Start | `https://mpago.la/1AFYzNQ` |
| Pro   | `https://mpago.la/2Zet5b1` |

Élite no tiene link. `planActive` queda en falso hasta que exista uno. El precio de $49.990 se conserva.

Sucursales no están disponibles. El adicional de 0,5 UF desde la tercera sucursal no se cobra: no existe la entidad y la regla de la cuarta sucursal sigue sin una lectura única.

La boleta y la factura, además del plan, exigen la cuenta de facturación del negocio. El tope de usuarios se valida al invitar: cuentan los miembros y las invitaciones pendientes.
