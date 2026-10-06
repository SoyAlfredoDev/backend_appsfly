-- Persist post-login announcement dismissals per user account.
ALTER TABLE "User"
ADD COLUMN "userDismissedAnnouncementIds" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];
