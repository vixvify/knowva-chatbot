"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useRef, useState } from "react";
import { ChatComposer } from "@/features/chat/components/chat-composer";
import { ChatHeader } from "@/features/chat/components/chat-header";
import { ChatSidebar } from "@/features/chat/components/chat-sidebar";
import { ChatThread } from "@/features/chat/components/chat-thread";
import { ChatWelcome } from "@/features/chat/components/chat-welcome";
import { useChat } from "@/features/chat/hooks/use-chat";

export default function Home() {
  const { activeChat, conversations, draft, selectChat, setDraft, sendMessage } = useChat();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const composerRef = useRef<HTMLTextAreaElement>(null);

  return (
    <Stack direction="row" sx={{ height: "100dvh", overflow: "hidden" }}>
      <ChatSidebar
        activeId={activeChat?.id}
        conversations={conversations}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onSelect={(id) => {
          selectChat(id);
          setSidebarOpen(false);
        }}
      />
      <Stack component="main" sx={{ flex: 1, minWidth: 0, minHeight: 0 }}>
        <ChatHeader title={activeChat?.title} onOpenMenu={() => setSidebarOpen(true)} />
        <Box sx={{ flex: 1, minHeight: 0, overflowY: "auto", px: { xs: 2, sm: 3 } }}>
          {activeChat ? (
            <ChatThread messages={activeChat.messages} />
          ) : (
            <ChatWelcome onPrompt={(prompt) => {
              setDraft(prompt);
              composerRef.current?.focus();
            }} />
          )}
        </Box>
        <ChatComposer
          draft={draft}
          inputRef={composerRef}
          onChange={setDraft}
          onSend={() => {
            sendMessage();
            composerRef.current?.focus();
          }}
        />
      </Stack>
    </Stack>
  );
}
