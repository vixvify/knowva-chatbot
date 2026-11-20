import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { signOut } from "../server/auth.actions";

export function AuthActions({ userName }: { userName?: string }) {
  return (
    <Stack direction="row" sx={{ ml: "auto", alignItems: "center", gap: 1, flexShrink: 0 }}>
      {userName ? (
        <>
          <Typography noWrap sx={{ display: { xs: "none", sm: "block" }, maxWidth: 140, fontSize: 13 }}>{userName}</Typography>
          <form action={signOut}><Button type="submit" size="small">Sign out</Button></form>
        </>
      ) : (
        <>
          <Button href="/login" size="small">Sign in</Button>
          <Button href="/register" size="small" variant="outlined" sx={{ display: { xs: "none", sm: "inline-flex" } }}>Create account</Button>
        </>
      )}
    </Stack>
  );
}
