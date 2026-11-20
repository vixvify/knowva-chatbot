import AddRounded from "@mui/icons-material/AddRounded";
import ChatBubbleOutlineRounded from "@mui/icons-material/ChatBubbleOutlineRounded";
import HistoryRounded from "@mui/icons-material/HistoryRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Stack from "@mui/material/Stack";
import { alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import type { Conversation } from "../hooks/use-chat";
import { KnowaMark } from "./knowa-mark";

const sidebarWidth = 258;

type SidebarProps = {
  activeId?: number;
  conversations: Conversation[];
  onClose: () => void;
  onSelect: (id: number | null) => void;
  open: boolean;
};

function SidebarContent({ activeId, conversations, onSelect }: Pick<SidebarProps, "activeId" | "conversations" | "onSelect">) {
  return (
    <Stack sx={{ height: "100%", p: 2.5 }}>
      <Stack direction="row" spacing={1.25} sx={{ alignItems: "center", px: 0.75, py: 0.5, mb: 4 }}>
        <KnowaMark />
        <Typography sx={{ fontSize: 23, fontWeight: 800, letterSpacing: "-0.065em" }}>Knowa</Typography>
      </Stack>

      <Button
        variant="contained"
        disableElevation
        startIcon={<AddRounded />}
        onClick={() => onSelect(null)}
        sx={{ justifyContent: "flex-start", borderRadius: 2.75, minHeight: 44, px: 1.75 }}
      >
        New chat
      </Button>

      <Box component="nav" aria-label="Recent chats" sx={{ mt: 4, minHeight: 0, overflowY: "auto", px: 0.25 }}>
        <Stack direction="row" spacing={0.9} sx={{ alignItems: "center", px: 1, mb: 1 }}>
          <HistoryRounded sx={{ fontSize: 16, color: "text.secondary" }} />
          <Typography component="h2" sx={{ color: "text.secondary", fontSize: 12, fontWeight: 800 }}>
            Recent chats
          </Typography>
        </Stack>
        {conversations.length === 0 ? (
          <Typography sx={{ px: 1, py: 0.75, color: "text.secondary", fontSize: 13, lineHeight: 1.7 }}>
            Your chats will appear here.
          </Typography>
        ) : (
          <List disablePadding>
            {conversations.map(({ id, title }) => (
              <ListItem key={id} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  selected={activeId === id}
                  aria-current={activeId === id ? "true" : undefined}
                  onClick={() => onSelect(id)}
                  sx={{ gap: 1, px: 1, borderRadius: 2 }}
                >
                  <ChatBubbleOutlineRounded sx={{ fontSize: 16, color: "text.secondary" }} />
                  <Typography noWrap sx={{ fontSize: 13, fontWeight: 700 }}>{title}</Typography>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Stack>
  );
}

export function ChatSidebar({ activeId, conversations, onClose, onSelect, open }: SidebarProps) {
  const content = <SidebarContent activeId={activeId} conversations={conversations} onSelect={onSelect} />;
  const surface = { width: sidebarWidth, bgcolor: "#1b1624", backgroundImage: "none" };

  return (
    <>
      <Box
        component="aside"
        sx={{ ...surface, display: { xs: "none", md: "block" }, flexShrink: 0, borderRight: 1, borderRightColor: (theme) => alpha(theme.palette.divider, 0.75) }}
      >
        {content}
      </Box>
      <Drawer
        open={open}
        onClose={onClose}
        sx={{ display: { xs: "block", md: "none" } }}
        slotProps={{ paper: { sx: surface, role: "dialog", "aria-modal": true, "aria-label": "Chat history" } }}
      >
        {content}
      </Drawer>
    </>
  );
}
