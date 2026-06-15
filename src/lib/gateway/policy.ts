import { GatewayContext } from "./types";

export function authGuard(ctx: Partial<GatewayContext>) {
  if (!ctx.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

export function billingGuard(ctx: GatewayContext) {
  if (ctx.org.credits <= 0) {
    return Response.json({ error: "Out of credits" }, { status: 402 });
  }
  return null;
}

export function rateLimitGuard() {
  // simplified stub (replace with redis later)
  return null;
}
