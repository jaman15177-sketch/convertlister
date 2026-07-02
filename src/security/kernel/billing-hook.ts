import { trackUsage } from "@/billing/engine/billing-core";

export async function applyBilling(ctx: any) {
  await trackUsage(ctx.userId, "api_call", 1);
}
