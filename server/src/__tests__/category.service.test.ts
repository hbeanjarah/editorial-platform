import { describe, it, expect } from "vitest";
import * as categoryService from "../services/category.service";

describe("category.service", () => {
  it("should return categories with article count", async () => {
    const categories = await categoryService.getAll();
    expect(categories.length).toBeGreaterThan(0);
    categories.forEach((cat) => {
      expect(cat._count).toHaveProperty("articles");
    });
  });

  it("should throw 409 when deleting a used category", async () => {
    const categories = await categoryService.getAll();
    const usedCategory = categories.find((c) => (c._count?.articles ?? 0) > 0);

    if (usedCategory) {
      await expect(categoryService.remove(usedCategory.id)).rejects.toThrow(
        "Cannot delete category with associated articles",
      );
    }
  });

  it("should throw 404 for non-existent category", async () => {
    await expect(categoryService.remove("non-existent-id")).rejects.toThrow(
      "Category not found",
    );
  });
});
