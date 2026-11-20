import SearchOffRounded from "@mui/icons-material/SearchOffRounded";
import Button from "@mui/material/Button";
import { RouteStatus } from "@/shared/components/layout/route-status";

export default function NotFound() {
  return (
    <RouteStatus
      icon={<SearchOffRounded />}
      title="Page not found"
      description="This address doesn’t match a page on Knowa."
    >
      <Button href="/" variant="contained" disableElevation>Back to chat</Button>
    </RouteStatus>
  );
}
