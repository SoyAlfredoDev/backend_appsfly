-- Migra imágenes históricas de Customer.customerImageUrl → Prescription
-- (esas fotos eran de recetas, no de perfil). Idempotente por URL.

INSERT INTO "Prescription" (
    "prescriptionId",
    "customerId",
    "prescriptionDate",
    "prescriptionNotes",
    "prescriptionImageUrl",
    "entryMode",
    "createdByUserId",
    "createdAt",
    "updatedAt"
)
SELECT
    gen_random_uuid()::text,
    c."customerId",
    COALESCE(c."createdAt", CURRENT_TIMESTAMP),
    'Migrado automáticamente desde imagen asociada al cliente (receta histórica).',
    c."customerImageUrl",
    'PHOTO',
    c."createdByUserId",
    COALESCE(c."createdAt", CURRENT_TIMESTAMP),
    CURRENT_TIMESTAMP
FROM "Customer" c
WHERE c."customerImageUrl" IS NOT NULL
  AND BTRIM(c."customerImageUrl") <> ''
  AND NOT EXISTS (
      SELECT 1
      FROM "Prescription" p
      WHERE p."customerId" = c."customerId"
        AND p."prescriptionImageUrl" = c."customerImageUrl"
  );
