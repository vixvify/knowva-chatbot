"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LoginSchema, type LoginInput } from "../auth.schema";
import { signIn } from "../server/auth.actions";
import { AuthFormHeading } from "./auth-form-heading";

export function LoginForm({ registered }: { registered: boolean }) {
  const [error, setError] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
    mode: "onTouched",
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(input: LoginInput) {
    setError("");
    const result = await signIn(input);
    if (result) setError(result.error);
  }

  return (
    <>
      <AuthFormHeading title="Welcome back" description="Sign in to your Knowa account." />
      <Stack component="form" noValidate spacing={2} onSubmit={handleSubmit(onSubmit)}>
        {error ? <Alert severity="error">{error}</Alert> : registered ? <Alert severity="success">Account created. You can sign in now.</Alert> : null}
        <TextField {...register("email")} label="Email" type="email" autoComplete="email" error={!!errors.email} helperText={errors.email?.message} />
        <TextField {...register("password")} label="Password" type="password" autoComplete="current-password" error={!!errors.password} helperText={errors.password?.message} />
        <Button type="submit" variant="contained" size="large" disabled={isSubmitting}>Sign in</Button>
        <Typography sx={{ color: "text.secondary", textAlign: "center", fontSize: 14 }}>
          New to Knowa? <Link href="/register">Create an account</Link>
        </Typography>
      </Stack>
    </>
  );
}
