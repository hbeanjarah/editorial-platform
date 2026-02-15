interface EmailData {
  title: string;
  excerpt: string;
  author: string;
  content: string;
}

export function buildArticleEmail(data: EmailData): string {
  return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding:
  20px; }
          h1 { color: #1a1a1a; }
          .excerpt { color: #666; font-style: italic; margin-bottom: 20px; }
          .content { line-height: 1.6; }
          .footer { margin-top: 30px; color: #999; font-size: 12px; }
        </style>
      </head>
      <body>
        <h1>${data.title}</h1>
        <p class="excerpt">${data.excerpt}</p>
        <div class="content">${data.content}</div>
        <div class="footer">
          <p>Rédigé par ${data.author}</p>
          <p>Editorial CMS </p>
        </div>
      </body>
      </html>
    `.trim();
}
