import MenuRounded from "@mui/icons-material/MenuRounded";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import type { ReactNode } from "react";

export function ChatHeader({ authActions, onOpenMenu, title }: { authActions: ReactNode; onOpenMenu: () => void; title?: string }) {
  return (
    <Stack
      component="header"
      direction="row"
      spacing={1.25}
      sx={{ height: 66, flexShrink: 0, alignItems: "center", px: { xs: 1.5, md: 3.75 }, borderBottom: 1, borderColor: "divider", bgcolor: "background.default" }}
    >
      <IconButton aria-label="Open chat history" onClick={onOpenMenu} sx={{ display: { md: "none" } }}>
        <MenuRounded />
      </IconButton>
      <Typography noWrap sx={{ fontSize: 14, fontWeight: 800, flex: 1 }}>{title ?? "New chat"}</Typography>
      {authActions}
    </Stack>
  );
}
