import { headers } from "next/headers";
import { AuthActions } from "@/features/auth/components/auth-actions";
import { getUser } from "@/features/auth/server/auth-check";
import { ChatWorkspace } from "@/features/chat/components/chat-workspace";

export default async function Home() {
  const user = await getUser(new Headers(await headers()));
  return <ChatWorkspace authActions={<AuthActions userName={user?.name} />} />;
}
