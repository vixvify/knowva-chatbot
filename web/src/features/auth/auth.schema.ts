import { z } from "zod";
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from "./auth.constants";

const email = z.string().trim().toLowerCase().email("Enter a valid email address.");
const password = z.string()
  .min(PASSWORD_MIN_LENGTH, "Use at least 8 characters.")
  .max(PASSWORD_MAX_LENGTH, "Use no more than 72 characters.")
  .regex(/[A-Z]/, "Add an uppercase letter.")
  .regex(/[a-z]/, "Add a lowercase letter.")
  .regex(/[0-9]/, "Add a number.");

export const CreateUserSchema = z.object({
  name: z.string().trim().min(2, "Enter at least 2 characters.").max(50, "Use no more than 50 characters."),
  email,
  password,
});

export const RegisterSchema = CreateUserSchema.extend({
  confirmPassword: z.string().min(1, "Confirm your password."),
}).refine((input) => input.password === input.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});

export const LoginSchema = z.object({
  email,
  password: z.string().min(1, "Enter your password.").max(PASSWORD_MAX_LENGTH),
});

export type CreateUserInput = z.infer<typeof CreateUserSchema>;
export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
