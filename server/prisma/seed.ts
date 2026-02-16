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

  const articles = await Promise.all([
    prisma.article.create({
      data: {
        title: "L'avenir de l'intelligence artificielle en France",
        content:
          "En France, l’intelligence artificielle n’est plus un sujet futuriste réservé aux laboratoires. Elle s’invite dans notre quotidien, que ce soit à travers les assistants vocaux, les outils d’analyse de données ou encore les solutions utilisées par les hôpitaux et les banques. De plus en plus d’entreprises françaises investissent dans l’IA pour gagner en efficacité et rester compétitives à l’international, tout en s’interrogeant sur les enjeux éthiques et sociaux qu’elle implique.",
        excerpt: "L'IA transforme le paysage technologique français",
        author: "Marie Dupont",
        status: "published",
        featured: true,
        publishedAt: new Date("2026-01-15"),
        networkId: france.id,
        categories: { create: [{ categoryId: techno.id }] },
      },
    }),
    prisma.article.create({
      data: {
        title: "Stratégies de croissance pour les startups européennes",
        content:
          "Ces dernières années, l’écosystème des startups européennes a pris une ampleur impressionnante. Les levées de fonds s’enchaînent et de nouveaux acteurs émergent dans la fintech, la healthtech ou encore la greentech. Derrière ces chiffres encourageants, on trouve surtout des entrepreneurs qui testent, ajustent et innovent en permanence pour trouver leur place sur un marché très concurrentiel.",
        excerpt: "Les startups européennes en pleine expansion",
        author: "Pierre Martin",
        status: "published",
        featured: true,
        publishedAt: new Date("2026-01-20"),
        networkId: europe.id,
        categories: { create: [{ categoryId: business.id }] },
      },
    }),
    prisma.article.create({
      data: {
        title: "Les tendances UX/UI design en 2026",
        content:
          "En 2026, le design d’interface ne cherche plus à en mettre plein la vue, mais à simplifier la vie des utilisateurs. Les micro-interactions rendent les parcours plus fluides, le design inclusif devient une évidence et les interfaces vocales gagnent du terrain. L’objectif n’est plus seulement esthétique : il s’agit de créer des expériences claires, accessibles et réellement agréables à utiliser.",
        excerpt: "Nouvelles tendances en design d'interface",
        author: "Sophie Leroy",
        status: "published",
        publishedAt: new Date("2026-01-25"),
        networkId: france.id,
        categories: { create: [{ categoryId: design.id }] },
      },
    }),
    prisma.article.create({
      data: {
        title: "Marketing digital : les clés du succès international",
        content:
          "Déployer une stratégie marketing à l’international ne se résume pas à traduire un site web. Il faut comprendre les habitudes locales, les codes culturels et les attentes spécifiques de chaque marché. Les marques qui réussissent sont celles qui savent adapter leur message sans perdre leur identité, en misant sur la personnalisation et une vraie proximité avec leur audience.",
        excerpt: "Les clés du marketing à l'international",
        author: "Luc Bernard",
        status: "published",
        publishedAt: new Date("2026-02-01"),
        networkId: international.id,
        categories: { create: [{ categoryId: marketing.id }] },
      },
    }),
    prisma.article.create({
      data: {
        title: "La cybersécurité au cœur des préoccupations",
        content:
          "Les cyberattaques ne sont plus des cas isolés. Face à des menaces de plus en plus sophistiquées, les entreprises prennent conscience que la cybersécurité ne concerne pas uniquement le service informatique. Former les équipes, mettre à jour régulièrement les systèmes et adopter des solutions de protection avancées devient indispensable pour préserver la confiance des clients et sécuriser les données sensibles.",
        excerpt: "La cybersécurité devient une priorité",
        author: "Antoine Moreau",
        status: "published",
        publishedAt: new Date("2026-02-05"),
        networkId: europe.id,
        categories: {
          create: [{ categoryId: techno.id }, { categoryId: business.id }],
        },
      },
    }),
    prisma.article.create({
      data: {
        title: "Le commerce en ligne en pleine mutation",
        content:
          "Le e-commerce évolue rapidement avec l’essor du social commerce, du live shopping et des expériences en réalité augmentée. Les consommateurs ne veulent plus seulement acheter un produit : ils recherchent une expérience fluide, interactive et personnalisée. Les marques doivent donc repenser leurs parcours d’achat pour créer plus d’engagement et de proximité.",
        excerpt: "Le e-commerce se réinvente",
        author: "Claire Dubois",
        status: "published",
        publishedAt: new Date("2026-02-10"),
        networkId: france.id,
        categories: {
          create: [{ categoryId: marketing.id }, { categoryId: business.id }],
        },
      },
    }),
    prisma.article.create({
      data: {
        title: "Brouillon : Guide du développement durable",
        content:
          "De plus en plus d’entreprises intègrent le développement durable au cœur de leur stratégie. Réduction de l’empreinte carbone, optimisation des ressources, économie circulaire : les initiatives se multiplient. Au-delà de l’image, il s’agit désormais d’un véritable engagement pour concilier performance économique et responsabilité environnementale.",
        excerpt: "Le développement durable en entreprise",
        author: "Marie Dupont",
        status: "draft",
        networkId: international.id,
        categories: { create: [{ categoryId: business.id }] },
      },
    }),
    prisma.article.create({
      data: {
        title: "Brouillon : Les nouvelles méthodes de travail",
        content:
          "Le télétravail et les modèles hybrides ont profondément transformé l’organisation du travail. Les équipes doivent apprendre à collaborer différemment, à distance comme en présentiel. Entre flexibilité accrue et nouveaux défis managériaux, les entreprises cherchent encore le bon équilibre pour maintenir motivation et productivité.",
        excerpt: "Repenser l'organisation du travail",
        author: "Pierre Martin",
        status: "draft",
        networkId: france.id,
        categories: { create: [{ categoryId: design.id }] },
      },
    }),
    prisma.article.create({
      data: {
        title: "Brouillon : Innovation dans la santé connectée",
        content:
          "La santé connectée change progressivement la manière dont les patients sont suivis au quotidien. Montres intelligentes, applications de télémédecine et capteurs médicaux permettent un suivi plus régulier et parfois plus précoce des problèmes de santé. Cette évolution ouvre de nouvelles perspectives, tout en posant des questions sur la protection des données médicales.",
        excerpt: "La santé connectée en plein essor",
        author: "Sophie Leroy",
        status: "draft",
        networkId: europe.id,
        categories: { create: [{ categoryId: techno.id }] },
      },
    }),
    prisma.article.create({
      data: {
        title: "Archivé : Bilan tech 2025",
        content:
          "L’année 2025 restera marquée par plusieurs avancées majeures : l’essor de l’intelligence artificielle générative, les progrès en informatique quantique et l’accélération du marché des véhicules électriques. Ces innovations ont profondément influencé les stratégies des entreprises et redéfini certaines priorités technologiques.",
        excerpt: "Rétrospective technologique 2025",
        author: "Antoine Moreau",
        status: "archived",
        networkId: france.id,
        categories: { create: [{ categoryId: techno.id }] },
      },
    }),
    prisma.article.create({
      data: {
        title: "Archivé : Tendances marketing 2025",
        content:
          "En 2025, le marketing a été fortement influencé par la montée des contenus courts, la puissance du social commerce et l’usage croissant de l’intelligence artificielle pour personnaliser les campagnes. Les marques ont dû s’adapter rapidement pour capter l’attention dans un environnement numérique saturé.",
        excerpt: "Rétrospective marketing 2025",
        author: "Luc Bernard",
        status: "archived",
        networkId: europe.id,
        categories: { create: [{ categoryId: marketing.id }] },
      },
    }),
    prisma.article.create({
      data: {
        title: "Archivé : Le design thinking en entreprise",
        content:
          "Le design thinking s’est imposé comme une approche concrète pour résoudre des problématiques complexes en entreprise. En mettant l’utilisateur au centre et en favorisant l’expérimentation rapide, cette méthode a permis à de nombreuses organisations de repenser leurs produits et services avec des résultats tangibles.",
        excerpt: "Le design thinking en pratique",
        author: "Claire Dubois",
        status: "archived",
        networkId: international.id,
        categories: { create: [{ categoryId: design.id }] },
      },
    }),
  ]);

  console.log(`Created: ${articles.length} articles`);

  const notifications = await Promise.all([
    prisma.emailNotification.create({
      data: {
        subject:
          "Nouvel article : L'avenir de l'intelligence artificielle en France",
        recipients: "redaction@taram.fr, tech@taram.fr",
        status: "sent",
        articleId: articles[0].id,
      },
    }),
    prisma.emailNotification.create({
      data: {
        subject:
          "Nouvel article : Stratégies de croissance pour les startups européennes",
        recipients:
          "newsletter@taram.fr, partenaires@taram.fr, presse@taram.fr",
        status: "sent",
        articleId: articles[1].id,
      },
    }),
    prisma.emailNotification.create({
      data: {
        subject: "Nouvel article : La cybersécurité au cœur des préoccupations",
        recipients: "securite@taram.fr",
        status: "failed",
        articleId: articles[4].id,
      },
    }),
  ]);

  console.log(`Created: ${notifications.length} notifications`);
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
