-- Fotos del local y ubicación en la página pública de citas.
ALTER TABLE "AppointmentSettings"
ADD COLUMN "galleryImageUrls" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
ADD COLUMN "locationAddress" TEXT,
ADD COLUMN "locationLatitude" DOUBLE PRECISION,
ADD COLUMN "locationLongitude" DOUBLE PRECISION;
