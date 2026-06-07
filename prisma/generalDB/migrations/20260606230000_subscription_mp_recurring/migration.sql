-- Suscripción recurrente Mercado Pago (preapproval mensual)
ALTER TABLE "Subscription"
ADD COLUMN "mpPreapprovalId" TEXT,
ADD COLUMN "mpPreapprovalStatus" TEXT,
ADD COLUMN "autoRenewEnabled" BOOLEAN NOT NULL DEFAULT true;

CREATE UNIQUE INDEX "Subscription_mpPreapprovalId_key" ON "Subscription"("mpPreapprovalId");
