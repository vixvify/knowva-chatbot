import "server-only";

import { AuthAdapter } from "@/features/auth/server/auth.adapter";
import { AuthService } from "@/features/auth/server/auth.service";
import { FastApiChatRepository } from "@/features/chat/server/chat.repository";
import { ChatService } from "@/features/chat/server/chat.service";

export const authService = new AuthService(new AuthAdapter());
export const chatService = new ChatService(new FastApiChatRepository());
