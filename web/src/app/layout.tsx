import "@fontsource-variable/fraunces";
import "@fontsource-variable/manrope";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AppThemeProvider } from "@/shared/components/layout/app-theme-provider";

export const metadata: Metadata = {
  title: "Knowa",
  description: "A chat workspace for questions, ideas, and writing.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <AppThemeProvider>{children}</AppThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
