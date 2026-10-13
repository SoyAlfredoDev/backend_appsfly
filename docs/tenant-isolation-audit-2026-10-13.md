# Auditoría y corrección del aislamiento multi-tenant — 2026-10-13

## Resultado y alcance

Se corrigieron vulnerabilidades de autorización en GeneralDB, límites de acceso al plano de datos y conservación de estado del frontend. El código está preparado para revisión y publicación coordinada de backend y frontend. Este trabajo no desplegó cambios ni modificó registros productivos. La verificación posterior al despliegue sigue siendo una condición de aceptación de producción.

Árbol trabajado: `C:\Users\Alfredo\Desktop\appsfly`, repositorios separados `backend` y `frontend`, rama local `codex/tenant-isolation-audit` en ambos. Se partió de `origin/main` backend `c342c2ca927d61bb2f9055550162f0e072813c4c` y frontend `b2c3f17b206902bacd4925cc8d9cbddd7483611f`. Se conservó el historial local sin reescribir commits existentes. La publicación debe incluir el conjunto completo de cambios de ambas ramas.

La arquitectura GeneralDB + bases dedicadas + sharedDB puede aislar correctamente negocios. Compartir una base física no implica compartir datos. El aislamiento exige simultáneamente membresías autorizadas en GeneralDB, contexto por transacción en sharedDB, credenciales limitadas, relaciones tenant-safe y estado de interfaz separado por identidad y negocio.

## Incidente informado: qué se comprobó

Alfredo indicó que al crear dos negocios aparecieron nombres de clientes ajenos y dejaron de aparecer después de actualizar la web. Las capturas muestran perfiles y negocios distintos en `appsfly.cl`, pero no contienen la respuesta HTTP que suministró esos clientes.

La inspección de producción fue de lectura: ambos negocios estaban SHARED, ACTIVE/ACTIVE, con un administrador creador propio y sin membresía cruzada en ese momento. El recuento actual encontró un cliente en uno y cero en el otro. Esto no prueba que antes no hubiera una exposición. Las 36 tablas operativas compartidas inspeccionadas tenían ENABLE/FORCE RLS y una política cada una.

Se reprodujo mediante pruebas de componentes un defecto que permitía conservar la lista montada al cambiar de negocio, y se corrigieron respuestas atrasadas y contexto de sesión residual. Es compatible con datos que desaparecen al recargar, pero no demuestra la causa única del incidente. Dos perfiles independientes de Chrome no comparten por sí solos el estado de React o localStorage. Sin la respuesta histórica, el commit servido y los registros de ese instante, no es correcto afirmar que todo fue únicamente visual.

El commit base del backend ya contenía una corrección anterior para exigir un rol runtime sin SUPERUSER/BYPASSRLS y separar DDL. Esta auditoría no debe confundirse con esa publicación anterior. El estado actual de tablas o membresías tampoco reconstruye qué credencial utilizó una instancia anterior.

## Hallazgos y correcciones

