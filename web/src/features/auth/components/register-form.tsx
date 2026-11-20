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
import { RegisterSchema, type RegisterInput } from "../auth.schema";
import { signUp } from "../server/auth.actions";
import { AuthFormHeading } from "./auth-form-heading";

export function RegisterForm() {
  const [error, setError] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterInput>({
    resolver: zodResolver(RegisterSchema),
    mode: "onTouched",
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  async function onSubmit(input: RegisterInput) {
    setError("");
    const result = await signUp(input);
    if (result) setError(result.error);
  }

  return (
    <>
      <AuthFormHeading title="Create your account" description="Join Knowa and explore computer science." />
      <Stack component="form" noValidate spacing={2} onSubmit={handleSubmit(onSubmit)}>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField {...register("name")} label="Name" autoComplete="name" error={!!errors.name} helperText={errors.name?.message} />
        <TextField {...register("email")} label="Email" type="email" autoComplete="email" error={!!errors.email} helperText={errors.email?.message} />
        <TextField {...register("password")} label="Password" type="password" autoComplete="new-password" error={!!errors.password} helperText={errors.password?.message ?? "8+ characters, with uppercase, lowercase, and a number."} />
        <TextField {...register("confirmPassword")} label="Confirm password" type="password" autoComplete="new-password" error={!!errors.confirmPassword} helperText={errors.confirmPassword?.message} />
        <Button type="submit" variant="contained" size="large" disabled={isSubmitting}>Create account</Button>
        <Typography sx={{ color: "text.secondary", textAlign: "center", fontSize: 14 }}>
          Already have an account? <Link href="/login">Sign in</Link>
        </Typography>
      </Stack>
    </>
  );
}
