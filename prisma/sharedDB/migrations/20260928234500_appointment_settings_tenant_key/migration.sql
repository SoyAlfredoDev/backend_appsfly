-- AppointmentSettings uses the constant key "default" in every tenant.
-- Make the tenant part of the primary key so the value can safely repeat.
ALTER TABLE "AppointmentWeeklyAvailability"
DROP CONSTRAINT "AppointmentWeeklyAvailability_businessId_settingsId_fkey";

DROP INDEX "AppointmentSettings_businessId_settingsId_key";

ALTER TABLE "AppointmentSettings"
DROP CONSTRAINT "AppointmentSettings_pkey",
ADD CONSTRAINT "AppointmentSettings_pkey" PRIMARY KEY ("businessId", "settingsId");

ALTER TABLE "AppointmentWeeklyAvailability"
ADD CONSTRAINT "AppointmentWeeklyAvailability_businessId_settingsId_fkey"
FOREIGN KEY ("businessId", "settingsId")
REFERENCES "AppointmentSettings"("businessId", "settingsId")
ON DELETE CASCADE ON UPDATE CASCADE;
