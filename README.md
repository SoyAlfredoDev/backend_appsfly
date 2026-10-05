# AppsFly backend

API de AppsFly (Express + Prisma). El entorno de producción es **Vercel**. No se despliega en otro host.

| | |
| --- | --- |
| Proyecto de Vercel | `backend-appsfly` |
| Equipo | `appsflycl-7241` |
| Repositorio | [SoyAlfredoDev/backend_appsfly](https://github.com/SoyAlfredoDev/backend_appsfly) |
| URL del proyecto | https://backend-appsfly-mocha.vercel.app |
| API pública | https://api.appsfly.cl |

Un push a `main` despliega este proyecto en Vercel. El comando de build es `npm run vercel-build`: aplica las migraciones de la base compartida y empaqueta la API. Vercel ejecuta Express como función serverless en `api/index.js`. Los cron de campañas de correo y renovaciones de Mercado Pago están en `vercel.json`; el planificador local no corre en Vercel.

## Desarrollo local

```bash
npm install
npm run dev
```

La API queda en http://127.0.0.1:3000. Copia `.env.example` a `.env` solo en esta máquina. En Vercel las mismas variables se configuran en el proyecto `backend-appsfly`. Las credenciales privadas (base de datos, Mercado Pago, Resend, `CRON_SECRET`) viven ahí y no van al frontend.

## Comprobación

```bash
npm run validate
```
