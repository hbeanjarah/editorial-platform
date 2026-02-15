import type { Category } from "@/types";
import { api } from "./api";

export async function getAllCategories(): Promise<Category[]> {
  const { data } = await api.get("/categories");

  return data;
}

export async function createCategory(category: {
  name: string;
  description?: string;
  color: string;
}): Promise<Category> {
  const { data } = await api.post("/categories", category);

  return data;
}

export async function updateCategory(
  id: string,
  category: {
    name?: string;
    description?: string;
    color?: string;
  },
): Promise<Category> {
  const { data } = await api.put(`/categories/${id}`, category);

  return data;
}

export async function deleteCategory(id: string): Promise<void> {
  await api.delete(`/categories/${id}`);
}
