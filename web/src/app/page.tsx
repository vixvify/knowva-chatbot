import { isServiceHealthy } from "@/shared/api/health";

export const dynamic = "force-dynamic";

export default async function Home() {
  const isHealthy = await isServiceHealthy();

  return (
    <main>
      <h1>Knowa</h1>
      <p>API status: {isHealthy ? "Connected" : "Unavailable"}</p>
    </main>
  );
}
