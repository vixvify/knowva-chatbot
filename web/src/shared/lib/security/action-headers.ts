import "server-only";

import { headers } from "next/headers";
import { config } from "@/shared/config/runtime";
import { checkOrigin } from "./origin";

export async function getActionHeaders() {
  const incoming = new Headers(await headers());
  checkOrigin(new Request(config.authUrl, { method: "POST", headers: incoming }));
  return incoming;
}
