export interface ArticleStats {
  total: number;
  byStatus: { draft: number; published: number; archived: number };
  featured: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  _count?: { articles: number };
}
