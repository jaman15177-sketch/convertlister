import { NextRequest, NextResponse } from "next/server";

export function tenantGuard(req: NextRequest) {
  const tenantId = req.headers.get("x-tenant-id");

  if (!tenantId) {
    return new NextResponse("Missing tenant", { status: 400 });
  }

  // attach tenant context (optional)
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-tenant-id", tenantId);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
