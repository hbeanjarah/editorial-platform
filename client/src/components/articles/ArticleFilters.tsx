import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategories } from "@/hooks/useCategories";
import { useNetworks } from "@/hooks/useNetworks";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type Filters = {
  search: string;
  status: string;
  categoryId: string;
  networkId: string;
  featured: string;
};

type Props = {
  filters: Filters;
  onChange: (filters: Filters) => void;
};

export default function ArticleFilters({ filters, onChange }: Props) {
  const { data: categories } = useCategories();
  const { data: networks } = useNetworks();

  function handleChange(field: keyof Filters, value: string) {
    onChange({ ...filters, [field]: value });
  }

  return (
    <div className="flex flex-wrap gap-3">
      <Input
        placeholder="Rechercher un article..."
        value={filters.search}
        onChange={(e) => handleChange("search", e.target.value)}
        className="w-64"
      />

      <Select
        value={filters.status}
        onValueChange={(v) => handleChange("status", v)}
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Statut" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous</SelectItem>
          <SelectItem value="draft">Brouillon</SelectItem>
          <SelectItem value="published">Publié</SelectItem>
          <SelectItem value="archived">Archivé</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.categoryId}
        onValueChange={(v) => handleChange("categoryId", v)}
      >
        <SelectTrigger className="w-44">
          <SelectValue placeholder="Catégorie" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Toutes</SelectItem>
          {categories?.map((cat) => (
            <SelectItem key={cat.id} value={cat.id}>
              {cat.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.networkId}
        onValueChange={(v) => handleChange("networkId", v)}
      >
        <SelectTrigger className="w-44">
          <SelectValue placeholder="Réseau" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous</SelectItem>
          {networks?.map((n) => (
            <SelectItem key={n.id} value={n.id}>
              {n.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex items-center gap-2">
        <Switch
          id="featured"
          checked={filters.featured === "true"}
          onCheckedChange={(checked) =>
            handleChange("featured", checked ? "true" : "")
          }
        />
        <Label htmlFor="featured" className="text-sm cursor-pointer">
          Mis en avant
        </Label>
      </div>
    </div>
  );
}
