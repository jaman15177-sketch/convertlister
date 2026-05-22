import { NextRequest, NextResponse } from "next/server";

export type Role = "admin" | "user" | "system";

export function roleGuard(allowedRoles: Role[]) {
  return (req: NextRequest) => {
    const role = req.headers.get("x-role") as Role | null;

    if (!role || !allowedRoles.includes(role)) {
      return NextResponse.json(
        { success: false, message: "Forbidden" },
        { status: 403 }
      );
    }

    return NextResponse.next();
  };
}
