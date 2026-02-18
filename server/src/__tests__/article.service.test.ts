import { describe, it, expect, vi, beforeEach } from "vitest";

const mockPrisma = vi.hoisted(() => ({
  article: {
    findMany: vi.fn().mockResolvedValue([
      { id: "1", title: "Test Article", status: "draft", featured: false },
      {
        id: "2",
        title: "Published Article",
        status: "published",
        featured: true,
      },
    ]),
    count: vi.fn().mockResolvedValue(2),
    findUnique: vi.fn(),
  },
  network: {
    findMany: vi.fn().mockResolvedValue([]),
  },
}));

vi.mock("../lib/prisma", () => ({
  prisma: mockPrisma,
}));

import * as articleService from "../services/article.service";

describe("article.service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return paginated articles", async () => {
    const result = await articleService.getAll({});

    expect(result.data).toBeDefined();
    expect(result.pagination).toBeDefined();
    expect(result.pagination.page).toBe(1);
    expect(mockPrisma.article.findMany).toHaveBeenCalled();
  });

  it("should filter articles by status", async () => {
    await articleService.getAll({ status: "draft" });

    expect(mockPrisma.article.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({ status: "draft" }),
      }),
    );
  });

  it("should filter by featured", async () => {
    await articleService.getAll({ featured: "true" });

    expect(mockPrisma.article.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({ featured: true }),
      }),
    );
  });

  it("should apply search filter", async () => {
    await articleService.getAll({ search: "test" });

    expect(mockPrisma.article.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          OR: [
            { title: { contains: "test" } },
            { content: { contains: "test" } },
          ],
        }),
      }),
    );
  });

  it("should throw 404 for non-existent article", async () => {
    mockPrisma.article.findUnique.mockResolvedValue(null);

    await expect(articleService.getById("bad-id")).rejects.toThrow(
      "Article not found",
    );
  });

  it("should return stats with correct structure", async () => {
    mockPrisma.article.count
      .mockResolvedValueOnce(10)
      .mockResolvedValueOnce(3)
      .mockResolvedValueOnce(5)
      .mockResolvedValueOnce(2)
      .mockResolvedValueOnce(1);
    mockPrisma.network.findMany.mockResolvedValue([
      { id: "1", name: "TARAM France", _count: { articles: 5 } },
    ]);

    const stats = await articleService.getStats();

    expect(stats.total).toBe(10);
    expect(stats.byStatus.draft).toBe(3);
    expect(stats.byStatus.published).toBe(5);
    expect(stats.byStatus.archived).toBe(2);
    expect(stats.featured).toBe(1);
  });
});
