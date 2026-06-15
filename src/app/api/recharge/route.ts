import { supabaseAdmin } from "@/lib/server/supabase-admin";
import { redis } from "@/lib/server/redis";import { NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";
import { getUser } from "@/lib/auth";
import { detectFraud } from "@/lib/fraud";
import { isUserBanned } from "@/lib/ban";
import { rateLimit } from "@/lib/rate-limit";
import { logAudit } from "@/lib/audit";

export async function POST(req: Request) {
  try {
    // =========================
    // AUTH USER
    // =========================

    const user = await getUser(req);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }

    // =========================
    // BAN CHECK
    // =========================

    const banned = await isUserBanned(user.id);

    if (banned) {
      return NextResponse.json(
        {
          success: false,
          error: "Account suspended",
        },
        { status: 403 }
      );
    }

    // =========================
    // RATE LIMIT
    // =========================

    const allowed = rateLimit(user.id, 5, 60000);

    if (!allowed) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many requests",
        },
        { status: 429 }
      );
    }

    // =========================
    // BODY
    // =========================

    const body = await req.json();

    const {
      amount,
      credits,
      trx_id,
      sender_number,
    } = body;

    // =========================
    // VALIDATION
    // =========================

    if (
      !amount ||
      !credits ||
      !trx_id ||
      !sender_number
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields",
        },
        { status: 400 }
      );
    }

    if (amount <= 0 || credits <= 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid amount or credits",
        },
        { status: 400 }
      );
    }

    // =========================
    // FRAUD DETECTION
    // =========================

    const fraud = await detectFraud({
      userId: user.id,
      trx_id,
      amount,
      sender_number,
    });

    if (fraud.blocked) {
      await logAudit(
        user.id,
        "FRAUD_BLOCKED_PAYMENT",
        {
          trx_id,
          amount,
          sender_number,
          reason: fraud.reason,
        }
      );

      return NextResponse.json(
        {
          success: false,
          error: fraud.reason,
        },
        { status: 400 }
      );
    }

    // =========================
    // INSERT PAYMENT REQUEST
    // =========================

    const { error } = await supabase
      .from("payment_requests")
      .insert({
        user_id: user.id,
        amount,
        credits,
        trx_id,
        sender_number,
        status: "pending",
        verified: false,
      });

    if (error) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        { status: 500 }
      );
    }

    // =========================
    // AUDIT LOG
    // =========================

    await logAudit(
      user.id,
      "PAYMENT_REQUEST_CREATED",
      {
        amount,
        credits,
        trx_id,
        sender_number,
      }
    );

    // =========================
    // SUCCESS
    // =========================

    return NextResponse.json({
      success: true,
      message:
        "Recharge request submitted successfully",
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error:
          err.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}
