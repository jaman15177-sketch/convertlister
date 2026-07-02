import { createClient } from "redis";

const redis = createClient({
  url: process.env.REDIS_URL,
});

redis.connect();

export async function validateSession(sessionId: string) {
  if (!sessionId || sessionId === "no-session") {
    return false;
  }

  const session = await redis.get(`session:${sessionId}`);

  return session === "active";
}
