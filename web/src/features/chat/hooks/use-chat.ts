import { useRef, useState } from "react";

export type Conversation = {
  id: number;
  title: string;
  messages: string[];
};

export function useChat() {
  const nextId = useRef(1);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [draft, setDraft] = useState("");
  const activeChat = conversations.find((conversation) => conversation.id === activeId);

  function selectChat(id: number | null) {
    if (id !== null && id === activeId) return;

    setActiveId(id);
    setDraft("");
  }

  function sendMessage() {
    const message = draft.trim();
    if (!message) return;

    if (activeChat) {
      const updated = { ...activeChat, messages: [...activeChat.messages, message] };
      setConversations((current) => [updated, ...current.filter(({ id }) => id !== updated.id)]);
    } else {
      const id = nextId.current++;
      const title = message.replace(/\s+/g, " ");
      setConversations((current) => [{ id, title, messages: [message] }, ...current]);
      setActiveId(id);
    }

    setDraft("");
  }

  return { activeChat, conversations, draft, selectChat, setDraft, sendMessage };
}
