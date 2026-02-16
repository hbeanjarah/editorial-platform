export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};
