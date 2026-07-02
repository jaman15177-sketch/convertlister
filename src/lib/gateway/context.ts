import crypto from "crypto";
import type { GatewayContext } from "./types";

export async function createGatewayContext(): Promise<GatewayContext> {
  return {
    requestId: crypto.randomUUID(),

    user: {
      id: "user_demo_123",
    },

    org: {
      id: "org_demo_123",
      plan: "pro",
      credits: 100,
    },
  };
}
