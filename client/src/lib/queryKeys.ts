export const queryKeys = {
  articles: {
    all: ["articles"] as const,
    stats: () => [...queryKeys.articles.all, "stats"] as const,
  },
  categories: {
    all: ["categories"] as const,
  },
};
