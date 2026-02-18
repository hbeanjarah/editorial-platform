import { create } from "zustand";

type ArticleFiltersState = {
  search: string;
  status: string;
  categoryId: string;
  networkId: string;
  featured: string;
  page: number;
  resetFilters: () => void;
  setPage: (page: number) => void;
  setFilter: (field: string, value: string) => void;
};

const initialFilters = {
  search: "",
  status: "",
  categoryId: "",
  networkId: "",
  featured: "",
  page: 1,
};

export const useArticleFilters = create<ArticleFiltersState>((set) => ({
  ...initialFilters,
  setFilter: (field, value) => set({ [field]: value, page: 1 }),
  resetFilters: () => set(initialFilters),
  setPage: (page) => set({ page }),
}));

export type FilterType = Pick<
  ArticleFiltersState,
  "search" | "status" | "categoryId" | "networkId" | "featured"
>;
