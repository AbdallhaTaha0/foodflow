import { Router } from "express";
import { prisma } from "../../lib/prisma.js";
import { createHealthController } from "./health.controller.js";
import { PrismaHealthRepository } from "./health.repository.js";
import { HealthService } from "./health.service.js";

const repository = new PrismaHealthRepository(prisma);
const service = new HealthService(repository);
const controller = createHealthController(service);

export const healthRouter: Router = Router();

healthRouter.get("/", controller.live);
healthRouter.get("/ready", controller.ready);
