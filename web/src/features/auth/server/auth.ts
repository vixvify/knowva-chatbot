import "server-only";

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { config } from "@/shared/config/runtime";
import { getPrisma } from "@/shared/lib/prisma";
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from "../auth.constants";

function createAuth() {
  return betterAuth({
    appName: "Knowa",
    baseURL: config.authUrl,
    secret: config.authSecret,
    trustedOrigins: config.trustedOrigins,
    database: prismaAdapter(getPrisma(), { provider: "postgresql" }),
    emailAndPassword: {
      enabled: true,
      autoSignIn: false,
      minPasswordLength: PASSWORD_MIN_LENGTH,
      maxPasswordLength: PASSWORD_MAX_LENGTH,
    },
    rateLimit: { enabled: true },
  });
}

let auth: ReturnType<typeof createAuth> | undefined;

export function getAuth() {
  auth ??= createAuth();
  return auth;
}
