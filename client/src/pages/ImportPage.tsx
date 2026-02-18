import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useImportArticles } from "@/hooks/useImport";
import { toast } from "sonner";
import { Upload, CheckCircle, XCircle } from "lucide-react";

type ImportResult = {
  imported: number;
  errors: { index: number; message: string }[];
};

export default function ImportPage() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [result, setResult] = useState<ImportResult | null>(null);
  const { mutate: importMutation, isPending } = useImportArticles();

  const handleImport = () => {
    const file = fileRef.current?.files?.[0];
    if (!file) return;

    importMutation(file, {
      onSuccess: (data) => {
        setResult(data);
        toast.success(`${data.imported} article importé`);
        if (fileRef.current) fileRef.current.value = "";
      },
      onError: () => toast.error("Erreur import"),
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Import de données</h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Importer des articles (JSON)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <input
              ref={fileRef}
              type="file"
              accept=".json"
              className="text-sm file:mr-3 file:rounded-md file:border-0 file:bg-muted file:px-3 file:py-2 file:text-sm file:font-medium"
            />
            <Button
              onClick={handleImport}
              disabled={isPending}
              className="bg-brand hover:bg-brand-hover"
            >
              <Upload size={16} className="mr-1" />
              {isPending ? "Import..." : "Importer"}
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">
            Format: tableau JSON avec title, content, excerpt, author, category,
            network
          </p>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Résultat</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle size={16} className="text-status-published" />
              <span>{result.imported} article(s) importé(s)</span>
            </div>

            {result.errors.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-destructive">
                  {result.errors.length} erreur(s) :
                </p>
                <ul className="space-y-1">
                  {result.errors.map((err) => (
                    <li
                      key={err.index}
                      className="flex items-center gap-2 text-sm text-destructive"
                    >
                      <XCircle size={14} />
                      Ligne {err.index + 1} : {err.message}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
