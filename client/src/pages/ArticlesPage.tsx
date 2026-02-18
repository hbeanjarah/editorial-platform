import ArticleTable from "@/components/articles/ArticleTable";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { useGetArticles } from "@/hooks/useArticles";
import ArticleFilters from "@/components/articles/ArticleFilters";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import BulkActions from "@/components/articles/BulkActions";
import { useArticleFilters } from "@/stores/useArticleStore";
import { useState } from "react";
import type { FilterType } from "@/stores/useArticleStore";

export default function ArticlesPage() {
  const navigate = useNavigate();

  const {
    search,
    status,
    categoryId,
    networkId,
    featured,
    page,
    setFilter,
    setPage,
  } = useArticleFilters();

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const queryParams: Record<string, string> = { page: String(page) };

  if (search) queryParams.search = search;

  if (status && status !== "all") queryParams.status = status;

  if (categoryId && categoryId !== "all") queryParams.categoryId = categoryId;

  if (networkId && networkId !== "all") queryParams.networkId = networkId;

  if (featured) queryParams.featured = featured;

  const { data, isLoading } = useGetArticles(queryParams);
  const pagination = data?.pagination;

  const handleChangeFilter = (filters: FilterType) => {
    Object.entries(filters).forEach(([key, value]) => setFilter(key, value));
    setSelectedIds([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Articles</h1>
        <Button
          onClick={() => navigate("/articles/new")}
          className="bg-brand hover:bg-brand-hover cursor-pointer"
        >
          <Plus size={16} className="mr-1" /> Nouvel article
        </Button>
      </div>
      <ArticleFilters
        filters={{ search, status, categoryId, networkId, featured }}
        onChange={handleChangeFilter}
      />

      {isLoading ? (
        <p className="text-muted-foreground">Chargement...</p>
      ) : (
        <>
          <BulkActions
            selectedIds={selectedIds}
            onClear={() => setSelectedIds([])}
          />
          <ArticleTable
            articles={data?.data ?? []}
            selectedIds={selectedIds}
            onSelectionChange={setSelectedIds}
          />
          {pagination && pagination.totalPages > 1 && (
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {pagination.total} articles — page {pagination.page} /
                {pagination.totalPages}
              </p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  disabled={!pagination.hasPreviousPage}
                  onClick={() => {
                    setPage(page - 1);
                    setSelectedIds([]);
                  }}
                >
                  <ChevronLeft size={16} /> Précédent
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={!pagination.hasNextPage}
                  onClick={() => {
                    setPage(page + 1);
                    setSelectedIds([]);
                  }}
                >
                  Suivant <ChevronRight size={16} />
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
