import { NextRequest, NextResponse } from "next/server";
export function observabilityMiddleware(req: NextRequest) {
  const start = Date.now();

  const requestId = crypto.randomUUID();

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-request-id", requestId);
  requestHeaders.set("x-start-time", start.toString());

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.headers.set("x-request-id", requestId);
  response.headers.set("x-start-time", start.toString());

  return response;
}
