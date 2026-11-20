import "server-only";

import { isAxiosError } from "axios";
import { config } from "@/shared/config/runtime";
import { AppError } from "@/shared/errors/app-error";
import httpClient from "@/shared/lib/http";
import type { JsonValue } from "@/shared/types/json";
import { ChatReplySchema } from "../chat.schema";
import type { ChatRepository } from "./chat.repository.port";

export class FastApiChatRepository implements ChatRepository {
  async sendMessage({ userId, message }: { userId: string; message: string }) {
    const { url: serviceUrl, path, timeoutMs } = config.chatService;
    const url = new URL(path, serviceUrl);
    if (url.origin !== new URL(serviceUrl).origin) {
      throw new AppError("Chat service path must use the configured origin.", 500);
    }

    let payload: JsonValue;
    try {
      payload = await httpClient.postRaw(
        url.pathname + url.search,
        { user_id: userId, message },
        { baseURL: url.origin, timeout: timeoutMs, maxRedirects: 0, proxy: false },
      );
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.code === "ECONNABORTED" || error.code === "ETIMEDOUT") {
          throw new AppError("The chat service timed out.", 504);
        }
        if (error.response?.status === 404 || error.response?.status === 501) {
          throw new AppError("The chat service endpoint is not ready.", 503);
        }
      }
      throw new AppError("The chat service is unavailable.", 502);
    }

    const reply = ChatReplySchema.safeParse(payload);
    if (!reply.success) throw new AppError("The chat service returned an invalid reply.", 502);
    return reply.data;
  }
}
