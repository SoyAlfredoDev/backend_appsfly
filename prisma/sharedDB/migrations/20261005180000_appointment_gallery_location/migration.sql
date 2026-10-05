-- Fotos del local y ubicación en la página pública de citas.
ALTER TABLE "AppointmentSettings"
ADD COLUMN IF NOT EXISTS "galleryImageUrls" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
ADD COLUMN IF NOT EXISTS "locationAddress" TEXT,
ADD COLUMN IF NOT EXISTS "locationLatitude" DOUBLE PRECISION,
ADD COLUMN IF NOT EXISTS "locationLongitude" DOUBLE PRECISION;
