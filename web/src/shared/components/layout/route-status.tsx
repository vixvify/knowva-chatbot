import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { ReactNode } from "react";

type RouteStatusProps = {
  icon: ReactNode;
  title: string;
  description: string;
  children: ReactNode;
};

export function RouteStatus({ icon, title, description, children }: RouteStatusProps) {
  return (
    <Box component="main" sx={{ minHeight: "100dvh", display: "grid", placeItems: "center", px: 2, py: 5 }}>
      <Paper elevation={0} sx={{ width: "100%", maxWidth: 490, p: { xs: 3, sm: 5 }, border: 1, borderColor: "divider", borderRadius: 4, textAlign: "center" }}>
        <Box sx={{ display: "grid", placeItems: "center", width: 52, height: 52, mx: "auto", mb: 2.5, bgcolor: "#34234d", color: "primary.light", borderRadius: 3 }}>
          {icon}
        </Box>
        <Typography component="h1" sx={{ fontFamily: '"Fraunces Variable", Georgia, serif', fontSize: { xs: 32, sm: 38 }, lineHeight: 1.1 }}>
          {title}
        </Typography>
        <Typography sx={{ mt: 1.5, color: "text.secondary", fontSize: 14 }}>{description}</Typography>
        <Stack direction="row" sx={{ justifyContent: "center", flexWrap: "wrap", gap: 1.25, mt: 3 }}>
          {children}
        </Stack>
      </Paper>
    </Box>
  );
}
