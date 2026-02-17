import { Button } from "@/components/ui/button";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import CategoryForm from "./CategoryForm";
import {
  useCategories,
  useCreateCategory,
  useDeleteCategory,
  useUpdateCategory,
} from "@/hooks/useCategories";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import type { Category } from "@/types";
import { Badge } from "@/components/ui/badge";
import ConfirmDialog from "../common/ConfirmModal";

type TCategory = {
  name: string;
  description: string;
  color: string;
};

export default function CategoryList() {
  const [toDeleteCategory, setToDeleteCategory] = useState<Category | null>(
    null,
  );

  const { data: categories, isLoading: isCategoriesLoading } = useCategories();

  const { mutate: createCategoryMutation, isPending: isCreating } =
    useCreateCategory();

  const { mutate: updateCategoryMutation, isPending: isUpdating } =
    useUpdateCategory();

  const { mutate: deleteCategoryMutation } = useDeleteCategory();

  const [formOpen, setFormOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  const handleCreateCategory = (data: TCategory) => {
    createCategoryMutation(data, {
      onSuccess: () => {
        toast.success("Catégorie créée");
        setFormOpen(false);
      },
      onError: () => toast.error("Erreur lors de la création"),
    });
  };

  const handleUpdateCategory = (data: TCategory) => {
    if (!selectedCategory) return;
    updateCategoryMutation(
      { id: selectedCategory.id, ...data },
      {
        onSuccess: () => {
          toast.success("Catégorie modifiée");
          setSelectedCategory(null);
        },
        onError: () => toast.error("Erreur lors de la modification"),
      },
    );
  };

  const handleDeleteCategory = (category: Category) => {
    deleteCategoryMutation(category.id, {
      onSuccess: () => toast.success("Catégorie supprimée"),
      onError: () =>
        toast.error(
          "Impossible de supprimer : catégorie utilisée par des  articles",
        ),
    });
  };

  if (isCategoriesLoading)
    return <p className="text-muted-foreground">Chargement...</p>;

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Catégories</h1>
        <Button
          onClick={() => setFormOpen(true)}
          className="bg-brand hover:bg-brand-hover"
        >
          <Plus size={16} className="mr-1" /> Nouvelle catégorie
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories?.map((cat) => (
          <Card key={cat.id}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className="h-4 w-4 rounded-full shrink-0"
                    style={{ backgroundColor: cat.color }}
                  />
                  <div>
                    <p className="font-medium">{cat.name}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {cat.description}
                    </p>
                  </div>
                </div>
                <Badge variant="secondary">
                  {cat._count?.articles ?? 0} articles
                </Badge>
              </div>
              <div className="flex gap-2 mt-4 justify-end">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSelectedCategory(cat)}
                >
                  <Pencil size={14} />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setToDeleteCategory(cat)}
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <CategoryForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleCreateCategory}
        isLoading={isCreating}
      />

      <CategoryForm
        open={!!selectedCategory}
        onClose={() => setSelectedCategory(null)}
        onSubmit={handleUpdateCategory}
        category={selectedCategory}
        isLoading={isUpdating}
      />

      <ConfirmDialog
        open={!!toDeleteCategory}
        onClose={() => setToDeleteCategory(null)}
        onConfirm={() => {
          if (toDeleteCategory) handleDeleteCategory(toDeleteCategory);
          setToDeleteCategory(null);
        }}
        description={`Supprimer la catégorie "${toDeleteCategory?.name}" ? Cette action est
  irréversible.`}
      />
    </>
  );
}
