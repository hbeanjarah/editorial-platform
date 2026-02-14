import "dotenv/config";

export const config = {
  port: Number(process.env.PORT) || 3001,
  databaseUrl: process.env.DATABASE_URL || "file:./dev.db",
};
