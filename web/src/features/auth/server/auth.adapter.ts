import "server-only";

import { AppError } from "@/shared/errors/app-error";
import { config } from "@/shared/config/runtime";
import type { CreateUserInput, LoginInput } from "../auth.schema";
import type { AuthPort } from "./auth.port";
import { getAuth } from "./auth";

export class AuthAdapter implements AuthPort {
  async signIn(headers: Headers, input: LoginInput): Promise<Headers> {
    const response = await this.submit("/api/auth/sign-in/email", headers, input);
    if (response.status === 400 || response.status === 401) {
      throw new AppError("Email or password is incorrect.", 401);
    }
    if (!response.ok) throw new AppError("Could not sign in.", response.status);
    return response.headers;
  }

  async signUp(headers: Headers, input: CreateUserInput): Promise<void> {
    const response = await this.submit("/api/auth/sign-up/email", headers, input);
    if (!response.ok) throw new AppError("Could not create your account.", response.status);
  }

  async signOut(headers: Headers): Promise<Headers> {
    const response = await this.submit("/api/auth/sign-out", headers, {});
    if (!response.ok) throw new AppError("Could not sign out.", response.status);
    return response.headers;
  }

  private submit(path: string, incoming: Headers, input: object) {
    const headers = new Headers(incoming);
    headers.delete("content-length");
    headers.delete("next-action");
    headers.set("content-type", "application/json");
    return getAuth().handler(new Request(new URL(path, config.authUrl), {
      method: "POST",
      headers,
      body: JSON.stringify(input),
    }));
  }
}
