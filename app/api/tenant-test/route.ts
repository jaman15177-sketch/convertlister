import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const tenantId = req.headers.get("x-tenant-id");

  if (!tenantId) {
    return NextResponse.json(
      {
        success: false,
        error: "TENANT_ID_MISSING",
      },
      { status: 400 }
    );
  }

  return NextResponse.json({
    success: true,
    tenantId,
  });
}
