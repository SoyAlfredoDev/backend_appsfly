-- Limpieza previa: eliminar duplicados manualmente si existen antes de aplicar unique.
-- Ejecutar backend/scripts/cleanupDailySalesDuplicates.js antes de esta migración.

CREATE UNIQUE INDEX IF NOT EXISTS "DailySales_dailySalesDay_key" ON "DailySales"("dailySalesDay");
