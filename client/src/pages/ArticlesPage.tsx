import ArticleTable from "@/components/articles/ArticleTable";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { useGetArticles } from "@/hooks/useArticles";
import ArticleFilters from "@/components/articles/ArticleFilters";
import { useState } from "react";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import BulkActions from "@/components/articles/BulkActions";

export default function ArticlesPage() {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    search: "",
    status: "",
    categoryId: "",
    networkId: "",
    featured: "",
  });
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const queryParams: Record<string, string> = { page: String(page) };

  if (filters.search) queryParams.search = filters.search;

  if (filters.status && filters.status !== "all")
    queryParams.status = filters.status;

  if (filters.categoryId && filters.categoryId !== "all")
    queryParams.categoryId = filters.categoryId;

  if (filters.networkId && filters.networkId !== "all")
    queryParams.networkId = filters.networkId;

  if (filters.featured) queryParams.featured = filters.featured;

  const { data, isLoading } = useGetArticles(queryParams);
  const pagination = data?.pagination;

  const handleChangeFilter = (curentFilter: typeof filters) => {
    setFilters(curentFilter);
    setPage(1);
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
      <ArticleFilters filters={filters} onChange={handleChangeFilter} />

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
