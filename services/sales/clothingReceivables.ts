import { Prisma, type PrismaClient } from "../../src/generated/business/index.js";
import { paginatedResult } from "../../libs/pagination.js";

type PendingSale = {
  saleId: string;
  saleNumber: string | null;
  createdAt: string;
  saleTotal: number;
  saleTotalPayments: number;
  salePendingAmount: number;
  saleCustomerId: string;
  customerPendingAmount: number;
  customer: { customerFirstName: string; customerLastName: string };
};

// Las ventas de ropa anteriores guardaban abonos en Payment sin actualizar el saldo de Sale.
export async function listClothingReceivables(prisma: PrismaClient, page: number, query: string) {
  const limit = 30;
  const terms = query ? query.split(/\s+/) : [];
  const search = terms.map((term) => {
    const pattern = `%${term}%`;
    return Prisma.sql`(
      "saleNumber" ILIKE ${pattern}
      OR "customerFirstName" ILIKE ${pattern}
      OR "customerLastName" ILIKE ${pattern}
      OR "customerDocumentNumber" ILIKE ${pattern}
    )`;
  });
  const where = search.length ? Prisma.sql`WHERE ${Prisma.join(search, " AND ")}` : Prisma.empty;
  const [result] = await prisma.$queryRaw<
    { rows: PendingSale[]; count: bigint; totalPending: bigint }[]
  >(Prisma.sql`
    WITH details AS (
      SELECT "saleId", SUM("saleDetailTotal") AS total FROM "SaleDetail" GROUP BY "saleId"
    ), payments AS (
      SELECT "saleId", SUM("paymentAmount") AS paid FROM "Payment" GROUP BY "saleId"
    ), sales AS (
      SELECT sale."saleId", sale."saleNumber", sale."createdAt", sale."saleCustomerId",
        customer."customerFirstName", customer."customerLastName", customer."customerDocumentNumber",
        details.total AS "saleTotal", COALESCE(payments.paid, 0) AS "saleTotalPayments",
        details.total - COALESCE(payments.paid, 0) AS "salePendingAmount"
      FROM "Sale" sale
      JOIN "Customer" customer ON customer."customerId" = sale."saleCustomerId"
      JOIN details ON details."saleId" = sale."saleId"
      LEFT JOIN payments ON payments."saleId" = sale."saleId"
    ), pending AS (
      SELECT *, SUM("salePendingAmount") OVER (PARTITION BY "saleCustomerId") AS "customerPendingAmount"
      FROM sales WHERE "salePendingAmount" > 0
    ), filtered AS (
      SELECT * FROM pending ${where}
    ), result_page AS (
      SELECT "saleId", "saleNumber", "createdAt" AT TIME ZONE 'UTC' AS "createdAt",
        "saleCustomerId", "saleTotal", "saleTotalPayments",
        "salePendingAmount", "customerPendingAmount",
        jsonb_build_object('customerFirstName', "customerFirstName", 'customerLastName', "customerLastName") AS customer
      FROM filtered ORDER BY "createdAt", "saleId" LIMIT ${limit} OFFSET ${(page - 1) * limit}
    )
    SELECT
      (SELECT COUNT(*) FROM filtered) AS count,
      (SELECT COALESCE(SUM("salePendingAmount"), 0)::bigint FROM filtered) AS "totalPending",
      (SELECT COALESCE(jsonb_agg(result_page ORDER BY "createdAt", "saleId"), '[]'::jsonb) FROM result_page) AS rows
  `);
  return {
    ...paginatedResult(result.rows, Number(result.count), page, limit),
    totalPending: Number(result.totalPending),
  };
}
