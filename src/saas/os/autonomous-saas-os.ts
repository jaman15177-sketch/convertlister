import {
  trackUsage,
  getUsage,
  calculateRevenue,
} from "@/billing/engine/billing-core";

export type SaaSDecision =
  | "ALLOW"
  | "LIMIT"
  | "UPGRADE"
  | "BLOCK";

export async function autonomousSaaSOS(
  input: {
    userId: string;
    feature: string;
    cost?: number;
  }
) {
  const {
    userId,
    feature,
    cost = 1,
  } = input;

  await trackUsage(
    userId,
    feature,
    cost
  );

  const usage =
    await getUsage(userId);

  const revenue =
    await calculateRevenue(
      userId
    );

  const totalUsage =
    Object.values(usage).reduce(
      (a, b) => a + b,
      0
    );

  let decision: SaaSDecision =
    "ALLOW";

  if (totalUsage > 5000) {
    decision = "BLOCK";
  } else if (totalUsage > 2000) {
    decision = "LIMIT";
  } else if (
    revenue.revenue > 100
  ) {
    decision = "UPGRADE";
  }

  return {
    userId,
    feature,
    usage,
    revenue,
    decision,
  };
}
