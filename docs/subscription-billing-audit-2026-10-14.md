# Auditoría de suscripciones — 14 de octubre de 2026

## Alcance y estado

Fuentes: repositorios operativos `Desktop/appsfly/backend` y `frontend`, bases respectivas `82cc45e` y `ef02a4b`. Cambios desarrollados en ramas `codex/subscription-billing-audit`. Esta auditoría no implica despliegue ni certificación de cargos reales en Mercado Pago.

La consulta de solo lectura a GeneralDB encontró cuatro suscripciones P001 con `autoRenewEnabled=true` pero sin `mpPreapprovalId`, y una P005 también sin mandato. **Ninguna de esas cinco suscripciones tiene una autorización recurrente vinculada en la base observada.** El booleano no autoriza a cobrar una tarjeta. Es necesario que el cliente elija su plan y autorice el medio de pago.

Catálogo observado: P001 prueba de dos meses, P005 Start de $24.990 netos y P006 Pro de $39.990 netos, CLP, periodicidad mensual para los planes comerciales. El checkout suma IVA: $29.738 y $47.588 respectivamente. No se cambiaron planes, precios, credenciales ni registros productivos.

## Hallazgos y correcciones

| Prioridad | Problema anterior | Corrección |
|---|---|---|
| Crítica | Se interpretaba `authorized` como pago aprobado y se concedía un mes | Autorización crea un mandato pendiente; solamente un pago real `approved`, con referencias, moneda e importe correctos, concede acceso pagado |
| Crítica | No se enviaba fecha de inicio diferida | `auto_recurring.start_date` conserva el fin del período vigente; si MP no confirma esa fecha, no se entrega el checkout y se intenta cancelar el mandato remoto |
| Alta | Se rechazaba contratar durante una prueba activa | Se permite autorizar durante la prueba sin acortarla ni convertirla en un pago |
| Alta | Renovación por negocio y días fijos, omisión de cargos iniciales durante 48 horas | Renovación por mandato exacto, meses calendario con ajuste de fin de mes y fecha de débito de la factura; se elimina la omisión inicial |
| Alta | Mandato y primer cobro podían contarse dos veces; concurrencia webhook/cron | Primer cobro completa el checkout original; bloqueo de fila, recibo y extensión dentro de una transacción; deduplicación por pago |
| Alta | Un rechazo cortaba acceso y deshabilitaba renovaciones | El rechazo se registra aparte, informa al cliente y conserva el período pagado y los reintentos del proveedor |
| Alta | Cancelaciones podían afectar otros períodos o pisar una renovación concurrente | Cancelación del mandato concreto; relectura bajo bloqueo y conservación del período cobrado |
| Alta | Webhook devolvía éxito ante errores y toleraba secreto ausente | Error reintentable 503, firma obligatoria en producción y comparación segura |
| Alta | Consulta/confirmación de pagos sin comprobar negocio propietario | Comprobación del tenant del recurso y rol administrador |
| Media | Correos fuera del ciclo serverless y sin persistencia fiable | Envío esperado, registro persistente e idempotencia; el fallo se puede reintentar |
| Media | Faltaban avisos y la pantalla bloqueaba gestión tras vencer | Avisos programados y acceso a gestión de suscripción aun con acceso operativo vencido |

## Escenarios cubiertos

1. Inicio de prueba: dos meses calendario, sin cobro ni renovación ficticia.
2. Autorización durante la prueba: conserva fecha final y muestra autorización, no comprobante de pago.
3. Proveedor omite, adelanta o devuelve una fecha inválida: checkout bloqueado; si la cancelación remota falla, queda pendiente de revisión para evitar otro mandato.
4. Cliente sin período vigente: primer cargo puede ocurrir al contratar; la UI lo explica.
5. Checkout duplicado o cambio de plan con contratación pendiente: reutilización o conflicto 409, sin otro mandato.
6. Factura procesada pero pago pendiente, retención de validación, importe o moneda incorrectos: no activan acceso pagado.
7. Primer pago y renovaciones: un solo registro por cargo, meses calendario, sin sumar meses por repetir eventos.
8. Eventos atrasados, referencias de otro tenant y pagos asignados a otro contrato: validación y rechazo del cruce.
9. Cobro rechazado: aviso de problema, acceso previo conservado y reintentos sin deshabilitar.
10. Cancelación durante prueba o después de vencimiento: detiene cobros futuros y conserva períodos efectivamente pagados.
11. Cancelación concurrente con pago: no reemplaza el nuevo vencimiento con un estado calculado antes del cobro.
12. Fallo de correo: reintento con clave estable, sin volver a conceder acceso ni duplicar ingresos.
13. Pantalla de retorno: distingue autorización, pago, espera y error.

