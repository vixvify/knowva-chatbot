"use server";

import { parseSetCookieHeader, toCookieOptions } from "better-auth/cookies";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { authService } from "@/container";
import { LoginSchema, RegisterSchema, type LoginInput, type RegisterInput } from "../auth.schema";
import { AppError } from "@/shared/errors/app-error";
import { getActionHeaders } from "@/shared/lib/security/action-headers";
import { parseSchema } from "@/shared/lib/validation";

async function applyCookies(headers: Headers) {
  const store = await cookies();
  for (const value of headers.getSetCookie()) {
    for (const [name, attributes] of parseSetCookieHeader(value)) {
      store.set(name, attributes.value, toCookieOptions(attributes));
    }
  }
}

export async function signIn(input: LoginInput) {
  try {
    const headers = await getActionHeaders();
    await applyCookies(await authService.signIn(headers, parseSchema(LoginSchema, input)));
  } catch (error) {
    return { error: error instanceof AppError ? error.message : "Could not sign in. Try again." };
  }
  redirect("/");
}

export async function signUp(input: RegisterInput) {
  try {
    const headers = await getActionHeaders();
    await authService.signUp(headers, parseSchema(RegisterSchema, input));
  } catch (error) {
    return { error: error instanceof AppError ? error.message : "Could not create your account. Try again." };
  }
  redirect("/login?registered=1");
}

export async function signOut() {
  const headers = await getActionHeaders();
  await applyCookies(await authService.signOut(headers));
  redirect("/login");
}
