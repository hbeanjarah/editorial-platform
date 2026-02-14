import { prisma } from "../lib/prisma";
import { slugify } from "../utils/slugify";
import {
  CreateCategoryInput,
  UpdateCategoryInput,
} from "../models/category.model";
import { AppError } from "../middlewares/errorHandler";

export async function getAll() {
  return prisma.category.findMany({
    include: {
      _count: {
        select: { articles: true },
      },
    },
    orderBy: { name: "asc" },
  });
}

export async function create(data: CreateCategoryInput) {
  const slug = slugify(data.name);

  return prisma.category.create({
    data: {
      ...data,
      slug,
    },
  });
}

export async function update(id: string, data: UpdateCategoryInput) {
  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) throw new AppError(404, "Category not found");

  const slug = data.name ? slugify(data.name) : undefined;

  return prisma.category.update({
    where: { id },
    data: {
      ...data,
      ...(slug && { slug }),
    },
  });
}

export async function remove(id: string) {
  const category = await prisma.category.findUnique({
    where: { id },
    include: { _count: { select: { articles: true } } },
  });
  if (!category) throw new AppError(404, "Category not found");

  if (category._count.articles > 0) {
    throw new AppError(400, "Cannot delete category with associated articles");
  }

  return prisma.category.delete({ where: { id } });
}