| Prioridad | Defecto comprobado en código | Corrección aplicada | Evidencia principal |
| --- | --- | --- | --- |
| Crítica | `POST /userBusiness` permitía a una cuenta autenticada elegir negocio y rol para darse acceso. | Se deniega la autoasignación con 403 `MEMBERSHIP_SELF_ASSIGNMENT_FORBIDDEN`; las membresías se crean internamente al provisionar o aceptar una invitación válida. | `controllers/userBusiness.controller.js`, `tests/tenantAuthorizationHttp.test.ts` |
| Crítica | El alta de negocio pasaba campos de cliente a Prisma, incluyendo ID y posibles escrituras anidadas. En una creación fallida podía actualizarse el ID enviado. | Lista explícita de campos escalares, UUID generado en servidor, ubicación y creador resueltos en servidor; solo se actualiza el registro efectivamente creado. | `services/database/businessRegistrationInput.ts`, `tests/businessProvisioningIsolationHttp.test.ts` |
| Alta | La aceptación de invitaciones confiaba en un rol enviado por el cliente; se permitían operaciones de invitaciones sin comprobar ADMIN del recurso real. | Rol tomado de la invitación persistida; correo confirmado para aceptarla; autorización ADMIN del negocio en creación, listado administrativo, reenvío y eliminación. | `controllers/userGuest.controller.js`, `tests/invitationIsolationHttp.test.ts` |
| Alta | El listado general de invitaciones consultaba todos los negocios y la consulta de suscripciones por ID carecía de comprobación tenant. | Filtro obligatorio de negocio en el servicio; autorización de membresía en suscripciones. | `services/userGuestService.js`, `routes/subscriptions.routes.js`, `tests/controlPlaneTenantRoutes.test.ts` |
| Alta | Un encabezado de negocio podía no coincidir con el negocio del recurso; la ausencia de selección elegía silenciosamente una membresía entre varias. | 403 para discrepancia y 409 `TENANT_REQUIRED` ante selección ambigua; validación de membresía antes de abrir la conexión. | `middlewares/tenantRole.middleware.js`, `libs/resolveTenantMembership.js` |
| Alta | El enrutamiento no exigía que el aprovisionamiento estuviera terminado; la caché dedicada podía mantener una conexión tras cambiar su destino. | Acceso operativo solo ACTIVE/ACTIVE; acceso de aprovisionamiento separado e interno; reemplazo del cliente dedicado cuando cambia su URL. | `services/database/tenantPlacementAccess.ts`, `db.js`, `tests/tenantDatabaseRouting.test.ts` |
| Alta | El facade compartido exponía métodos e internos de Prisma fuera del contrato; las claves compuestas de usuario no estaban normalizadas en todas las operaciones. | Lista permitida de modelos/operaciones, cierre de extensiones e internos, claves compuestas y contexto conservados también dentro de transacciones. | `services/database/sharedTenantClient.ts`, `tests/sharedTenantFacadeSecurity.test.ts` |
| Alta | Comprobar únicamente atributos del rol no detectaba tablas sin RLS forzado, propiedad heredada, TRUNCATE o políticas adicionales permisivas. | Verificación estructural al adquirir cliente compartido, renovada cada 60 segundos; rechazo 503 si el contrato es inseguro. | `services/database/sharedRuntimeSecurity.ts`, `tests/sharedRuntimeSecurity.test.ts` |
| Alta | El frontend conservaba tenant/estado montado y aceptaba respuestas iniciadas en una identidad anterior. La lista de clientes no recargaba por cambio de tenant. | Reinicio de contexto en login/registro/logout; descarte de respuestas obsoletas; remount de toda la interfaz del negocio por usuario, negocio y sesión; invalidación entre pestañas. | `src/context/authContext.jsx`, `src/api/axios.js`, `src/components/layout/AppLayout.jsx` del frontend |
| Media | Existía un espacio global de caché si faltaba businessId y no se fijaban cabeceras antialmacenamiento para respuestas autenticadas. | Sin tenant no se almacena ni consulta caché compartida; respuestas privadas con `Cache-Control: private, no-store` y `Vary` por autorización y tenant. | `libs/tenantCache.js`, `middlewares/auth.middleware.js`, `tests/tenantResponseCache.test.ts` |
| Alta operativa | Un fallo de migración compartida podía no detener la publicación. | Propagación del error para impedir un build exitoso con migración fallida; se mantiene separación de credenciales runtime/DDL. | `scripts/vercelBuild.mjs` |

