import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useEffect, useRef } from "react";
import { KnowaMark } from "./knowa-mark";

export function ChatThread({ messages }: { messages: string[] }) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "nearest" });
  }, [messages]);

  return (
    <Stack aria-label="Conversation" role="log" sx={{ width: "100%", maxWidth: 720, mx: "auto", py: { xs: 3, sm: 5 }, gap: 3 }}>
      {messages.map((message, index) => (
        <Box key={index} sx={{ alignSelf: "flex-end", width: "fit-content", maxWidth: "88%", bgcolor: "#36264d", px: 2, py: 1.25, borderRadius: "16px 16px 4px 16px" }}>
          <Typography component="p" sx={{ fontSize: 14, lineHeight: 1.7, whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>
            {message}
          </Typography>
        </Box>
      ))}
      <Stack direction="row" spacing={1.25} sx={{ alignItems: "flex-start" }}>
        <KnowaMark size={30} />
        <Box sx={{ pt: 0.25 }}>
          <Typography sx={{ fontSize: 13, fontWeight: 800 }}>Knowa</Typography>
          <Typography sx={{ color: "text.secondary", mt: 0.5, fontSize: 14, lineHeight: 1.6 }}>
            AI replies will appear here once a model is connected.
          </Typography>
        </Box>
      </Stack>
      <Box ref={endRef} />
    </Stack>
  );
}
