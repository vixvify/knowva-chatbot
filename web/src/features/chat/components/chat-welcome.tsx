import AccountTreeOutlined from "@mui/icons-material/AccountTreeOutlined";
import ArrowUpwardRounded from "@mui/icons-material/ArrowUpwardRounded";
import MemoryOutlined from "@mui/icons-material/MemoryOutlined";
import RouteOutlined from "@mui/icons-material/RouteOutlined";
import StorageOutlined from "@mui/icons-material/StorageOutlined";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { KnowaMark } from "./knowa-mark";

const prompts = [
  { title: "Algorithms", detail: "How does binary search work?", icon: RouteOutlined, color: "#d2b7ff", background: "#34234d" },
  { title: "Data structures", detail: "When should I use a stack or a queue?", icon: AccountTreeOutlined, color: "#abcaff", background: "#222f49" },
  { title: "Operating systems", detail: "How are processes and threads different?", icon: MemoryOutlined, color: "#f2c590", background: "#3e2e25" },
  { title: "Databases", detail: "How does an index speed up a SQL query?", icon: StorageOutlined, color: "#9bdec5", background: "#203933" },
];

export function ChatWelcome({ onPrompt }: { onPrompt: (prompt: string) => void }) {
  return (
    <Stack sx={{ width: "100%", maxWidth: 720, minHeight: "100%", mx: "auto", justifyContent: "center", py: { xs: 4, md: 5 } }}>
      <Stack sx={{ alignItems: "center", textAlign: "center", mb: { xs: 3.5, md: 5 } }}>
        <Box
          sx={{
            width: 110,
            height: 110,
            display: "grid",
            placeItems: "center",
            mb: 1.25,
            borderRadius: "50%",
            background: "radial-gradient(circle, #7548d86b 9%, #7548d82a 52%, transparent 72%)",
          }}
        >
          <KnowaMark size={58} />
        </Box>
        <Typography
          component="h1"
          sx={{ fontFamily: '"Fraunces Variable", Georgia, serif', fontSize: "clamp(2.25rem, 5vw, 3.85rem)", fontWeight: 500, letterSpacing: "-0.04em", lineHeight: 1.06 }}
        >
          What’s on your mind?
        </Typography>
        <Typography sx={{ color: "text.secondary", mt: 1.75, fontSize: { xs: 14, sm: 15 }, maxWidth: 420, lineHeight: 1.65 }}>
          Ask a question, explore an idea, or start with a prompt below.
        </Typography>
      </Stack>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" }, gap: 1.5 }}>
        {prompts.map(({ title, detail, icon: Icon, color, background }) => (
          <ButtonBase
            key={title}
            onClick={() => onPrompt(detail)}
            sx={{
              justifyContent: "flex-start",
              textAlign: "left",
              gap: 1.5,
              p: 1.5,
              minHeight: 72,
              border: 1,
              borderColor: "divider",
              borderRadius: 3,
              bgcolor: "background.paper",
              transition: "background-color 150ms, border-color 150ms",
              "&:hover": { bgcolor: "#2b2239", borderColor: "#79639b" },
            }}
          >
            <Box sx={{ display: "grid", placeItems: "center", bgcolor: background, color, width: 38, height: 38, flexShrink: 0, borderRadius: 2.5 }}>
              <Icon sx={{ fontSize: 19 }} />
            </Box>
            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography sx={{ fontSize: 13, fontWeight: 800 }}>{title}</Typography>
              <Typography sx={{ mt: 0.25, color: "text.secondary", fontSize: 12, lineHeight: 1.45 }}>{detail}</Typography>
            </Box>
            <ArrowUpwardRounded sx={{ color: "text.secondary", fontSize: 15, transform: "rotate(45deg)", flexShrink: 0 }} />
          </ButtonBase>
        ))}
      </Box>
    </Stack>
  );
}
