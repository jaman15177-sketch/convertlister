import { getRedis } from "@/lib/redis";

const SESSION_PREFIX = "iam:session:";

export async function getSession(sessionId: string) {
  const redis = getRedis();
  if (!redis) return null;

  if (!sessionId) return null;

  const raw = await redis.get(`${SESSION_PREFIX}${sessionId}`);

  if (!raw) return null;

  try {
    return typeof raw === "string" ? JSON.parse(raw) : raw;
  } catch {
    return null;
  }
}

export async function validateSession(sessionId: string): Promise<boolean> {
  const session = await getSession(sessionId);
  return !!session;
}

export async function createSession(
  sessionId: string,
  payload: any,
  ttlSeconds = 86400
) {
  const redis = getRedis();
  if (!redis) return false;

  // ✅ Upstash correct format
  await redis.set(`${SESSION_PREFIX}${sessionId}`, payload, {
    ex: ttlSeconds,
  });

  return true;
}

export async function revokeSession(sessionId: string) {
  const redis = getRedis();
  if (!redis) return;

  await redis.del(`${SESSION_PREFIX}${sessionId}`);
}
