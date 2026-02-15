import { prisma } from "../lib/prisma";
import { slugify } from "../utils/slugify";

interface ImportRow {
  title: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  network: string;
}

interface ErrorImport {
  index: number;
  message: string;
}

export async function importArticles(rows: unknown[]) {
  let imported = 0;
  const errors: ErrorImport[] = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i] as ImportRow;

    if (
      !row.title ||
      !row.content ||
      !row.excerpt ||
      !row.author ||
      !row.category ||
      !row.network
    ) {
      errors.push({ index: i, message: "Missing required fields" });

      continue;
    }

    const network = await prisma.network.findFirst({
      where: { name: row.network },
    });

    if (!network) {
      errors.push({ index: i, message: `Network "${row.network}" not found` });

      continue;
    }

    let category = await prisma.category.findFirst({
      where: { name: row.category },
    });

    if (!category) {
      category = await prisma.category.create({
        data: {
          name: row.category,
          slug: slugify(row.category),
          color: "#6B7280", // Default gray color because we don't have a color field in the import data
        },
      });
    }

    try {
      await prisma.article.create({
        data: {
          title: row.title,
          content: row.content,
          excerpt: row.excerpt,
          author: row.author,
          networkId: network.id,
          categories: {
            create: [{ categoryId: category.id }],
          },
        },
      });

      imported++;
    } catch (err) {
      errors.push({ index: i, message: "Failed to create article" });
    }
  }

  return { imported, errors };
}
