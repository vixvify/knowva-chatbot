import { z } from "zod";

export const ChatMessageSchema = z.object({
  message: z.string().trim().min(1, "Enter a message.").max(8000, "Use no more than 8,000 characters."),
});

export const ChatReplySchema = z.object({ reply: z.string().trim().min(1) });

export type ChatMessageInput = z.infer<typeof ChatMessageSchema>;
export type ChatReply = z.infer<typeof ChatReplySchema>;

export type ChatMessageResult =
  | (ChatReply & { error?: never })
  | { error: string; reply?: never };
