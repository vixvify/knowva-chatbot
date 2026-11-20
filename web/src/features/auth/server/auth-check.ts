import "server-only";

import { getSessionCookie } from "better-auth/cookies";
import { AppError } from "@/shared/errors/app-error";
import { getAuth } from "./auth";

export async function getUser(headers: Headers) {
  if (!getSessionCookie(headers)) return null;
  const session = await getAuth().api.getSession({ headers });
  return session?.user ?? null;
}

export async function requireUser(headers: Headers) {
  const user = await getUser(headers);
  if (!user) throw new AppError("Sign in to send a message.", 401);
  return user;
}
