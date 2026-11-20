import type { ChatReply } from "../chat.schema";

export interface ChatRepository {
  sendMessage(input: { userId: string; message: string }): Promise<ChatReply>;
}
