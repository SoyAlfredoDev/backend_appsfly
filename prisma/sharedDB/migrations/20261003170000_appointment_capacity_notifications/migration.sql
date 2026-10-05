-- Cupos por horario y avisos por correo al cliente que agenda.
ALTER TABLE "AppointmentSettings"
ADD COLUMN "maxConcurrentPerSlot" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN "customerNotificationsEnabled" BOOLEAN NOT NULL DEFAULT false;

ALTER TABLE "Appointment"
ADD COLUMN "customerEmail" TEXT;
