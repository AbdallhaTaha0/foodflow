import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import pg from "pg";

// Prisma 7 runtime connection goes through a driver adapter (not schema url).
const pool = new pg.Pool({
  connectionString: process.env["DATABASE_URL"],
});
const adapter = new PrismaPg(pool);

// Singleton suitable for dev hot-reload (tsx watch) and production.
// Prevents exhausting DB connections when the module graph reloads.
const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export const prisma: PrismaClient =
  globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env["NODE_ENV"] !== "production") {
  globalForPrisma.prisma = prisma;
}
