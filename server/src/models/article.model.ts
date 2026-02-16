import { z } from "zod/v4";

export const CreateArticleSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  content: z.string().min(50, "Content must be at least 50 characters"),
  excerpt: z.string().min(1, "Excerpt is required"),
  author: z.string().min(1, "Author is required"),
  networkId: z.uuid("Invalid network ID"),
  categoryIds: z.array(z.uuid()).min(1, "At least one category is required"),
  featured: z.boolean().optional(),
});

export const StatusChangeSchema = z.object({
  status: z.enum(["draft", "published", "archived"]),
});

export const BulkStatusChangeSchema = z.object({
  ids: z.array(z.uuid()).min(1, "At least one article is required"),
  status: z.enum(["draft", "published", "archived"]),
});

export const UpdateArticleSchema = CreateArticleSchema.partial();

export type CreateArticleInput = z.infer<typeof CreateArticleSchema>;
export type UpdateArticleInput = z.infer<typeof UpdateArticleSchema>;
export type StatusChangeInput = z.infer<typeof StatusChangeSchema>;
export type BulkStatusChangeInput = z.infer<typeof BulkStatusChangeSchema>;
