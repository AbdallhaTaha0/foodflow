import type { PrismaClient } from "@prisma/client";

// Repository Pattern proof for M1 (AGENTS.md / RULES.md):
//   Service -> Repository -> Prisma. Controllers never touch Prisma.
//
// This repository owns persistence-level health checks only.
// No HTTP status codes, no auth decisions, no presentation logic here.
export interface IHealthRepository {
  /** Returns true when the database answers a trivial query. */
  checkDatabase(): Promise<boolean>;
}

export class PrismaHealthRepository implements IHealthRepository {
  constructor(private readonly db: PrismaClient) {}

  async checkDatabase(): Promise<boolean> {
    // `$queryRaw` with a static query string (no interpolation of
    // untrusted input) — used only as a connectivity probe.
    await this.db.$queryRaw`SELECT 1`;
    return true;
  }
}
