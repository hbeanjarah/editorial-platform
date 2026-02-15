export interface ArticleStats {
  total: number;
  byStatus: { draft: number; published: number; archived: number };
  featured: number;
}
