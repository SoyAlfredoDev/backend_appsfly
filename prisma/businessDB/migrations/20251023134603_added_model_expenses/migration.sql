-- CreateTable
CREATE TABLE "public"."Transactions" (
    "transactionId" TEXT NOT NULL,
    "transactionType" TEXT,
    "transactionMethod" TEXT,
    "transactionTable" TEXT,
    "transactionRecordId" TEXT,
    "transactionOldValue" JSONB,
    "transactionNewValue" JSONB,
    "transactionDescription" TEXT,
    "createdByUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transactions_pkey" PRIMARY KEY ("transactionId")
);

-- CreateTable
CREATE TABLE "public"."Expense" (
    "expenseId" TEXT NOT NULL,
    "expenseDescription" TEXT,
    "expensePaymentMethod" TEXT,
    "expenseImageUrl" TEXT,
    "expenseAmount" INTEGER,
    "createdByUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("expenseId")
);

-- AddForeignKey
ALTER TABLE "public"."Transactions" ADD CONSTRAINT "Transactions_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "public"."User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Expense" ADD CONSTRAINT "Expense_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "public"."User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
