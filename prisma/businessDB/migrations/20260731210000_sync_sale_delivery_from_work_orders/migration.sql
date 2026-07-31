-- Alinea saleDeliveryStatus con OTs (óptica):
-- - Sin OT → sin estado de entrega
-- - Alguna OT no entregada → PENDING
-- - Todas las OT entregadas → DELIVERED

UPDATE "Sale" s
SET
    "saleDeliveryStatus" = NULL,
    "saleDeliveredAt" = NULL,
    "saleDeliveredByUserId" = NULL
WHERE NOT EXISTS (
    SELECT 1 FROM "WorkOrder" w WHERE w."saleId" = s."saleId"
)
AND s."saleDeliveryStatus" IS NOT NULL;

UPDATE "Sale" s
SET
    "saleDeliveryStatus" = 'PENDING',
    "saleDeliveredAt" = NULL,
    "saleDeliveredByUserId" = NULL
WHERE EXISTS (
    SELECT 1
    FROM "WorkOrder" w
    WHERE w."saleId" = s."saleId"
      AND w."workOrderStatus" <> 'DELIVERED'
);

UPDATE "Sale" s
SET
    "saleDeliveryStatus" = 'DELIVERED',
    "saleDeliveredAt" = COALESCE(s."saleDeliveredAt", CURRENT_TIMESTAMP)
WHERE EXISTS (
    SELECT 1 FROM "WorkOrder" w WHERE w."saleId" = s."saleId"
)
AND NOT EXISTS (
    SELECT 1
    FROM "WorkOrder" w
    WHERE w."saleId" = s."saleId"
      AND w."workOrderStatus" <> 'DELIVERED'
)
AND (s."saleDeliveryStatus" IS DISTINCT FROM 'DELIVERED');
