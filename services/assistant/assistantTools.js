import {
    getMonthlySalesReport,
    getYearlySalesReport,
    getInventoryMovementsReport,
} from "../reportsService.js";

const MAX_RESULTS = 15;

export const ASSISTANT_TOOL_DECLARATIONS = [
    {
        name: "search_customers",
        description:
            "Busca clientes del negocio por nombre, apellido, RUT/documento o teléfono. Devuelve hasta 15 coincidencias.",
        parameters: {
            type: "object",
            properties: {
                query: {
                    type: "string",
                    description: "Texto a buscar (nombre, RUT, teléfono, etc.)",
                },
            },
            required: ["query"],
        },
    },
    {
        name: "get_customer_detail",
        description: "Obtiene la ficha completa de un cliente por su ID.",
        parameters: {
            type: "object",
            properties: {
                customerId: { type: "string", description: "UUID del cliente" },
            },
            required: ["customerId"],
        },
    },
    {
        name: "get_monthly_sales_report",
        description: "Reporte de ventas de un mes y año específicos.",
        parameters: {
            type: "object",
            properties: {
                month: { type: "integer", description: "Mes 1-12" },
                year: { type: "integer", description: "Año, ej. 2026" },
            },
            required: ["month", "year"],
        },
    },
    {
        name: "get_yearly_sales_report",
        description: "Resumen de ventas acumuladas por mes de un año.",
        parameters: {
            type: "object",
            properties: {
                year: { type: "integer", description: "Año, ej. 2026" },
            },
            required: ["year"],
        },
    },
    {
        name: "get_low_stock_products",
        description:
            "Lista productos con stock bajo (quantityOnHand <= reorderPoint).",
        parameters: {
            type: "object",
            properties: {
                limit: {
                    type: "integer",
                    description: "Máximo de productos a devolver (default 15)",
                },
            },
        },
    },
    {
        name: "search_products",
        description: "Busca productos por nombre o SKU.",
        parameters: {
            type: "object",
            properties: {
                query: { type: "string", description: "Nombre o SKU del producto" },
            },
            required: ["query"],
        },
    },
    {
        name: "get_recent_sales",
        description: "Últimas ventas registradas en el negocio.",
        parameters: {
            type: "object",
            properties: {
                limit: {
                    type: "integer",
                    description: "Cantidad de ventas (default 10, máx 20)",
                },
            },
        },
    },
    {
        name: "get_inventory_movements",
        description:
            "Movimientos de inventario (entradas y salidas) en un rango de fechas (máx 366 días).",
        parameters: {
            type: "object",
            properties: {
                startDate: { type: "string", description: "Fecha inicio YYYY-MM-DD" },
                endDate: { type: "string", description: "Fecha fin YYYY-MM-DD" },
            },
            required: ["startDate", "endDate"],
        },
    },
];

const ALLOWED_TOOLS = new Set(
    ASSISTANT_TOOL_DECLARATIONS.map((tool) => tool.name),
);

function trimReportForLlm(report) {
    const rows = Array.isArray(report.rows) ? report.rows.slice(0, 8) : [];
    return {
        reportType: report.reportType,
        period: report.period,
        summary: report.summary,
        rowsPreview: rows,
        totalRows: report.rows?.length ?? 0,
        note:
            report.rows?.length > 8
                ? "Mostrando primeras 8 filas. El usuario puede ver el reporte completo en Reportes."
                : undefined,
    };
}

async function searchCustomers({ query }, prisma) {
    const q = String(query ?? "").trim();
    if (!q) return { customers: [], message: "Indica un término de búsqueda." };

    const customers = await prisma.customer.findMany({
        where: {
            OR: [
                { customerFirstName: { contains: q, mode: "insensitive" } },
                { customerLastName: { contains: q, mode: "insensitive" } },
                { customerDocumentNumber: { contains: q, mode: "insensitive" } },
                { customerPhoneNumber: { contains: q, mode: "insensitive" } },
                { customerEmail: { contains: q, mode: "insensitive" } },
            ],
        },
        select: {
            customerId: true,
            customerFirstName: true,
            customerLastName: true,
            customerDocumentNumber: true,
            customerPhoneNumber: true,
            customerEmail: true,
        },
        take: MAX_RESULTS,
        orderBy: [{ customerFirstName: "asc" }, { customerLastName: "asc" }],
    });

    return {
        count: customers.length,
        customers: customers.map((c) => ({
            id: c.customerId,
            name: `${c.customerFirstName} ${c.customerLastName}`.trim(),
            document: c.customerDocumentNumber,
            phone: c.customerPhoneNumber,
            email: c.customerEmail,
        })),
    };
}

async function getCustomerDetail({ customerId }, prisma) {
    const customer = await prisma.customer.findUnique({
        where: { customerId },
        select: {
            customerId: true,
            customerFirstName: true,
            customerLastName: true,
            customerEmail: true,
            customerCodePhoneNumber: true,
            customerPhoneNumber: true,
            customerDocumentType: true,
            customerDocumentNumber: true,
            customerComment: true,
            createdAt: true,
        },
    });
    if (!customer) return { found: false, message: "Cliente no encontrado." };
    return { found: true, customer };
}

