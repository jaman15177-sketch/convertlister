import { NextResponse } from "next/server";

type GatewayOptions = {
  req: Request;
  requireAuth?: boolean;
  enableRateLimit?: boolean;
  enableBilling?: boolean;
};

export async function gateway(options: GatewayOptions) {
  const { req } = options;

  const requestId = crypto.randomUUID();

  // clone headers
  const headers = new Headers(req.headers);
  headers.set("x-request-id", requestId);

  // 🔐 AUTH CHECK
  if (options.requireAuth) {
    const auth = req.headers.get("authorization");

    if (!auth) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }
  }

  // ❗ IMPORTANT: always return SAME SHAPE
  return {
    request: new Request(req, { headers }),
    requestId,
    blocked: false,
  };
}
