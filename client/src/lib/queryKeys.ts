export const queryKeys = {
  articles: {
    all: (filters: Record<string, string>) => ["articles", filters] as const,
    stats: () => [...queryKeys.articles.all({}), "stats"] as const,
  },
  categories: {
    all: ["categories"] as const,
  },
  networks: {
    all: ["networks"] as const,
  },
};