async function getLowStockProducts({ limit }, prisma) {
    const take = Math.min(Math.max(Number(limit) || MAX_RESULTS, 1), MAX_RESULTS);
    const stocks = await prisma.productStock.findMany({
        include: {
            product: {
                select: {
                    productName: true,
                    productSKU: true,
                    productStatus: true,
                    category: { select: { categoryName: true } },
                },
            },
        },
        orderBy: { quantityOnHand: "asc" },
        take: 80,
    });

    const lowStock = stocks
        .filter((s) => s.quantityOnHand <= s.reorderPoint)
        .slice(0, take)
        .map((s) => ({
            sku: s.product.productSKU,
            name: s.product.productName,
            category: s.product.category?.categoryName,
            quantityOnHand: s.quantityOnHand,
            reorderPoint: s.reorderPoint,
            status: s.product.productStatus,
        }));

    return { count: lowStock.length, products: lowStock };
}

async function searchProducts({ query }, prisma) {
    const q = String(query ?? "").trim();
    if (!q) return { products: [], message: "Indica un término de búsqueda." };

    const products = await prisma.product.findMany({
        where: {
            OR: [
                { productName: { contains: q, mode: "insensitive" } },
                { productSKU: { contains: q, mode: "insensitive" } },
            ],
        },
        select: {
            productId: true,
            productName: true,
            productSKU: true,
            productPrice: true,
            productStatus: true,
            productStock: {
                select: { quantityOnHand: true, reorderPoint: true },
            },
            category: { select: { categoryName: true } },
        },
        take: MAX_RESULTS,
        orderBy: { productName: "asc" },
    });

    return {
        count: products.length,
        products: products.map((p) => ({
            id: p.productId,
            name: p.productName,
            sku: p.productSKU,
            price: p.productPrice,
            status: p.productStatus,
            category: p.category?.categoryName,
            stock: p.productStock?.quantityOnHand ?? 0,
            reorderPoint: p.productStock?.reorderPoint ?? 0,
        })),
    };
}

async function getRecentSales({ limit }, prisma) {
    const take = Math.min(Math.max(Number(limit) || 10, 1), 20);
    const sales = await prisma.sale.findMany({
        select: {
            saleId: true,
            saleNumber: true,
            saleTotal: true,
            saleTotalPayments: true,
            salePendingAmount: true,
            createdAt: true,
            customer: {
                select: {
                    customerFirstName: true,
                    customerLastName: true,
                },
            },
        },
        orderBy: { createdAt: "desc" },
        take,
    });

    return {
        count: sales.length,
        sales: sales.map((s) => ({
            id: s.saleId,
            number: s.saleNumber,
            date: s.createdAt,
            customer: `${s.customer?.customerFirstName ?? ""} ${s.customer?.customerLastName ?? ""}`.trim(),
            total: s.saleTotal,
            paid: s.saleTotalPayments,
            pending: s.salePendingAmount,
        })),
    };
}

async function getInventoryMovements({ startDate, endDate }, prisma) {
    try {
        const report = await getInventoryMovementsReport(
            { startDate, endDate, categoryId: null },
            prisma,
        );
        return trimReportForLlm(report);
    } catch (error) {
        const messages = {
            INVALID_DATE_RANGE: "Rango de fechas inválido.",
            INVALID_DATE_ORDER: "La fecha de inicio debe ser anterior a la de fin.",
            DATE_RANGE_TOO_LARGE: "El rango máximo es 366 días.",
        };
        return { error: messages[error.message] ?? "No se pudo obtener el reporte." };
    }
}

/**
 * Ejecuta una tool permitida usando únicamente el Prisma del tenant actual.
 * Nunca acepta businessId ni accede a la DB general.
 */
export async function executeAssistantTool(toolName, args, prisma) {
    if (!ALLOWED_TOOLS.has(toolName)) {
        return { error: `Herramienta no permitida: ${toolName}` };
    }

    switch (toolName) {
        case "search_customers":
            return searchCustomers(args, prisma);
        case "get_customer_detail":
            return getCustomerDetail(args, prisma);
        case "get_monthly_sales_report": {
            const month = Number(args.month);
            const year = Number(args.year);
            if (!month || month < 1 || month > 12 || !year || year < 2000) {
                return { error: "Mes (1-12) y año válidos son requeridos." };
            }
            const report = await getMonthlySalesReport(month, year, prisma);
            return trimReportForLlm(report);
        }
        case "get_yearly_sales_report": {
            const year = Number(args.year);
            if (!year || year < 2000) {
                return { error: "Año válido requerido." };
            }
            const report = await getYearlySalesReport(year, prisma);
            return trimReportForLlm(report);
        }
        case "get_low_stock_products":
            return getLowStockProducts(args, prisma);
        case "search_products":
            return searchProducts(args, prisma);
        case "get_recent_sales":
            return getRecentSales(args, prisma);
        case "get_inventory_movements":
            return getInventoryMovements(args, prisma);
        default:
            return { error: "Herramienta no implementada." };
    }
}
