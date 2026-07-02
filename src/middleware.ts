import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = [
  "/api/auth",
  "/api/env-check",
  "/api/debug-auth",
  "/api/debug-signup",
];

function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some((route) => pathname.startsWith(route));
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  // Protect only API routes
  if (pathname.startsWith("/api")) {
    const authorization = req.headers.get("authorization");

    if (!authorization) {
      return NextResponse.json(
        {
          success: false,
          code: "MISSING_AUTHORIZATION",
          message: "Authorization header is required",
        },
        { status: 401 }
      );
    }

    if (!authorization.startsWith("Bearer ")) {
      return NextResponse.json(
        {
          success: false,
          code: "INVALID_AUTHORIZATION",
          message: "Authorization header must use Bearer token",
        },
        { status: 401 }
      );
    }

    const token = authorization.slice(7).trim();

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          code: "EMPTY_TOKEN",
          message: "Access token is missing",
        },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
