/**
 * Paginación compartida — mismo contrato que inventario / tax docs.
 * { page, limit } → { skip, take, page, limit }
 * Respuesta: { rows, pagination: { total, pages, currentPage, limit } }
 */

export function normalizePagination(
    { page, limit, defaultLimit = 50, maxLimit = 100 } = {},
) {
    const safePage = Math.max(1, Number(page) || 1);
    const safeLimit = Math.min(
        maxLimit,
        Math.max(1, Number(limit) || defaultLimit),
    );
    return {
        page: safePage,
        limit: safeLimit,
        skip: (safePage - 1) * safeLimit,
        take: safeLimit,
    };
}

export function buildPaginationMeta(total, page, limit) {
    const safeTotal = Number(total) || 0;
    const pages = Math.max(1, Math.ceil(safeTotal / limit) || 1);
    return {
        total: safeTotal,
        pages,
        currentPage: page,
        limit,
    };
}

export function paginatedResult(rows, total, page, limit) {
    return {
        rows,
        pagination: buildPaginationMeta(total, page, limit),
    };
}

/** Lee page/limit/q desde req.query de forma segura. */
export function parseListQuery(query = {}, defaults = {}) {
    const {
        defaultLimit = 50,
        maxLimit = 100,
    } = defaults;
    const { skip, take, page, limit } = normalizePagination({
        page: query.page,
        limit: query.limit,
        defaultLimit,
        maxLimit,
    });
    const q = typeof query.q === "string" ? query.q.trim() : "";
    return { page, limit, skip, take, q: q || undefined };
}
