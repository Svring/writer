import { getPayload } from "payload";
import config from "@/payload.config";
import type { User } from "@/payload-types";

export async function getUserFromHeaders(
  headers: Headers
): Promise<(User & { collection: "users" }) | null> {
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });
  const { user } = await payload.auth({ headers });
  return user;
}