PostgreSQL permite a superusuarios y roles BYPASSRLS eludir las políticas incluso con FORCE; las políticas permisivas se combinan con OR y TRUNCATE no está cubierto por RLS. Fuente: [documentación oficial de Row Security](https://www.postgresql.org/docs/current/ddl-rowsecurity.html).

## Plan ejecutado

1. Identificar árbol real, recuperar main actual y contrastar contratos GeneralDB/businessDB/sharedDB y los dos negocios señalados sin modificar producción.
2. Cerrar autoasignación, invitaciones, consultas por ID y asignación masiva; impedir acceso a tenants a medio provisionar.
3. Reforzar cliente compartido y verificación del rol, tablas y políticas; conservar destinos existentes de los negocios.
4. Separar estado de interfaz y respuestas por sesión/tenant; reproducir el caso de clientes anteriores en la misma página.
5. Probar HTTP, componentes, navegador y PostgreSQL con dos tenants; instalar el gate de PostgreSQL aislado en CI.
6. Entregar este informe y secuencia de publicación con criterios verificables. La publicación no se ejecutó en esta tarea.

## Validación

| Comprobación | Resultado | Límite de la evidencia |
| --- | --- | --- |
| Backend `npm run validate` | 218 pruebas aprobadas; formato, lint y tipos aprobados. | 6 pruebas dependientes de DB omitidas en la suite ordinaria; 5 de ellas ejecutadas separadamente con PostgreSQL real. La prueba legacy restante no se ejecutó. |
| Backend `npm run vercel-build` local | Bundle ESM generado correctamente. | No ejecuta migraciones productivas en ejecución local; no equivale a un despliegue Vercel. |
| Frontend `npm run validate` | 132 pruebas aprobadas; formato, tipos y build aprobados; lint sin errores. | Permanece un warning anterior de dependencias de useEffect en AppointmentGalleryCarousel y aviso anterior de tamaño del bundle. |
| Chromium `CI=true npx playwright test` | 4 pruebas aprobadas: smoke y aislamiento entre pestañas, incluyendo desaparición automática de nombres de clientes tras cambiar cuenta. | Backend simulado en estas pruebas de navegador; no es un recorrido completo navegador → API productiva → Neon. |
| PostgreSQL en rama QA clonada | 5 pruebas de aislamiento aprobadas con rol restringido. | Datos sintéticos en rama aislada; no escritura en producción. |
| PostgreSQL en DB nueva vacía | Las 8 migraciones existentes aplicaron correctamente; `check:shared-security` aprobado; 5 pruebas de aislamiento aprobadas. | Comprueba instalación limpia, no una migración de datos históricos entre ubicaciones. |
| Recorrido integrado local con Neon QA | 6 comprobaciones aprobadas: alta HTTP real de A/B con ID generado en servidor, cliente A ausente en B, rechazo de encabezado/ID ajeno y autoasignación, visualización de A y desaparición automática al cambiar a B en Chromium. Fixtures retirados. | Backend y frontend compilados reales, JWT verificado, membresías de generalDB y RLS de sharedDB reales; usuarios sintéticos preparados en QA y sesiones inyectadas para evitar correo/contraseñas. El navegador redirige el host API al servidor local; no simula datos ni autorización. No verifica el registro de cuenta por correo ni el runtime Vercel. |
| CI | Job PostgreSQL 17 aislado añadido con migraciones, DML restringido, comprobación de seguridad y suite obligatoria. | El workflow quedó preparado; no se afirma una ejecución remota de GitHub Actions. |

Las pruebas reales comprueban concurrencia A/B, listados y conteos, acceso por IDs ajenos, update/delete cruzados sin filas afectadas, inserción con businessId falsificado, cambio de businessId rechazado, FK de otro tenant rechazada, rollback, SQL crudo sujeto a RLS y ausencia de contexto sin datos visibles. Se usa el mismo ID de usuario en ambos tenants para verificar las claves compuestas.

Las regresiones de componentes montan la pantalla real de clientes, cambian usuario o negocio sin recargar y confirman que el cliente anterior desaparece. Una respuesta A deliberadamente atrasada tampoco reaparece en B.

## Entorno QA y datos conservados

Proyecto Neon: `empty-night-99718614`. Rama QA: `br-muddy-thunder-ad1m8yvu`, nombre `qa-tenant-isolation-20261013`. Se probó `sharedDB` en la copia y se creó la base vacía `qa_isolation_fresh` en esa misma rama.

Los fixtures sintéticos se retiraron por businessId en la limpieza de las pruebas. El recorrido integrado retiró también sus usuarios, membresías, negocios, catálogo sembrado, plan y suscripciones exclusivamente de QA. La rama QA y la base de pruebas se conservan; la rama contiene una copia de la rama origen y debe mantener los mismos controles de acceso. No se creó ningún cliente QA en producción. No se cambiaron contraseñas, planes ni ubicaciones productivas. Las transferencias temporales de conexión para las pruebas fueron consumidas y retiradas; el informe y el código no contienen credenciales.

El runner integrado queda como evidencia auxiliar en `C:\Users\Alfredo\Documents\ChatGPT\appsfly\tmp\tenant-audit\run-journey.cjs` y su captura final en `qa-journey-empty-business.png` de esa carpeta. Valida el host exclusivo de QA antes de conectar. Hubo intentos iniciales fallidos por el nombre físico `GeneralDB` (el correcto es `generalDB`) y por el transporte fetch del entorno; no habían creado negocios. La ejecución final usó el nombre comprobado, Supertest y Chromium, terminó con código 0 y confirmó la limpieza. Esta prueba local adicional no forma parte todavía del workflow remoto.

## Publicación y aceptación de producción

Esta corrección no agrega migraciones ni mueve tenants. Los clientes Prisma generados se actualizaron a los esquemas existentes; `npm ci` ejecuta su generación mediante postinstall. No omitir ese paso.

1. Revisar y guardar TODOS los cambios finales de ambos repositorios, incluidos los archivos nuevos. Confirmar el diff contra sus respectivos main y el commit exacto que se publicará. Verificar nuevamente repositorio, rama, proyecto y alias Vercel; las referencias históricas no sustituyen esa comprobación.
2. Ejecutar CI, incluido el nuevo job de PostgreSQL y las 4 pruebas de navegador. Para repetir la suite DB, usar exclusivamente `TEST_SHARED_DATABASE_URL` de una base aislada y `TEST_ISOLATED_DATABASE=true`. No apuntarla a producción.
3. Antes de publicar backend, comprobar con el acceso runtime real `npm run check:shared-security` y que no existan migraciones pendientes no evaluadas. La comprobación es de lectura. El build de producción aplica migraciones GeneralDB y, si se configuró conexión DDL compartida, sharedDB: revisar ese efecto y disponer de recuperación antes de iniciarlo.
4. Publicar backend y verificar su commit/alias. Una respuesta 503 por rol o esquema inseguros exige corregir la configuración; no desactivar el control para permitir el despliegue.
5. Publicar frontend y verificar el commit/bundle que carga el navegador, incluyendo PWA. Ambos servicios tienen cambios pertinentes. Forzar actualización de la aplicación en sesiones abiertas cuando corresponda.
6. Repetir en el entorno desplegado el recorrido A/B ya aprobado localmente contra Neon QA; completar también aceptación de invitación con correo QA confirmado. Tras publicación, comprobar de forma controlada que A no lista ni lee/modifica por ID clientes de B, el encabezado B con cuenta A es rechazado, y alternar cuentas no conserva clientes. La creación de datos en producción necesita autorización específica y una relación de fixtures restantes.
7. Conservar evidencia de commits, respuestas y resultados sin tokens, nombres reales de clientes ni cadenas de conexión. Observar errores `TENANT_*` y `SHARED_*` con identificadores de correlación.

Recuperación: ante errores, detener la promoción y conservar evidencia. Preferir corregir hacia adelante o volver únicamente a una versión que mantenga las barreras de autorización; un rollback anterior a estas correcciones reabre los fallos descritos. Como esta entrega no migra datos, no corresponde borrar/restaurar tablas para revertir el frontend o backend. Si aparecen migraciones adicionales pendientes al publicar, requieren su propio respaldo y recuperación.

## Límites y siguientes mejoras de arquitectura

- No se puede certificar la causa histórica ni el alcance de exposición sin solicitudes/respuestas o logs del momento. Revisar las membresías históricas y accesos es trabajo de investigación adicional, distinto de verificar el estado actual.
- El aprovisionamiento aún es una secuencia entre sistemas, sin transacción distribuida ni job durable/reintento idempotente. Ahora queda FAILED/PENDING y bloqueado si falla; conviene convertirlo en una máquina de estados recuperable. El campo businessSchemaVersion todavía usa una versión fija y debe derivarse del proceso de migración antes de usarlo como evidencia operacional.
- Las pruebas reales cubren sharedDB. El enrutamiento dedicado tiene regresión unitaria, pero no se aprovisionó un tenant DEDICATED completo ni se ejecutó su migración productiva.
- RLS protege frente a consultas sin filtro o contexto incorrecto por accidente; no es una frontera contra código servidor malicioso que posea la credencial runtime y pueda ejecutar SQL arbitrario/cambiar el contexto. Mantener revisión de SQL y autorización del servidor sigue siendo indispensable.
- Esta entrega no es un pentest integral de pagos, correo, adjuntos ni toda la plataforma. El gate de despliegue y la repetición del recorrido integrado sobre la versión publicada permanecen necesarios para afirmar que esa versión está lista para operar.
