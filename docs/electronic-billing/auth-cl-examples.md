# Auth.cl — Ejemplos de integración

Proveedor principal de facturación electrónica en AppsFly. La API REST está documentada en [auth.cl](https://auth.cl) y [yamt.com/api](https://yamt.com/api).

## Autenticación

```http
Authorization: Bearer {AUTH_API_KEY}
X-Auth-Secret: {AUTH_API_SECRET}   # opcional, según contrato Auth.cl
Content-Type: application/json
```

En AppsFly las credenciales pueden ser:
- **Globales:** variables `AUTH_API_KEY` / `AUTH_API_SECRET` en `.env`
- **Por empresa:** `PUT /api/tax-documents/config` (almacenadas cifradas en `TaxProviderAccount`)

---

## 1. Emitir boleta electrónica (tipo 39)

```http
POST https://api.yamt.com/v1/dte
Authorization: Bearer sk_live_xxxxxxxx
```

```json
{
  "tipoDte": 39,
  "folio": 120,
  "fechaEmision": "2026-06-24",
  "emisor": {
    "rut": "76123456-7",
    "razonSocial": "Mi Negocio SpA",
    "giro": "Venta al por menor",
    "direccion": "Av. Providencia 123",
    "comuna": "Providencia",
    "ciudad": "Santiago"
  },
  "receptor": {
    "rut": "11111111-1",
    "nombre": "Cliente Consumidor Final"
  },
  "totales": {
    "montoNeto": 8403,
    "iva": 1597,
    "montoTotal": 10000
  },
  "detalle": [
    {
      "nombreItem": "Producto A",
      "cantidad": 1,
      "precioUnitario": 10000,
      "montoItem": 10000
    }
  ]
}
```

**Respuesta esperada:**

```json
{
  "id": "dte_abc123",
  "folio": 120,
  "estado": "ENVIADO",
  "estadoSii": "EPR",
  "pdfUrl": "https://...",
  "xmlUrl": "https://..."
}
```

En AppsFly este payload lo construye `authMappers.js` y lo envía `AuthProvider.createBoleta()`.

---

## 2. Emitir factura electrónica (tipo 33)

Igual que boleta, con `tipoDte: 33` y receptor con datos completos:

```json
{
  "tipoDte": 33,
  "folio": 45,
  "fechaEmision": "2026-06-24",
  "emisor": { "rut": "76123456-7", "razonSocial": "Mi Negocio SpA" },
  "receptor": {
    "rut": "76543210-9",
    "razonSocial": "Cliente Empresa Ltda",
    "giro": "Servicios informáticos",
    "direccion": "Los Leones 456",
    "comuna": "Las Condes",
    "ciudad": "Santiago",
    "email": "facturacion@cliente.cl"
  },
  "totales": { "montoNeto": 50000, "iva": 9500, "montoTotal": 59500 },
  "detalle": [
    { "nombreItem": "Servicio mensual", "cantidad": 1, "montoItem": 59500 }
  ]
}
```

Desde el frontend, el usuario completa el receptor en `FacturaReceiverForm` antes de confirmar la venta.

---

## 3. Consultar estado

```http
GET https://api.yamt.com/v1/dte/dte_abc123
Authorization: Bearer sk_live_xxxxxxxx
```

AppsFly: `POST /api/tax-documents/:id/sync` → `AuthProvider.getStatus(trackId)`.

---

## 4. Obtener PDF

```http
GET https://api.yamt.com/v1/dte/dte_abc123/pdf
Authorization: Bearer sk_live_xxxxxxxx
```

AppsFly: `AuthProvider.generatePdf(documentId)`.

---

## 5. Configurar empresa en AppsFly

```http
PUT /api/tax-documents/config
Authorization: Bearer {jwt_usuario}
X-AppsFly-Business-Id: {businessId}
```

```json
{
  "provider": "AUTH_CL",
  "authApiKey": "sk_live_empresa_xxx",
  "authApiSecret": "secret_empresa_xxx",
  "environment": "sandbox",
  "businessActivity": "Comercio minorista",
  "businessAddress": "Av. Principal 100",
  "businessCommune": "Santiago",
  "businessCity": "Santiago",
  "certificateStatus": "ACTIVE",
  "isEnabled": true
}
```

---

## 6. Flujo completo desde venta (AppsFly)

```javascript
// 1. Registrar venta con tipo de comprobante
const sale = await axios.post("/sales", {
  documentType: "BOLETA", // RECEIPT | BOLETA | FACTURA
  // ... ítems, cliente, etc.
});

// 2. Si es DTE, emitir
if (sale.data.documentType !== "RECEIPT") {
  const { data } = await axios.post("/tax-documents/issue", {
    saleId: sale.data.saleId,
    documentType: "BOLETA",
    receiver: { rut: "11111111-1", name: "Cliente" }, // obligatorio en FACTURA
  });
  console.log(data.document.folio, data.document.trackId, data.document.pdfUrl);
}
```

---

## 7. Manejo de errores y reintentos

- Errores del proveedor → `TaxDocument.status = ERROR`, `lastError` persistido
- Auditoría en `TaxDocumentAuditLog` (acción `EMIT_FAILED`)
- Reintento manual: `POST /api/tax-documents/:id/retry`
- Límite configurable: `TAX_DOCUMENT_RETRY_MAX` (default 3)

---

## Modo simulado (desarrollo)

Sin `AUTH_API_KEY` ni credenciales por empresa habilitadas, `AuthProvider` devuelve emisión simulada:

```json
{
  "simulated": true,
  "message": "Emisión simulada: configure AUTH_API_KEY o credenciales por empresa."
}
```

Útil para probar el flujo de venta sin certificado SII.
