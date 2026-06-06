import { getPrismaForBusiness } from "../db.js";
import {
    getMonthlySalesReport,
    getYearlySalesReport,
    getInventoryMovementsReport,
} from "../services/reportsService.js";

const USER_ID = process.argv[2] || "0288c541-234d-42f3-b710-c4c2f6b35b74";

async function safeJson(data) {
    try {
        JSON.stringify(data);
        return true;
    } catch (e) {
        console.error("JSON serialize error:", e.message);
        return false;
    }
}

async function main() {
    const prisma = await getPrismaForBusiness(USER_ID);
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const startDate = `${year}-${String(month).padStart(2, "0")}-01`;
    const endDate = now.toISOString().slice(0, 10);

    console.log("Testing monthly-sales...");
    const monthly = await getMonthlySalesReport(month, year, prisma);
    console.log("monthly OK:", safeJson(monthly), "rows:", monthly.rows.length);

    console.log("Testing yearly-sales...");
    const yearly = await getYearlySalesReport(year, prisma);
    console.log("yearly OK:", safeJson(yearly), "rows:", yearly.rows.length);

    console.log("Testing inventory-movements...");
    const inventory = await getInventoryMovementsReport(
        { startDate, endDate, categoryId: null },
        prisma,
    );
    console.log("inventory OK:", safeJson(inventory), "rows:", inventory.rows.length);
}

main().catch((err) => {
    console.error("FAILED:", err);
    process.exit(1);
});
