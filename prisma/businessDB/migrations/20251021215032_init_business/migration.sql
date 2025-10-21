-- CreateTable
CREATE TABLE "public"."CashExpense" (
    "cashExpenseId" TEXT NOT NULL,
    "cashExpenseAmount" INTEGER NOT NULL,
    "cashExpenseDescription" TEXT,
    "cashExpenseLinkImage" TEXT,
    "createdByUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CashExpense_pkey" PRIMARY KEY ("cashExpenseId")
);

-- CreateTable
CREATE TABLE "public"."DailySales" (
    "dailySalesId" TEXT NOT NULL,
    "dailySalesDay" TIMESTAMP(3) NOT NULL,
    "dailySalesTotalSales" INTEGER,
    "dailySalesTotalIncome" INTEGER,
    "dailySalesDetailIncome" JSONB,
    "createdByUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DailySales_pkey" PRIMARY KEY ("dailySalesId")
);

-- AddForeignKey
ALTER TABLE "public"."CashExpense" ADD CONSTRAINT "CashExpense_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "public"."User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
