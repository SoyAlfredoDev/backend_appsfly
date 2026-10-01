# Hybrid tenant database rollout

## Purpose

AppsFly uses `GeneralDB` as the control plane and routes operational data to either the shared data plane or a dedicated database. Existing businesses stay dedicated. New businesses use the plan policy and default to shared storage.

## Safety rules

- Never copy or log database URLs.
- Keep `DATABASE_SHARED_URL` on the restricted `appsfly_shared_runtime` role. It must not be superuser and must not have `BYPASSRLS`.
- Use `DATABASE_SHARED_MIGRATION_URL` only for Prisma migrations and schema checks.
- Do not change a plan from `SHARED` to `DEDICATED`, or the reverse, while it has subscribers. Migrate each business first.
- Take a Neon branch and Git bundle before every production migration.

## Pre-deployment checks

1. Run `npm run shared:schema` and review the generated tenant keys, composite relations, indexes, and RLS migration.
2. On an isolated Neon branch, run `npm run migrate:shared` with the owner URL.
3. Run `npm run check:shared-security` with the restricted runtime URL.
4. Run the real isolation suite with `RUN_SHARED_DB_INTEGRATION=true npm test -- tests/sharedTenantIsolation.integration.test.ts`.
5. Run `npm run validate` in backend and frontend, plus the frontend build and Playwright smoke suite.

## Production order

1. Create a protected Neon backup branch and record its branch ID and creation time.
2. Provision the shared production database and restricted runtime role.
3. Apply the shared schema with the migration credential.
4. Apply the GeneralDB placement migration. It marks existing businesses as `DEDICATED` and plans as `SHARED` by default.
5. Configure both shared URLs in the backend secret store.
6. Deploy the backend before enabling new registrations.
7. Create a canary business, confirm it is `ACTIVE`, and verify tenant A cannot read tenant B through the API and directly as the runtime role.
8. Enable registrations gradually and monitor provisioning failures, pool usage, query latency, and RLS errors.

## Rollback

- Disable new registrations first.
- Roll back the application release.
- Existing dedicated businesses continue using their original databases.
- Delete only failed canary records after they have been inspected and exported.
- Restore from the recorded Neon branch only when data validation proves it is required; never overwrite production as the first response.

## Later migration of an existing business

A background migration worker is required before moving existing customers. It must set the business to `MIGRATING`, block or capture writes, copy every table with `businessId`, compare counts and checksums, switch placement atomically, observe the tenant, and retain the source database through the rollback window. This release intentionally does not move existing customer data.
