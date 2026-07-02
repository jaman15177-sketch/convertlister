import type { NextRequest } from "next/server";
import crypto from "crypto";

import { getCurrentUser } from "@/lib/auth/get-current-user";

export type IdentityV3 = {
  userId: string;
  organizationId: string;
  role: string;
  sessionId: string;
  device: {
    ip: string;
    userAgent: string;
    fingerprint: string;
  };
  riskScore: number;
};

export async function buildIdentityV3(
  req: Request | NextRequest
): Promise<IdentityV3> {
  const user = await getCurrentUser(req);

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";

  const userAgent =
    req.headers.get("user-agent") ?? "unknown";

  const fingerprint = crypto
    .createHash("sha256")
    .update(`${ip}|${userAgent}`)
    .digest("hex");

  return {
    userId: user.id,
    organizationId: user.organizationId,
    role: user.role,

    // Replace with a persisted session ID if you later implement one.
    sessionId: "supabase-session",

    device: {
      ip,
      userAgent,
      fingerprint,
    },

    riskScore: 0,
  };
}
