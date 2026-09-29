import "dotenv/config";
import { defineConfig } from "prisma/config";

// Prisma 7: connection URL lives here (CLI/migrations), not in schema.prisma.
// `process.env` (instead of env()) keeps `prisma generate` working in CI
// where no database URL is configured.
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env["DATABASE_URL"] ?? "",
  },
});
