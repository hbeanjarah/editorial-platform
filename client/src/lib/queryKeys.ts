export const queryKeys = {
  articles: {
    all: (filters: Record<string, string>) => ["articles", filters] as const,
    stats: () => [...queryKeys.articles.all({}), "stats"] as const,
    detail: (id: string) => [...queryKeys.articles.all({}), id] as const,
  },
  categories: {
    all: ["categories"] as const,
  },
  networks: {
    all: ["networks"] as const,
  },
  notifications: {
    all: ["notifications"] as const,
  },
};
