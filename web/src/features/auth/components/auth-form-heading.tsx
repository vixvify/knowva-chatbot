import Typography from "@mui/material/Typography";

export function AuthFormHeading({ title, description }: { title: string; description: string }) {
  return (
    <>
      <Typography component="h1" sx={{ fontFamily: '"Fraunces Variable", Georgia, serif', fontSize: { xs: 33, sm: 39 }, lineHeight: 1.1, letterSpacing: "-0.035em" }}>
        {title}
      </Typography>
      <Typography sx={{ mt: 1, mb: 3.5, color: "text.secondary", fontSize: 14 }}>{description}</Typography>
    </>
  );
}
