import { paginate, paginationMeta } from "../utils/pagination";
import { prisma } from "../lib/prisma";
import { AppError } from "../middlewares/errorHandler";
import {
  CreateArticleInput,
  UpdateArticleInput,
} from "../models/article.model";

interface ArticleFilter {
  status?: string;
  networkId?: string;
  categoryId?: string;
  featured?: string;
  search?: string;
  page?: string;
  limit?: string;
}

const articleInclude = {
  network: true,
  categories: { include: { category: true } },
};

export async function getAll(filter: ArticleFilter) {
  const { limit, page, skip } = paginate(
    Number(filter.page) || 1,
    Number(filter.limit) || 20,
  );

  const where: any = {};

  if (filter.status) where.status = filter.status;
  if (filter.networkId) where.networkId = filter.networkId;
  if (filter.featured === "true") where.featured = true;

  if (filter.categoryId) {
    where.categories = { some: { categoryId: filter.categoryId } };
  }

  if (filter.search) {
    where.OR = [
      { title: { contains: filter.search } },
      { content: { contains: filter.search } },
    ];
  }

  const [data, total] = await Promise.all([
    prisma.article.findMany({
      where,
      include: articleInclude,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.article.count({ where }),
  ]);

  return { data, pagination: paginationMeta(total, page, limit) };
}

export async function getById(id: string) {
  const article = await prisma.article.findUnique({
    where: { id },
    include: articleInclude,
  });

  if (!article) throw new AppError(404, "Article not found");

  return article;
}

export async function create(data: CreateArticleInput) {
  const { categoryIds, ...rest } = data;

  return prisma.article.create({
    data: {
      ...rest,
      categories: {
        create: categoryIds.map((id) => ({ categoryId: id })),
      },
    },
    include: articleInclude,
  });
}

export async function update(id: string, data: UpdateArticleInput) {
  await getById(id);
  const { categoryIds, ...rest } = data;

  return prisma.article.update({
    where: { id },
    data: {
      ...rest,
      ...(categoryIds && {
        categories: {
          deleteMany: {},
          create: categoryIds.map((id) => ({ categoryId: id })),
        },
      }),
    },
    include: articleInclude,
  });
}

export async function remove(id: string) {
  await getById(id);

  return prisma.article.delete({ where: { id } });
}

export async function changeStatus(id: string, status: string) {
  await getById(id);

  return prisma.article.update({
    where: { id },
    data: {
      status,
      publishedAt: status === "published" ? new Date() : undefined,
    },
    include: articleInclude,
  });
}

export async function getStats() {
  const [total, draft, published, archived, featured, byNetwork] =
    await Promise.all([
      prisma.article.count(),
      prisma.article.count({ where: { status: "draft" } }),
      prisma.article.count({ where: { status: "published" } }),
      prisma.article.count({ where: { status: "archived" } }),
      prisma.article.count({ where: { featured: true } }),
      prisma.network.findMany({
        include: { _count: { select: { articles: true } } },
      }),
    ]);

  return {
    total,
    byStatus: { draft, published, archived },
    byNetwork,
    featured,
  };
}

export async function bulkChangeStatus(ids: string[], status: string) {
  return prisma.article.updateMany({
    where: { id: { in: ids } },
    data: {
      status,
      publishedAt: status === "published" ? new Date() : undefined,
    },
  });
}
