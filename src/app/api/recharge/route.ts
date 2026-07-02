import { NextResponse } from "next/server";

import {
  getCurrentUser,
  UnauthorizedError,
  BadRequestError,
  ForbiddenError,
} from "@/lib/auth/get-current-user";

import { isUserBanned } from "@/lib/ban";
import { rateLimit } from "@/lib/rate-limit";
import { detectFraud } from "@/lib/fraud";
import { logAudit } from "@/lib/audit";

interface RechargeBody {
  trx_id: string;
  amount?: number;
  sender_number?: string;
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser(req);

    await rateLimit(`recharge:${user.id}`, 10, 60);

    const banned = await isUserBanned(user.id);

    if (banned) {
      await logAudit({
        actorId: user.id,
        organizationId: user.organizationId,
        entityType: "recharge",
        action: "RECHARGE_BLOCKED_BANNED_USER",
        metadata: {},
      });

      return NextResponse.json(
        {
          success: false,
          error: "USER_BANNED",
        },
        {
          status: 403,
        }
      );
    }

    const body = (await req.json()) as RechargeBody;

    if (!body.trx_id?.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "TRX_ID_REQUIRED",
        },
        {
          status: 400,
        }
      );
    }

    const fraud = await detectFraud({
      userId: user.id,
      trx_id: body.trx_id,
      amount: body.amount,
      sender_number: body.sender_number,
    });

    if (fraud.flagged && fraud.blocked) {
      await logAudit({
        actorId: user.id,
        organizationId: user.organizationId,
        entityType: "recharge",
        action: "RECHARGE_BLOCKED_FRAUD",
        metadata: {
          reason: fraud.reason,
          trx_id: body.trx_id,
        },
      });

      return NextResponse.json(
        {
          success: false,
          error: fraud.reason ?? "FRAUD_DETECTED",
        },
        {
          status: 403,
        }
      );
    }

    await logAudit({
      actorId: user.id,
      organizationId: user.organizationId,
      entityType: "recharge",
      action: "RECHARGE_REQUEST_CREATED",
      metadata: {
        trx_id: body.trx_id,
        amount: body.amount,
      },
    });

    return NextResponse.json({
      success: true,
      fraudFlagged: fraud.flagged,
      fraudReason: fraud.reason ?? null,
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

    console.error("Recharge API Error:", err);

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
