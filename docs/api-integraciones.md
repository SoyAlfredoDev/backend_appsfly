# API de integraciones de AppsFly

En **Configuración → Llaves de integración**, un administrador crea una llave y selecciona los permisos. AppsFly muestra la llave completa al crearla. Guárdala en el servidor del sistema externo y envíala mediante `Authorization: Bearer <llave>`. Cada llave pertenece al negocio que la creó. Para renovar una llave, crea una nueva, actualiza el conector y revoca la anterior.

## Operaciones

Usa `Content-Type: application/json` y la base `/api/integrations/v1`. Los montos son pesos enteros (CLP). Los identificadores externos admiten hasta 100 caracteres y son únicos por negocio y tipo de operación. Usa un prefijo para cada sistema de origen, como `caja:...`. Conserva el mismo identificador y los mismos datos cada vez que reintentes, incluso tras rotar la llave.

### Crear o vincular un cliente

`POST /customers` requiere `customers:write`.

```json
{"externalId":"caja:cliente:123","firstName":"Ana","lastName":"Pérez"}
```

Son opcionales `lastName`, `email`, `phone`, `documentType` y `documentNumber` (el número exige tipo). Para vincular un cliente existente, envía `externalId` y `appsflyCustomerId`. Confirma la identidad antes de vincularlo.

### Registrar una venta

`POST /sales` requiere `sales:write`. Si incluye pagos iniciales, requiere también `payments:write`.

```json
{
  "externalId":"caja:venta:456",
  "occurredOn":"2026-11-19",
  "customerExternalId":"caja:cliente:123",
  "lines":[{"sku":"SKU-1","quantity":2,"unitPrice":5000}],
  "payments":[{"externalId":"caja:abono:001","amount":2000,"method":"transfer","confirmed":true}]
}
```

Usa el SKU de AppsFly. Indica `type: "SERVICE"` para servicios y el SKU de la variante para ropa. AppsFly calcula el total desde las líneas, valida precios fijos y stock, registra los pagos y deja el saldo pendiente cuando el negocio admite crédito. La API registra comprobantes internos. Los productos ópticos que requieren orden de laboratorio se registran en el flujo de Óptica.

### Registrar un abono confirmado

`POST /payments` requiere `payments:write`. Envía `saleExternalId` para ventas integradas o `appsflySaleId` para una venta existente.

```json
{
  "externalId":"caja:abono:002",
  "saleExternalId":"caja:venta:456",
  "occurredOn":"2026-11-19",
  "amount":3000,
  "method":"transfer",
  "confirmed":true
}
```

Los métodos son `debit`, `credit_card`, `cash` y `transfer`. Los pagos iniciales aceptados se pueden reenviar al endpoint de abonos con la misma referencia, venta externa, monto, método y fecha.

## Respuesta y reintentos

- `201` confirma un registro nuevo. `200` con `replayed: true` devuelve el resultado original.
- `409` indica un conflicto, como una referencia repetida con datos distintos, stock insuficiente, fecha distinta del día operativo, un cierre pendiente o un abono superior al saldo. Revisa el campo `code` y conserva la operación en el sistema de origen para conciliarla. La fecha se evalúa en la zona horaria del negocio.
- `429` indica que se alcanzó el límite de 120 solicitudes por llave por minuto. Respeta `Retry-After`. Ante un tiempo de espera o `503`, reintenta con la misma referencia y los mismos datos.

Las migraciones `20261119120000_integration_api` deben estar instaladas en GeneralDB, SharedDB y las bases dedicadas de los negocios que usarán la función. Para revertir la habilitación, revoca las llaves o retira las rutas y conserva las referencias ya registradas.
