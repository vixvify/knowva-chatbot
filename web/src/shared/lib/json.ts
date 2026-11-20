import { AppError } from "../errors/app-error";
import type { JsonValue } from "../types/json";

export function parseJson(value: string): JsonValue {
  try {
    return JSON.parse(value) as JsonValue;
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new AppError("Invalid JSON payload", 400);
    }
    throw error;
  }
}

export async function readJson(request: Request): Promise<JsonValue> {
  return parseJson(await request.text());
}
