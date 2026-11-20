import { z } from "zod";

import { AppError } from "../errors/app-error";

const NodeEnvironmentSchema = z.enum(["development", "test", "production"]);
const HttpUrlSchema = z.url({ protocol: /^https?$/ });
const TimeoutSchema = z.coerce.number().int().positive().max(120_000);
const ChatServiceEnvironmentSchema = z.object({
  url: HttpUrlSchema,
  path: z.string().regex(/^\/(?!\/)[^\\]*$/),
  timeoutMs: TimeoutSchema,
});

const ApiEnvironmentSchema = z.object({
  url: z
    .string()
    .trim()
    .url()
    .transform((value) => value.replace(/\/+$/, "")),
});

const GoogleOAuthEnvironmentSchema = z.object({
  clientId: z.string().trim().min(1),
  clientSecret: z.string().trim().min(1),
});

const ResendEnvironmentSchema = z.object({
  apiKey: z.string().trim().min(1),
  fromEmail: z.string().trim().email(),
});

const InitialAdminEmailSchema = z.string().trim().toLowerCase().email();

export type ResendConfig = z.infer<typeof ResendEnvironmentSchema>;

function getApiUrl() {
  if (!process.env.NEXT_PUBLIC_API_URL) return "";
  const result = ApiEnvironmentSchema.safeParse({
    url: process.env.NEXT_PUBLIC_API_URL,
  });

  if (!result.success) {
    throw new AppError("API URL is not configured", 500);
  }

  return result.data.url;
}

function getDatabaseUrl(): string {
  const result = z.url({ protocol: /^postgres(?:ql)?$/ }).safeParse(process.env.DATABASE_URL);
  if (!result.success) throw new AppError("DATABASE_URL is missing or invalid.", 500);
  const value = result.data;

  const url = new URL(value);
  if (!url.hostname.endsWith(".neon.tech")) return value;
  const neonTimeout = process.env.DATABASE_NEON_MIN_TIMEOUT_SECONDS;
  if (!neonTimeout) return value;
  const minimumTimeout = z.coerce.number().int().positive().parse(neonTimeout);

  for (const parameter of ["connect_timeout", "pool_timeout"]) {
    const configured = Number(url.searchParams.get(parameter) || NaN);
    if (
      !Number.isInteger(configured) ||
      configured < 0 ||
      (configured > 0 && configured < minimumTimeout)
    ) {
      url.searchParams.set(parameter, String(minimumTimeout));
    }
  }

  return url.toString();
}

function getAuthSecret() {
  const secret = process.env.BETTER_AUTH_SECRET?.trim();
  if (!secret || secret.length < 32) {
    throw new AppError("BETTER_AUTH_SECRET must contain at least 32 characters.", 500);
  }
  return secret;
}

function getAuthUrl() {
  const result = HttpUrlSchema.safeParse(process.env.BETTER_AUTH_URL);
  if (!result.success) throw new AppError("BETTER_AUTH_URL is missing or invalid.", 500);
  return result.data;
}

function getGoogleOAuthConfig() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId && !clientSecret) {
    return null;
  }

  const result = GoogleOAuthEnvironmentSchema.safeParse({
    clientId,
    clientSecret,
  });

  if (!result.success) {
    throw new AppError("Google OAuth configuration is incomplete", 500);
  }

  return result.data;
}

function getResendConfig(): ResendConfig {
  const result = ResendEnvironmentSchema.safeParse({
    apiKey: process.env.RESEND_API_KEY,
    fromEmail: process.env.RESEND_FROM_EMAIL,
  });

  if (!result.success) {
    throw new AppError("Resend configuration is incomplete or invalid", 500);
  }

  return result.data;
}

export const config = {
  get trustedOrigins(): string[] {
    const authUrl = new URL(getAuthUrl());
    const localHosts = ["localhost", "127.0.0.1", "[::1]"];
    const localOrigins = localHosts.includes(authUrl.hostname)
      ? localHosts.map((host) => `${authUrl.protocol}//${host}${authUrl.port ? `:${authUrl.port}` : ""}`)
      : [];
    const values = [
      authUrl.origin,
      ...localOrigins,
      ...(process.env.AUTH_TRUSTED_ORIGINS?.split(",") ?? []),
    ];
    return [
      ...new Set(
        values.filter(Boolean).map((value) => {
          const url = new URL(value.trim());
          if (
            url.protocol !== "https:" &&
            !(url.protocol === "http:" && (!config.isProduction || localHosts.includes(url.hostname)))
          ) {
            throw new Error("Trusted origins must use HTTPS in production");
          }
          return url.origin;
        }),
      ),
    ];
  },

  get rateLimitRedis(): { url: string; token: string; prefix: string; timeoutMs: number } | null {
    const url = process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN;
    if (!url && !token) return null;
    if (!url || !token)
      throw new Error("Upstash Redis configuration is incomplete");
    if (new URL(url).protocol !== "https:")
      throw new Error("Upstash Redis URL must use HTTPS");
    const prefix = z.string().trim().min(1).parse(process.env.RATE_LIMIT_PREFIX);
    const timeoutMs = TimeoutSchema.parse(process.env.RATE_LIMIT_TIMEOUT_MS);
    return { url, token, prefix, timeoutMs };
  },

  get isVercel(): boolean {
    return process.env.VERCEL === "1";
  },
  get isPreview(): boolean {
    return process.env.VERCEL_ENV === "preview";
  },
  get apiUrl() {
    return getApiUrl();
  },
  get httpTimeoutMs() {
    const value = process.env.NEXT_PUBLIC_HTTP_TIMEOUT_MS;
    if (value === undefined) return undefined;
    return TimeoutSchema.parse(value);
  },
  get chatService() {
    const result = ChatServiceEnvironmentSchema.safeParse({
      url: process.env.SERVICE_URL,
      path: process.env.CHAT_SERVICE_PATH,
      timeoutMs: process.env.CHAT_SERVICE_TIMEOUT_MS,
    });
    if (!result.success) throw new AppError("The chat service configuration is missing or invalid.", 500);
    return result.data;
  },

  get databaseUrl() {
    return getDatabaseUrl();
  },

  get authSecret() {
    return getAuthSecret();
  },

  get authUrl() {
    return getAuthUrl();
  },

  get googleOAuth() {
    return getGoogleOAuthConfig();
  },

  get resend() {
    return getResendConfig();
  },

  get initialAdminEmail() {
    const result = InitialAdminEmailSchema.safeParse(
      process.env.INITIAL_ADMIN_EMAIL,
    );

    if (!result.success) {
      throw new Error("INITIAL_ADMIN_EMAIL must be a valid email address");
    }

    return result.data;
  },

  get environment() {
    return NodeEnvironmentSchema.parse(process.env.NODE_ENV ?? "development");
  },

  get isProduction() {
    return config.environment === "production";
  },
};
