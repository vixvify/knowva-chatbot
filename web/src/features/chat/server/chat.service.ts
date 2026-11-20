import "server-only";

import type { ChatMessageInput } from "../chat.schema";
import type { ChatRepository } from "./chat.repository.port";

export class ChatService {
  constructor(private readonly repository: ChatRepository) {}

  sendMessage(userId: string, input: ChatMessageInput) {
    return this.repository.sendMessage({ userId, message: input.message });
  }
}
