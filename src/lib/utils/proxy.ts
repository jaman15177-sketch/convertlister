// src/proxy.ts

export type GatewayContext = {
  requestId: string;
  user: {
    id: string;
  } | null;
  orgId: string | null;
};

export async function proxy({
  req,
}: {
  req: Request;
}): Promise<GatewayContext> {
  // =========================
  // REQUEST ID
  // =========================
  const requestId = crypto.randomUUID();

  // =========================
  // AUTH (TEMP STUB)
  // Replace later with real authGuard
  // =========================
  const user = {
    id: "mock-user-id",
  };

  // =========================
  // ORG RESOLUTION (TEMP STUB)
  // =========================
  const orgId = "mock-org-id";

  // =========================
  // RETURN CONTEXT
  // =========================
  return {
    requestId,
    user,
    orgId,
  };
}
