import { useRef, useState } from "react";
import type { ChatMessageResult } from "../chat.schema";
import { sendChatMessage } from "../server/chat.actions";

export type ChatMessage = {
  id: number;
  text: string;
  result?: ChatMessageResult;
};

export type Conversation = {
  id: number;
  title: string;
  messages: ChatMessage[];
};

export function useChat() {
  const nextId = useRef(1);
  const sending = useRef(false);
  const [pending, setPending] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [draft, setDraft] = useState("");
  const activeChat = conversations.find((conversation) => conversation.id === activeId);

  function selectChat(id: number | null) {
    if (id !== null && id === activeId) return;

    setActiveId(id);
    setDraft("");
  }

  async function sendMessage() {
    const text = draft.trim();
    if (!text || sending.current) return;

    sending.current = true;
    setPending(true);
    const conversationId = activeChat?.id ?? nextId.current++;
    const message = { id: nextId.current++, text };
    const updated = {
      id: conversationId,
      title: activeChat?.title ?? text.replace(/\s+/g, " "),
      messages: [...(activeChat?.messages ?? []), message],
    };
    setConversations((current) => [updated, ...current.filter(({ id }) => id !== conversationId)]);
    setActiveId(conversationId);
    setDraft("");

    let result: ChatMessageResult;
    try {
      result = await sendChatMessage({ message: text });
    } catch {
      result = { error: "Could not send your message. Try again." };
    } finally {
      sending.current = false;
      setPending(false);
    }
    setConversations((current) => current.map((conversation) => conversation.id === conversationId
      ? { ...conversation, messages: conversation.messages.map((item) => item.id === message.id ? { ...item, result } : item) }
      : conversation));
  }

  return { activeChat, conversations, draft, pending, selectChat, setDraft, sendMessage };
}
