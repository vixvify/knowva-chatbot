export async function isServiceHealthy(): Promise<boolean> {
  const serviceUrl = process.env.SERVICE_URL ?? "http://127.0.0.1:8000";

  try {
    const response = await fetch(new URL("/health", serviceUrl), {
      cache: "no-store",
      signal: AbortSignal.timeout(2_000),
    });

    return response.ok;
  } catch {
    return false;
  }
}
