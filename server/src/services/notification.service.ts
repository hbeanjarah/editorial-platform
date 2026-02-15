import { prisma } from "../lib/prisma";
import { AppError } from "../middlewares/errorHandler";
import { SendNotificationInput } from "../models/notification.model";
import { buildArticleEmail } from "../utils/emailTemplate";

export async function sendNotification(
  articleId: string,
  data: SendNotificationInput,
) {
  const article = await prisma.article.findUnique({
    where: { id: articleId },
  });

  if (!article) throw new AppError(404, "Article not found");

  const htmlContent = buildArticleEmail({
    title: article.title,
    content: article.content,
    author: article.author,
    excerpt: article.excerpt,
  });

  const notification = await prisma.emailNotification.create({
    data: {
      subject: data.subject,
      recipients: data.recipients,
      articleId,
      status: "sent",
    },
    include: { article: true },
  });

  return { notification, htmlContent };
}

export async function getAll() {
  return prisma.emailNotification.findMany({
    include: { article: { select: { id: true, title: true } } },
    orderBy: { sentAt: "desc" },
  });
}
