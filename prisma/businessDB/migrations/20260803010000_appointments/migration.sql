-- CreateEnum
CREATE TYPE "AppointmentStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED', 'RESCHEDULED');

-- CreateTable
CREATE TABLE "AppointmentSettings" (
    "settingsId" TEXT NOT NULL DEFAULT 'default',
    "appointmentsEnabled" BOOLEAN NOT NULL DEFAULT false,
    "slotDurationMinutes" INTEGER NOT NULL DEFAULT 30,
    "maxDaysAhead" INTEGER NOT NULL DEFAULT 30,
    "visitorMessage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AppointmentSettings_pkey" PRIMARY KEY ("settingsId")
);

-- CreateTable
CREATE TABLE "AppointmentWeeklyAvailability" (
    "availabilityId" TEXT NOT NULL,
    "settingsId" TEXT NOT NULL DEFAULT 'default',
    "dayOfWeek" INTEGER NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AppointmentWeeklyAvailability_pkey" PRIMARY KEY ("availabilityId")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "appointmentId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneCode" TEXT NOT NULL DEFAULT '+56',
    "phoneNumber" TEXT NOT NULL,
    "contactConsent" BOOLEAN NOT NULL,
    "startsAt" TIMESTAMP(3) NOT NULL,
    "endsAt" TIMESTAMP(3) NOT NULL,
    "status" "AppointmentStatus" NOT NULL DEFAULT 'PENDING',
    "notes" TEXT,
    "staffNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("appointmentId")
);

-- CreateIndex
CREATE INDEX "AppointmentWeeklyAvailability_settingsId_dayOfWeek_idx" ON "AppointmentWeeklyAvailability"("settingsId", "dayOfWeek");

-- CreateIndex
CREATE INDEX "Appointment_startsAt_endsAt_idx" ON "Appointment"("startsAt", "endsAt");

-- CreateIndex
CREATE INDEX "Appointment_status_startsAt_idx" ON "Appointment"("status", "startsAt");

-- AddForeignKey
ALTER TABLE "AppointmentWeeklyAvailability" ADD CONSTRAINT "AppointmentWeeklyAvailability_settingsId_fkey" FOREIGN KEY ("settingsId") REFERENCES "AppointmentSettings"("settingsId") ON DELETE CASCADE ON UPDATE CASCADE;
