-- Cupos por horario y avisos por correo al cliente que agenda.
ALTER TABLE "AppointmentSettings"
ADD COLUMN IF NOT EXISTS "maxConcurrentPerSlot" INTEGER NOT NULL DEFAULT 1;

ALTER TABLE "AppointmentSettings"
ADD COLUMN IF NOT EXISTS "customerNotificationsEnabled" BOOLEAN NOT NULL DEFAULT false;

ALTER TABLE "Appointment"
ADD COLUMN IF NOT EXISTS "customerEmail" TEXT;
