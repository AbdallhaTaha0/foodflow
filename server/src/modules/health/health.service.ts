import { AppError } from "../../errors/AppError.js";
import type { IHealthRepository } from "./health.repository.js";

export interface HealthStatus {
  status: "ok";
  uptimeSeconds: number;
  timestamp: string;
}

export class HealthService {
  constructor(private readonly repo: IHealthRepository) {}

  liveness(): HealthStatus {
    return {
      status: "ok",
      uptimeSeconds: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
    };
  }

  async readiness(): Promise<HealthStatus & { database: "up" }> {
    try {
      await this.repo.checkDatabase();
    } catch {
      throw new AppError("DATABASE_ERROR", "Database is unreachable");
    }
    return { ...this.liveness(), database: "up" as const };
  }
}
