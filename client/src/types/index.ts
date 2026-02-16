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

export interface Network {
  id: string;
  name: string;
  description: string;
}

export interface CategoryOnArticle {
  articleId: string;
  categoryId: string;
  category: Category;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  status: "draft" | "published" | "archived";
  featured: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  networkId: string;
  network: Network;
  categories: CategoryOnArticle[];
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    totalPages: number;
    page: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}
