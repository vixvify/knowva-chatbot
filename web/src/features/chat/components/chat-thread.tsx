import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useEffect, useRef } from "react";
import type { ChatMessage } from "../hooks/use-chat";
import { KnowaMark } from "./knowa-mark";

export function ChatThread({ messages }: { messages: ChatMessage[] }) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "nearest" });
  }, [messages]);

  return (
    <Stack aria-label="Conversation" role="log" sx={{ width: "100%", maxWidth: 720, mx: "auto", py: { xs: 3, sm: 5 }, gap: 3 }}>
      {messages.map(({ id, text, result }) => (
        <Stack key={id} spacing={2.5}>
          <Box sx={{ alignSelf: "flex-end", width: "fit-content", maxWidth: "88%", bgcolor: "#36264d", px: 2, py: 1.25, borderRadius: "16px 16px 4px 16px" }}>
            <Typography sx={{ fontSize: 14, lineHeight: 1.7, whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>{text}</Typography>
          </Box>
          <Stack direction="row" spacing={1.25} sx={{ alignItems: "flex-start" }}>
            <KnowaMark size={30} />
            <Box sx={{ pt: 0.25, minWidth: 0 }}>
              <Typography sx={{ fontSize: 13, fontWeight: 800 }}>Knowa</Typography>
              <Typography sx={{ color: "text.secondary", mt: 0.5, fontSize: 14, lineHeight: 1.6, whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>
                {result?.reply ?? result?.error ?? "Waiting for a reply…"}
              </Typography>
            </Box>
          </Stack>
        </Stack>
      ))}
      <Box ref={endRef} />
    </Stack>
  );
}
