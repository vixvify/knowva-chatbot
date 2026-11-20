import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function Loading() {
  return (
    <Stack component="main" sx={{ minHeight: "100dvh", px: { xs: 2, sm: 3 }, py: 3, justifyContent: "center", alignItems: "center" }}>
      <Stack role="status" sx={{ width: "100%", maxWidth: 720, alignItems: "center" }}>
        <Skeleton aria-hidden="true" variant="rounded" width={58} height={58} sx={{ borderRadius: 3.5, mb: 3 }} />
        <Typography sx={{ mb: 2.5, color: "text.secondary", fontSize: 14 }}>Loading Knowa…</Typography>
        <Box aria-hidden="true" sx={{ display: "grid", width: "100%", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" }, gap: 1.5 }}>
          {[1, 2, 3, 4].map((slot) => (
            <Skeleton key={slot} variant="rounded" height={72} sx={{ borderRadius: 3 }} />
          ))}
        </Box>
      </Stack>
    </Stack>
  );
}
