import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetArticles } from "@/hooks/useArticles";
import { useSendNotification } from "@/hooks/useNotifications";
import { toast } from "sonner";
import { AxiosError } from "axios";

export default function NotifyForm() {
  const { data } = useGetArticles({ status: "published", limit: "50" });
  const articles = data?.data ?? [];

  const { mutate: sendNotificationMutation, isPending: isSending } =
    useSendNotification();

  const [articleId, setArticleId] = useState("");
  const [subject, setSubject] = useState("");
  const [recipients, setRecipients] = useState("");

  //   const selectedArticle = articles.find((a) => a.id === articleId);

  const handleArticleChange = (id: string) => {
    setArticleId(id);
    const article = articles.find((a) => a.id === id);
    if (article) setSubject(`Nouvel article : ${article.title}`);
  };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!articleId || !recipients.trim()) return;

    sendNotificationMutation(
      { articleId, subject, recipients: recipients.trim() },
      {
        onSuccess: () => {
          toast.success("Notification envoyée");
          setArticleId("");
          setSubject("");
          setRecipients("");
        },
        onError: (err) => {
          const message =
            (err as AxiosError<{ error: string }>).response?.data?.error ??
            "Erreur envoi";
          toast.error(message);
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Article</Label>
        <Select value={articleId} onValueChange={handleArticleChange}>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner un article" />
          </SelectTrigger>
          <SelectContent>
            {articles.map((a) => (
              <SelectItem key={a.id} value={a.id}>
                {a.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Sujet</Label>
        <Input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Sujet de l'email"
        />
      </div>

      <div>
        <Label>Destinataires</Label>
        <Input
          value={recipients}
          onChange={(e) => setRecipients(e.target.value)}
          placeholder="email1@ex.com, email2@ex.com"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Séparez les emails par des virgules
        </p>
      </div>

      <Button
        type="submit"
        disabled={isSending || !articleId || !recipients.trim()}
        className="bg-brand hover:bg-brand-hover"
      >
        {isSending ? "Envoi..." : "Envoyer la notification"}
      </Button>
    </form>
  );
}
