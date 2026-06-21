-- Frecuencia diaria y audiencias de vencimiento de plan
ALTER TYPE "PlatformEmailScheduleFrequency" ADD VALUE IF NOT EXISTS 'DAILY';

ALTER TYPE "PlatformEmailAudienceType" ADD VALUE IF NOT EXISTS 'BUSINESS_ADMINS_PLAN_EXPIRING_5D';
ALTER TYPE "PlatformEmailAudienceType" ADD VALUE IF NOT EXISTS 'BUSINESS_ADMINS_PLAN_EXPIRING_TODAY';
