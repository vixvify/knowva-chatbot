import type { CreateUserInput, LoginInput } from "../auth.schema";

export interface AuthPort {
  signIn(headers: Headers, input: LoginInput): Promise<Headers>;
  signUp(headers: Headers, input: CreateUserInput): Promise<void>;
  signOut(headers: Headers): Promise<Headers>;
}
