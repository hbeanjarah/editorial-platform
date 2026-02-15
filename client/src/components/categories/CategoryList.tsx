import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import CategoryForm from "./CategoryForm";

export default function CategoryList() {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Catégories</h1>
        <Button
          onClick={() => setFormOpen(true)}
          className="bg-brand
  hover:bg-brand-hover"
        >
          <Plus size={16} className="mr-1" /> Nouvelle catégorie
        </Button>
      </div>

      <CategoryForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={() => {}}
      />
    </>
  );
}
