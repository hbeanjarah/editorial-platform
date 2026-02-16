export const statusLabel: Record<string, { text: string; class: string }> = {
  published: {
    text: "Publié",
    class: "bg-status-published/10 text-status-published",
  },
  draft: {
    text: "Brouillon",
    class: "bg-status-draft/10 text-status-draft",
  },
  archived: {
    text: "Archivé",
    class: "bg-status-archived/10 text-status-archived",
  },
};
