import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
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
}

export default function ArticlePreview({ formData }: Props) {
  const { data: categories } = useCategories();
  const { data: networks } = useNetworks();

  const selectedCategories = categories?.filter((c) =>
    formData.categoryIds.includes(c.id),
  );
  const network = networks?.find((n) => n.id === formData.networkId);

  const isEmpty = !formData.title && !formData.content && !formData.excerpt;

  if (isEmpty) {
    return (
      <Card className="border-dashed">
        <CardContent className="p-10 text-center text-muted-foreground">
          Rédiger pour voir l'aperçu
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">
            {formData.title || "Sans titre"}
          </CardTitle>
          {formData.featured && (
            <Star
              size={18}
              className="text-status-featured
  fill-status-featured"
            />
          )}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {formData.author && <span>Par {formData.author}</span>}
          {network && <span>· {network.name}</span>}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {formData.excerpt && (
          <p className="text-muted-foreground italic">{formData.excerpt}</p>
        )}
        {formData.content && (
          <p className="whitespace-pre-line leading-relaxed wrap-break-word">
            {formData.content}
          </p>
        )}
        {selectedCategories && selectedCategories.length > 0 && (
          <div className="flex gap-2 pt-2">
            {selectedCategories.map((cat) => (
              <Badge key={cat.id} style={{ backgroundColor: cat.color }}>
                {cat.name}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
