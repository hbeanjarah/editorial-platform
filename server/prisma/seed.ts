import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL || "file:./dev.db",
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  await prisma.emailNotification.deleteMany();
  await prisma.categoriesOnArtcicle.deleteMany();
  await prisma.article.deleteMany();
  await prisma.category.deleteMany();
  await prisma.network.deleteMany();

  const [techno, business, design, marketing] = await Promise.all([
    prisma.category.create({
      data: {
        name: "Technologie",
        slug: "technologie",
        description: "Articles sur la technologie et l'innovation",
        color: "#3B82F6",
      },
    }),
    prisma.category.create({
      data: {
        name: "Business",
        slug: "business",
        description: "Articles sur le monde des affaires",
        color: "#10B981",
      },
    }),
    prisma.category.create({
      data: {
        name: "Design",
        slug: "design",
        description: "Articles sur le design et l'expérience utilisateur",
        color: "#8B5CF6",
      },
    }),
    prisma.category.create({
      data: {
        name: "Marketing",
        slug: "marketing",
        description: "Articles sur le marketing digital",
        color: "#F59E0B",
      },
    }),
  ]);

  console.log(
    `Created: ${[techno, business, design, marketing].length} categories`,
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
