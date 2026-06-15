const store = new Map<string, { count: number; ts: number }>();

export async function rateLimitGuard(ctx: any, routeKey: string) {
  const key = `${ctx.ip}:${routeKey}`;
  const now = Date.now();

  const existing = store.get(key);

  if (!existing || now - existing.ts > 60000) {
    store.set(key, { count: 1, ts: now });
    return true;
  }

  if (existing.count > 100) {
    return new Response("Rate limit exceeded", { status: 429 });
  }

  existing.count++;
  return true;
}
