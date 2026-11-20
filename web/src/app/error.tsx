"use client";

import ErrorOutlineRounded from "@mui/icons-material/ErrorOutlineRounded";
import Button from "@mui/material/Button";
import { RouteStatus } from "@/shared/components/layout/route-status";

export default function ErrorPage() {
  return (
    <RouteStatus
      icon={<ErrorOutlineRounded />}
      title="Something went wrong"
      description="Knowa couldn’t load this page. Try again or return to the chat."
    >
      <Button
        variant="contained"
        disableElevation
        onClick={() => window.location.reload()}
      >
        Try again
      </Button>
      <Button href="/" variant="outlined">Back to chat</Button>
    </RouteStatus>
  );
}
