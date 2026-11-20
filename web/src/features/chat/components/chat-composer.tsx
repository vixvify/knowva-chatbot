import ArrowUpwardRounded from "@mui/icons-material/ArrowUpwardRounded";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import type { Ref } from "react";

type ComposerProps = {
  draft: string;
  pending: boolean;
  inputRef: Ref<HTMLTextAreaElement>;
  onChange: (draft: string) => void;
  onSend: () => void;
};

export function ChatComposer({ draft, pending, inputRef, onChange, onSend }: ComposerProps) {
  return (
    <Box component="footer" sx={{ flexShrink: 0, bgcolor: "background.default", px: { xs: 2, sm: 3 }, pt: 1.5, pb: "max(16px, env(safe-area-inset-bottom))" }}>
      <Box sx={{ width: "100%", maxWidth: 720, mx: "auto" }}>
        <Paper
          component="form"
          elevation={0}
          onSubmit={(event) => {
            event.preventDefault();
            onSend();
          }}
          sx={{
            display: "flex",
            alignItems: "flex-end",
            gap: 1.25,
            p: 1.125,
            pl: 2,
            minHeight: 62,
            border: 1,
            borderColor: "divider",
            borderRadius: 4,
            boxShadow: "0 7px 26px #00000038",
            "&:focus-within": { borderColor: "primary.main", boxShadow: "0 0 0 3px #b998ff24" },
          }}
        >
          <InputBase
            multiline
            fullWidth
            maxRows={6}
            inputRef={inputRef}
            inputProps={{ "aria-label": "Message Knowa" }}
            placeholder="Message Knowa…"
            value={draft}
            onChange={(event) => onChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
                event.preventDefault();
                onSend();
              }
            }}
            sx={{ alignSelf: "center", fontSize: 14, lineHeight: 1.6, py: 0.75, "& textarea::placeholder": { color: "text.secondary", opacity: 1 } }}
          />
          <Tooltip title="Send message" disableInteractive>
            <span>
              <IconButton
                type="submit"
                aria-label="Send message"
                disabled={pending || !draft.trim()}
                sx={{
                  width: 42,
                  height: 42,
                  borderRadius: 2.75,
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                  "&:hover": { bgcolor: "primary.dark" },
                  "&.Mui-disabled": { bgcolor: "#352949", color: "#bcabd8" },
                }}
              >
                <ArrowUpwardRounded sx={{ fontSize: 20 }} />
              </IconButton>
            </span>
          </Tooltip>
        </Paper>
        <Typography sx={{ color: "text.secondary", fontSize: 11, textAlign: "center", mt: 1.5 }}>
          Messages aren’t saved.
        </Typography>
      </Box>
    </Box>
  );
}
