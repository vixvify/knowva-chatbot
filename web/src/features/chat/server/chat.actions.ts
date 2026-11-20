"use server";

import { chatService } from "@/container";
import { requireUser } from "@/features/auth/server/auth-check";
import { AppError } from "@/shared/errors/app-error";
import { getActionHeaders } from "@/shared/lib/security/action-headers";
import { parseSchema } from "@/shared/lib/validation";
import { ChatMessageSchema, type ChatMessageInput, type ChatMessageResult } from "../chat.schema";

export async function sendChatMessage(input: ChatMessageInput): Promise<ChatMessageResult> {
  try {
    const user = await requireUser(await getActionHeaders());
    const result = await chatService.sendMessage(user.id, parseSchema(ChatMessageSchema, input));
    return { reply: result.reply };
  } catch (error) {
    return { error: error instanceof AppError ? error.message : "Could not send your message. Try again." };
  }
}
