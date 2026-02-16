import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

import { useCategories } from "@/hooks/useCategories";
import { useNetworks } from "@/hooks/useNetworks";

interface FormData {
  title: string;
  content: string;
  excerpt: string;
  author: string;
  categoryIds: string[];
  networkId: string;
  featured: boolean;
}

interface Props {
  formData: FormData;
  onChange: (data: FormData) => void;
}

export default function ArticleForm({ formData, onChange }: Props) {
  const { data: categories } = useCategories();
  const { data: networks } = useNetworks();

  const handleChange = (
    field: keyof FormData,
    value: string | boolean | string[],
  ) => {
    onChange({ ...formData, [field]: value });
  };

  const handleSwitchCategory = (id: string) => {
    const ids = formData.categoryIds.includes(id)
      ? formData.categoryIds.filter((c) => c !== id)
      : [...formData.categoryIds, id];
    handleChange("categoryIds", ids);
  };

  return (
    <div className="space-y-5">
      <div>
        <Label>Titre</Label>
        <Input
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="Titre de l'article"
        />
      </div>

      <div>
        <Label>Contenu</Label>
        <Textarea
          value={formData.content}
          onChange={(e) => handleChange("content", e.target.value)}
          placeholder="Contenu de l'article..."
          rows={10}
        />
      </div>

      <div>
        <Label>Extrait</Label>
        <Textarea
          value={formData.excerpt}
          onChange={(e) => handleChange("excerpt", e.target.value)}
          placeholder="Résumé de l'article"
          rows={3}
        />
      </div>

      <div>
        <Label>Auteur</Label>
        <Input
          value={formData.author}
          onChange={(e) => handleChange("author", e.target.value)}
          placeholder="Nom de l'auteur"
        />
      </div>

      <div>
        <Label>Réseau</Label>
        <Select
          value={formData.networkId}
          onValueChange={(v) => handleChange("networkId", v)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Réseau" />
          </SelectTrigger>
          <SelectContent>
            {networks?.map((n) => (
              <SelectItem key={n.id} value={n.id}>
                {n.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Catégories</Label>
        <div className="flex flex-wrap gap-2 mt-2">
          {categories?.map((cat) => {
            const selected = formData.categoryIds.includes(cat.id);
            return (
              <Badge
                key={cat.id}
                variant={selected ? "default" : "outline"}
                className="cursor-pointer"
                style={selected ? { backgroundColor: cat.color } : {}}
                onClick={() => handleSwitchCategory(cat.id)}
              >
                {cat.name}
                {selected && <X size={12} className="ml-1" />}
              </Badge>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Switch
          checked={formData.featured}
          onCheckedChange={(v) => handleChange("featured", v)}
        />
        <Label>Article mis en avant</Label>
      </div>
    </div>
  );
}
