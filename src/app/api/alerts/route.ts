import { NextResponse } from "next/server";
import { runSecurityKernel } from "@/security/kernel/security-kernel-runner";

type AlertPayload = {
  score?: number;
  message?: string;
};

export async function POST(req: Request) {
  try {
    // 🔐 SECURITY LAYER (ADD ONLY - NOT REPLACE)
    const security = await runSecurityKernel(req);

    if (security.decision === "BLOCK") {
      return NextResponse.json(
        { error: security.reason },
        { status: 403 }
      );
    }

    // ==========================================
    // INTERNAL API KEY PROTECTION
    // ==========================================

    const apiKey = req.headers.get("x-api-key");

    if (!apiKey || apiKey !== process.env.INTERNAL_API_KEY) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // ==========================================
    // BODY
    // ==========================================

    const body = (await req.json()) as AlertPayload;

    const score = Number(body.score ?? 0);

    if (score < 120) {
      return NextResponse.json({
        success: true,
        skipped: true,
      });
    }

    // ==========================================
    // ALERT OBJECT
    // ==========================================

    const alert = {
      id: crypto.randomUUID(),
      score,
      message: body.message ?? "High value event detected",
      createdAt: Date.now(),

      // 🔥 optional: security metadata
      risk: security.context.riskScore,
      user: security.context.userId,
      tenant: security.context.organizationId,
    };

    return NextResponse.json({
      success: true,
      alert,
      security: {
        decision: security.decision,
        reason: security.reason,
      },
    });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