## Comunicación al cliente

Correo corporativo HTML y texto en español, con fechas de Chile, plan, importe cuando corresponde y enlace a gestión. Se separan: inicio de prueba, autorización de tarjeta, pago confirmado, intento fallido, ventana de siete días, último día y vencimiento sin pago. Los avisos de vencimiento se ejecutan en el cron diario existente; no se garantiza envío al minuto exacto. Se omiten períodos reemplazados por uno más reciente. Un comprobante de pago no se presenta como factura tributaria.

Se informa de la posible validación temporal de tarjeta de Mercado Pago. No es la mensualidad y no debe confundirse con un cobro del plan. Las referencias de envío persistidas indican aceptación por el proveedor de correo, no entrega comprobada en la bandeja del destinatario.

## Verificación y límites

Pruebas Vitest, Supertest, RTL y Playwright cubren reglas, contratos HTTP y navegación. Backend: suite completa con 274 pruebas aprobadas y seis omitidas; después se agregaron dos escenarios de avisos y la suite enfocada aprobó sus seis pruebas (276 casos aprobados en el conjunto final). Frontend: 138 pruebas aprobadas; tres recorridos Playwright aprobados. Formato, lint, tipos y compilaciones locales comprobados; persiste una advertencia anterior de hook en AppointmentGalleryCarousel y la advertencia de tamaño de bundle. La ejecución paralela final agotó memoria; la repetición con un proceso pasó. Mercado Pago, Resend y Prisma se simulan; las pruebas no introdujeron tarjetas ni enviaron correos externos. Las suites de integración PostgreSQL omitidas no prueban los bloqueos reales bajo concurrencia.

Antes de publicar: ejecutar el flujo con cuentas de prueba de Mercado Pago y PostgreSQL aislado; confirmar que el checkout alojado mantiene `start_date` después de autorizar, comprobar webhook firmado, cron y aceptación/entrega de correo. No se ha inspeccionado la configuración privada del panel de MP ni verificado un cargo real. No basta un build para certificar ese recorrido.

La conciliación pagina el historial de cargos; debe medirse su duración con volumen productivo antes de crecer, y migrarse a lotes persistentes si supera el tiempo de la función. No se implementó una política automática de reembolsos o contracargos: estos estados no se confunden con un nuevo pago ni cancelan otro plan; requieren revisión operativa. Un resultado remoto desconocido queda bloqueado para revisión, nunca provoca una segunda contratación automática.

## Plan de publicación y recuperación

1. Revisar diffs y pasar validación local de ambos repositorios.
2. Validar los puntos de integración externos anteriores con datos QA y conservar evidencia.
3. Publicar backend y frontend coordinados, verificando fuente y commits. Los cambios no agregan migraciones de esquema; usan campos existentes.
4. Comprobar autorización durante prueba, cobro de prueba cuando corresponde, rechazo, cancelación y avisos.
5. Ante anomalías, suspender nuevas contrataciones y revisar los mandatos remotos antes de revertir código. Un rollback de Git no cancela autorizaciones creadas en MP; no volver al código que confunde autorización con cobro ni modificar manualmente períodos pagados sin conciliación.

## Documentación primaria consultada

- [Suscripciones sin plan asociado, Mercado Pago Chile](https://www.mercadopago.cl/developers/es/docs/subscriptions/integration-configuration/subscription-no-associated-plan/authorized-payments).
- [Crear preapproval](https://www.mercadopago.cl/developers/es/reference/online-payments/subscriptions/create-preapproval/post).
- [Consultar pago autorizado](https://www.mercadopago.cl/developers/es/reference/online-payments/subscriptions/get-authorized-payment/get).
- [Buscar pagos autorizados](https://www.mercadopago.cl/developers/es/reference/online-payments/subscriptions/authorized-payment-search/get).
