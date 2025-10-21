-- AddForeignKey
ALTER TABLE "public"."DailySales" ADD CONSTRAINT "DailySales_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "public"."User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
