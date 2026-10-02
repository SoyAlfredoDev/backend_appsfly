-- Categorías operativas del gasto, aisladas por tenant.
CREATE TABLE "ExpenseCategory" (
    "businessId" TEXT NOT NULL DEFAULT current_setting('app.current_business_id', true),
    "expenseCategoryId" TEXT NOT NULL,
    "expenseCategoryName" TEXT NOT NULL,
    "expenseCategoryCode" TEXT,
    "isSystem" BOOLEAN NOT NULL DEFAULT false,
    "createdByUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExpenseCategory_pkey" PRIMARY KEY ("expenseCategoryId")
);

CREATE UNIQUE INDEX "ExpenseCategory_businessId_expenseCategoryId_key" ON "ExpenseCategory"("businessId", "expenseCategoryId");
CREATE UNIQUE INDEX "ExpenseCategory_businessId_expenseCategoryCode_key" ON "ExpenseCategory"("businessId", "expenseCategoryCode");
CREATE INDEX "ExpenseCategory_businessId_idx" ON "ExpenseCategory"("businessId");

ALTER TABLE "ExpenseCategory" ADD CONSTRAINT "ExpenseCategory_businessId_createdByUserId_fkey" FOREIGN KEY ("businessId", "createdByUserId") REFERENCES "User"("businessId", "userId") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Expense" ADD COLUMN "expenseCategoryId" TEXT;

DO $$
DECLARE
  rec RECORD;
  owner_id TEXT;
  category_id TEXT;
BEGIN
  FOR rec IN
    SELECT DISTINCT "businessId"
    FROM "Expense"
    WHERE "expenseCategoryId" IS NULL
  LOOP
    SELECT "userId" INTO owner_id
    FROM "User"
    WHERE "businessId" = rec."businessId" AND "userRole" = 'ADMIN'
    ORDER BY "createdAt" ASC
    LIMIT 1;

    IF owner_id IS NULL THEN
      SELECT "createdByUserId" INTO owner_id
      FROM "Expense"
      WHERE "businessId" = rec."businessId" AND "expenseCategoryId" IS NULL
      LIMIT 1;
    END IF;

    IF owner_id IS NULL THEN
      RAISE EXCEPTION 'Cannot assign an expense category for business %', rec."businessId";
    END IF;

    SELECT "expenseCategoryId" INTO category_id
    FROM "ExpenseCategory"
    WHERE "businessId" = rec."businessId" AND "expenseCategoryCode" = 'OTHER'
    LIMIT 1;

    IF category_id IS NULL THEN
      category_id := gen_random_uuid()::text;
      INSERT INTO "ExpenseCategory" (
        "businessId",
        "expenseCategoryId",
        "expenseCategoryName",
        "expenseCategoryCode",
        "isSystem",
        "createdByUserId",
        "updatedAt"
      ) VALUES (
        rec."businessId",
        category_id,
        'Otros',
        'OTHER',
        true,
        owner_id,
        CURRENT_TIMESTAMP
      );
    END IF;

    UPDATE "Expense"
    SET "expenseCategoryId" = category_id
    WHERE "businessId" = rec."businessId" AND "expenseCategoryId" IS NULL;
  END LOOP;
END $$;

ALTER TABLE "Expense" ALTER COLUMN "expenseCategoryId" SET NOT NULL;

ALTER TABLE "Expense" ADD CONSTRAINT "Expense_businessId_expenseCategoryId_fkey" FOREIGN KEY ("businessId", "expenseCategoryId") REFERENCES "ExpenseCategory"("businessId", "expenseCategoryId") ON DELETE RESTRICT ON UPDATE CASCADE;

CREATE INDEX "Expense_businessId_expenseCategoryId_idx" ON "Expense"("businessId", "expenseCategoryId");

ALTER TABLE "ExpenseCategory" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ExpenseCategory" FORCE ROW LEVEL SECURITY;

CREATE POLICY "tenant_isolation_ExpenseCategory"
ON "ExpenseCategory"
FOR ALL
USING ("businessId" = current_setting('app.current_business_id', true))
WITH CHECK ("businessId" = current_setting('app.current_business_id', true));
