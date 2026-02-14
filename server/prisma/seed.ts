import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL ?? "",
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

  const [france, europe, international] = await Promise.all([
    prisma.network.create({
      data: {
        name: "TARAM France",
        description: "Réseau national français",
      },
    }),
    prisma.network.create({
      data: {
        name: "TARAM Europe",
        description: "Réseau européen",
      },
    }),
    prisma.network.create({
      data: {
        name: "TARAM International",
        description: "Réseau international",
      },
    }),
  ]);

  console.log(
    `Created: ${[techno, business, design, marketing, france, europe, international].length} categories and networks`,
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
