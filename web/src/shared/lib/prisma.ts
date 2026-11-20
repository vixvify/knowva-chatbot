import "server-only";

import { PrismaClient } from "@prisma/client";
import { config } from "@/shared/config/runtime";

const globals = globalThis as typeof globalThis & { knowaPrisma?: PrismaClient };

let client = globals.knowaPrisma;

export function getPrisma() {
  client ??= new PrismaClient({ datasourceUrl: config.databaseUrl });
  if (!config.isProduction) globals.knowaPrisma = client;
  return client;
}
