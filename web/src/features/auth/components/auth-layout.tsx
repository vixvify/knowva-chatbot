import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import type { ReactNode } from "react";
import { KnowaMark } from "@/features/chat/components/knowa-mark";

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <Box component="main" sx={{ minHeight: "100dvh", display: "grid", placeItems: "center", px: 2, py: 5, background: "radial-gradient(ellipse at 50% 0%, #261b38, transparent 60%)" }}>
      <Paper elevation={0} sx={{ width: "100%", maxWidth: 456, p: { xs: 3, sm: 4.5 }, border: 1, borderColor: "divider", borderRadius: 4 }}>
        <Stack direction="row" sx={{ mb: 3.5 }}>
          <Link href="/" aria-label="Knowa home" style={{ display: "inline-flex" }}><KnowaMark size={42} /></Link>
        </Stack>
        {children}
      </Paper>
    </Box>
  );
}
