"use client";

import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import type { ReactNode } from "react";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#b998ff", light: "#dbc6ff", dark: "#a482ec", contrastText: "#201331" },
    background: { default: "#14111a", paper: "#211b2b" },
    divider: "#3a3049",
    text: { primary: "#f5efff", secondary: "#bdb2ce" },
  },
  typography: {
    fontFamily: '"Manrope Variable", system-ui, sans-serif',
    button: { textTransform: "none", fontWeight: 800 },
  },
  components: {
    MuiButtonBase: {
      styleOverrides: {
        root: {
          "&.Mui-focusVisible": { outline: "2px solid #b998ff", outlineOffset: 2 },
        },
      },
    },
  },
});

export function AppThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      {children}
    </ThemeProvider>
  );
}
