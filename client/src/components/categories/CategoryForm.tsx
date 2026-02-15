import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { COLOR_PALETTE } from "@/lib/constant";
import { useEffect, useEffectEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import type { Category } from "@/types";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    description: string;
    color: string;
  }) => void;
  isLoading?: boolean;
  category?: Category | null;
};

export default function CategoryForm({
  open,
  onClose,
  onSubmit,
  isLoading,
  category,
}: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState<string>(COLOR_PALETTE[0]);

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      return;
    }

    onSubmit({ name: name.trim(), description: description.trim(), color });
  };

  const updateCategory = useEffectEvent(
    (currentCate: { name: string; description: string; color: string }) => {
      setName(currentCate.name);
      setDescription(currentCate.description);
      setColor(currentCate.color);
    },
  );

  useEffect(() => {
    if (!open) return;

    if (category) {
      updateCategory(category);
    } else {
      updateCategory({
        name: "",
        description: "",
        color: COLOR_PALETTE[0],
      });
    }
  }, [open, category]);

  return (
    <Dialog open={open} onOpenChange={(_open) => !_open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Créer une catégorie</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="text-sm font-medium">
              Nom
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              placeholder="Nom"
            />
          </div>
          <div>
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              id="description"
              placeholder="Description"
            />
          </div>
          <div>
            <label htmlFor="color" className="text-sm font-medium">
              Couleur
            </label>
            <div className="flex space-x-2">
              {COLOR_PALETTE.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={`w-6 h-6 rounded-full ${color === c ? "ring-2 ring-offset-2 ring-gray-400" : ""}`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !name.trim()}
              className="bg-brand
  hover:bg-brand-hover"
            >
              {isLoading ? "..." : category ? "Modifier" : "Créer"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
