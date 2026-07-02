import { NextRequest, NextResponse } from "next/server";export function proxy(req: NextRequest) {
  const requestId = crypto.randomUUID();
  const start = Date.now();

  const headers = new Headers(req.headers);
  headers.set("x-request-id", requestId);
  headers.set("x-start-time", String(start));

  const response = NextResponse.next({
    request: { headers },
  });

  response.headers.set("x-request-id", requestId);
  response.headers.set(
    "x-response-time",
    String(Date.now() - start)
  );

  return response;
}
