import { createApp } from "./app.js";
import { getEnv } from "./config/env.js";
import { prisma } from "./lib/prisma.js";

async function main(): Promise<void> {
  const env = getEnv();
  const app = createApp();

  const server = app.listen(env.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`[foodflow] API listening on :${env.PORT} (${env.NODE_ENV})`);
  });

  const shutdown = async (signal: string): Promise<void> => {
    // eslint-disable-next-line no-console
    console.log(`[foodflow] received ${signal}, shutting down...`);
    server.close();
    await prisma.$disconnect();
    process.exit(0);
  };

  process.on("SIGINT", () => void shutdown("SIGINT"));
  process.on("SIGTERM", () => void shutdown("SIGTERM"));
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error("[foodflow] failed to start", err);
  process.exit(1);
});
