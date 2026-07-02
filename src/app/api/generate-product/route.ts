import { NextResponse } from "next/server";

import {
  getCurrentUser,
  UnauthorizedError,
  BadRequestError,
  ForbiddenError,
} from "@/lib/auth/get-current-user";

import { runSecurityKernel } from "@/security/kernel/security-kernel-runner";
import { deductCredit } from "@/lib/credits/deduct-credit";

interface GenerateProductBody {
  title?: string;
  price?: number;
}

export async function POST(req: Request) {
  try {
    // Authentication + Tenant
    const user = await getCurrentUser(req);

    // Existing security layer
    const security = await runSecurityKernel(req);

    if (security.decision === "BLOCK") {
      return NextResponse.json(
        {
          success: false,
          error: security.reason,
        },
        {
          status: 403,
        }
      );
    }

    const body = (await req.json()) as GenerateProductBody;

    // Credit engine
    const creditResult = await deductCredit(user.id, 1);

    if (!creditResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "INSUFFICIENT_CREDITS",
        },
        {
          status: 402,
        }
      );
    }

    const product = {
      id: crypto.randomUUID(),
      title: body.title?.trim() || "Generated Product",
      price: body.price ?? 0,
      currency: "USD",
      userId: user.id,
      organizationId: user.organizationId,
      createdAt: Date.now(),
    };

    return NextResponse.json({
      success: true,
      product,
      remainingCredits: creditResult.remaining ?? null,
    });

  } catch (err: unknown) {

    if (err instanceof UnauthorizedError) {
      return NextResponse.json(
        {
          success: false,
          error: err.message,
        },
        {
          status: 401,
        }
      );
    }

    if (err instanceof BadRequestError) {
      return NextResponse.json(
        {
          success: false,
          error: err.message,
        },
        {
          status: 400,
        }
      );
    }

    if (err instanceof ForbiddenError) {
      return NextResponse.json(
        {
          success: false,
          error: err.message,
        },
        {
          status: 403,
        }
      );
    }

    if (err instanceof SyntaxError) {
      return NextResponse.json(
        {
          success: false,
          error: "INVALID_JSON",
        },
        {
          status: 400,
        }
      );
    }

    console.error("Generate Product API Error:", err);

    return NextResponse.json(
      {
        success: false,
        error: "INTERNAL_SERVER_ERROR",
      },
      {
        status: 500,
      }
    );
  }
}
