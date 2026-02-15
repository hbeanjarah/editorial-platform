const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 20;

export function paginate(
  page: number = DEFAULT_PAGE,
  limit: number = DEFAULT_LIMIT,
) {
  const safePage = Math.max(page, 1);
  const safeLimit = Math.max(limit, 1);
  const skip = (safePage - 1) * safeLimit;

  return { skip, limit: safeLimit, page: safePage };
}

export function paginationMeta(total: number, page: number, limit: number) {
  const totalPages = Math.ceil(total / limit);

  return {
    total,
    totalPages,
    page,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
}
