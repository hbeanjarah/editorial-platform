import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBulkUpdateArticleStatus } from "@/hooks/useArticles";
import { toast } from "sonner";

interface Props {
  selectedIds: string[];
  onClear: () => void;
}

export default function BulkActions({ selectedIds, onClear }: Props) {
  const { mutate: bulkChange } = useBulkUpdateArticleStatus();

  if (selectedIds.length === 0) return null;

  const handleChange = (status: string) => {
    bulkChange(
      { ids: selectedIds, status },
      {
        onSuccess: (data: { count: number }) => {
          toast.success(`${data.count} article(s) mis à jour`);
          onClear();
        },
        onError: () => toast.error("Erreur changement de statut"),
      },
    );
  };

  return (
    <div className="flex items-center gap-3 rounded-md border bg-muted/50 p-3">
      <span className="text-sm font-medium">
        {selectedIds.length} article(s) sélectionné(s)
      </span>
      <Select onValueChange={handleChange}>
        <SelectTrigger className="w-44">
          <SelectValue placeholder="Changer le statut" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="draft">Brouillon</SelectItem>
          <SelectItem value="published">Publié</SelectItem>
          <SelectItem value="archived">Archivé</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
