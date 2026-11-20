import { isServiceHealthy } from "@/shared/api/health";

export async function GET() {
  const connected = await isServiceHealthy();
  return Response.json(
    { status: connected ? "ok" : "unavailable" },
    { status: connected ? 200 : 503 },
  );
}
