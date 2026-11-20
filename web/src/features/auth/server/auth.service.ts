import "server-only";

import type { LoginInput, RegisterInput } from "../auth.schema";
import type { AuthPort } from "./auth.port";

export class AuthService {
  constructor(private readonly auth: AuthPort) {}

  signIn(headers: Headers, input: LoginInput) {
    return this.auth.signIn(headers, input);
  }

  signUp(headers: Headers, { name, email, password }: RegisterInput) {
    return this.auth.signUp(headers, { name, email, password });
  }

  signOut(headers: Headers) {
    return this.auth.signOut(headers);
  }
}
