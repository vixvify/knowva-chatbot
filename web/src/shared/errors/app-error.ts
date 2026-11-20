import type { JsonObject } from "@/shared/types/json";

export class AppError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly code?: string,
    public readonly data?: JsonObject,
  ) {
    super(message);
    this.name = "AppError";
  }
}
