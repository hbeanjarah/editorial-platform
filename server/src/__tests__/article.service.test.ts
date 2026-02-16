import { describe, it, expect } from "vitest";
import * as articleService from "../services/article.service";

describe("article.service", () => {
  it("should return paginated articles", async () => {
    const result = await articleService.getAll({});

    expect(result.data).toBeDefined();
    expect(result.pagination).toBeDefined();
    expect(result.pagination.page).toBe(1);
    expect(result.data.length).toBeGreaterThan(0);
  });

  it("should filter articles by status", async () => {
    const result = await articleService.getAll({ status: "draft" });

    result.data.forEach((article) => {
      expect(article.status).toBe("draft");
    });
  });

  it("should return stats with correct structure", async () => {
    const stats = await articleService.getStats();

    expect(stats.total).toBeGreaterThan(0);
    expect(stats.byStatus).toHaveProperty("draft");
    expect(stats.byStatus).toHaveProperty("published");
    expect(stats.byStatus).toHaveProperty("archived");
    expect(stats.featured).toBeDefined();
  });

  it("should throw 404 for non-existent article", async () => {
    await expect(articleService.getById("non-existent-id")).rejects.toThrow(
      "Article not found",
    );
  });
});
