-- Categorías operativas del gasto. No reutiliza Category, que pertenece al catálogo.
CREATE TABLE "public"."ExpenseCategory" (
    "expenseCategoryId" TEXT NOT NULL,
    "expenseCategoryName" TEXT NOT NULL,
    "expenseCategoryCode" TEXT,
    "isSystem" BOOLEAN NOT NULL DEFAULT false,
    "createdByUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExpenseCategory_pkey" PRIMARY KEY ("expenseCategoryId")
);

CREATE UNIQUE INDEX "ExpenseCategory_expenseCategoryCode_key" ON "public"."ExpenseCategory"("expenseCategoryCode");

ALTER TABLE "public"."ExpenseCategory" ADD CONSTRAINT "ExpenseCategory_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "public"."User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "public"."Expense" ADD COLUMN "expenseCategoryId" TEXT;

DO $$
DECLARE
  owner_id TEXT;
  category_id TEXT;
BEGIN
  IF EXISTS (SELECT 1 FROM "public"."Expense" WHERE "expenseCategoryId" IS NULL) THEN
    SELECT "userId" INTO owner_id
    FROM "public"."User"
    WHERE "userRole" = 'ADMIN'
    ORDER BY "createdAt" ASC
    LIMIT 1;

    IF owner_id IS NULL THEN
      SELECT "createdByUserId" INTO owner_id
      FROM "public"."Expense"
      WHERE "expenseCategoryId" IS NULL
      LIMIT 1;
    END IF;

    IF owner_id IS NULL THEN
      RAISE EXCEPTION 'Cannot assign an expense category without a user';
    END IF;

    SELECT "expenseCategoryId" INTO category_id
    FROM "public"."ExpenseCategory"
    WHERE "expenseCategoryCode" = 'OTHER'
    LIMIT 1;

    IF category_id IS NULL THEN
      category_id := gen_random_uuid()::text;
      INSERT INTO "public"."ExpenseCategory" (
        "expenseCategoryId",
        "expenseCategoryName",
        "expenseCategoryCode",
        "isSystem",
        "createdByUserId",
        "updatedAt"
      ) VALUES (
        category_id,
        'Otros',
        'OTHER',
        true,
        owner_id,
        CURRENT_TIMESTAMP
      );
    END IF;

    UPDATE "public"."Expense"
    SET "expenseCategoryId" = category_id
    WHERE "expenseCategoryId" IS NULL;
  END IF;
END $$;

ALTER TABLE "public"."Expense" ALTER COLUMN "expenseCategoryId" SET NOT NULL;

ALTER TABLE "public"."Expense" ADD CONSTRAINT "Expense_expenseCategoryId_fkey" FOREIGN KEY ("expenseCategoryId") REFERENCES "public"."ExpenseCategory"("expenseCategoryId") ON DELETE RESTRICT ON UPDATE CASCADE;

CREATE INDEX "Expense_expenseCategoryId_idx" ON "public"."Expense"("expenseCategoryId");
