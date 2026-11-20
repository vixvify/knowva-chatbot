import AutoAwesomeRounded from "@mui/icons-material/AutoAwesomeRounded";
import Box from "@mui/material/Box";

export function KnowaMark({ size = 36 }: { size?: number }) {
  return (
    <Box
      aria-hidden="true"
      sx={{
        display: "grid",
        placeItems: "center",
        width: size,
        height: size,
        flexShrink: 0,
        borderRadius: `${Math.round(size * 0.27)}px`,
        background: "linear-gradient(150deg, #9466ef 0%, #7548d8 45%, #5630ad 100%)",
        boxShadow: "inset 0 0 0 1px #ffffff32, 0 5px 13px #653cc734",
        color: "#fff",
      }}
    >
      <AutoAwesomeRounded sx={{ fontSize: Math.round(size * 0.54) }} />
    </Box>
  );
}
