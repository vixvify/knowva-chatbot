import type { ZodType } from "zod";
import { AppError } from "@/shared/errors/app-error";
import type { JsonValue } from "@/shared/types/json";

export function parseSchema<T>(schema: ZodType<T>, body: JsonValue): T {
  const result = schema.safeParse(body);
  if (!result.success) {
    throw new AppError(result.error.issues[0]?.message ?? "Invalid input", 400, "VALIDATION_ERROR");
  }
  return result.data;
}
