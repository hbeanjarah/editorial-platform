import { describe, it, expect, vi, beforeEach } from "vitest";
const mockPrisma = vi.hoisted(() => ({
  category: {
    findMany: vi.fn(),
    findUnique: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}));

vi.mock("../lib/prisma", () => ({
  prisma: mockPrisma,
}));

import * as categoryService from "../services/category.service";

describe("category.service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return categories with article count", async () => {
    mockPrisma.category.findMany.mockResolvedValue([
      { id: "1", name: "Tech", _count: { articles: 3 } },
      { id: "2", name: "Design", _count: { articles: 0 } },
    ]);

    const categories = await categoryService.getAll();

    expect(categories).toHaveLength(2);
    expect(categories[0]._count.articles).toBe(3);
  });

  it("should throw 409 when deleting a used category", async () => {
    mockPrisma.category.findUnique.mockResolvedValue({
      id: "1",
      name: "Tech",
      _count: { articles: 3 },
    });

    await expect(categoryService.remove("1")).rejects.toThrow(
      "Cannot delete category with associated articles",
    );
  });

  it("should delete unused category", async () => {
    mockPrisma.category.findUnique.mockResolvedValue({
      id: "2",
      name: "Empty",
      _count: { articles: 0 },
    });
    mockPrisma.category.delete.mockResolvedValue({ id: "2" });

    await categoryService.remove("2");

    expect(mockPrisma.category.delete).toHaveBeenCalledWith({
      where: { id: "2" },
    });
  });

  it("should throw 404 for non-existent category", async () => {
    mockPrisma.category.findUnique.mockResolvedValue(null);

    await expect(categoryService.remove("bad-id")).rejects.toThrow(
      "Category not found",
    );
  });
});
