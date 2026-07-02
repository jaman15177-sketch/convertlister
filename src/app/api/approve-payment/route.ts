import { NextResponse } from "next/server";

import { getUser } from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";
import { supabase } from "@/lib/supabase";

import { runSecurityKernel } from "@/security/kernel/security-kernel-runner";

// ==============================
// TYPES (STRICT SAFE)
// ==============================
type PaymentRequest = {
  id: string;
  user_id: string;
  credits: number;
  status: "pending" | "approved" | "rejected";
  verified?: boolean;
  approved_at?: string | null;
};

type Profile = {
  id: string;
  role: "admin" | "user";
};

type ApprovePaymentBody = {
  paymentRequestId: string;
};

export async function POST(req: Request) {
  try {
    // ==============================
    // SECURITY LAYER
    // ==============================
    const security = await runSecurityKernel(req);

    if (security.decision === "BLOCK") {
      return NextResponse.json(
        { success: false, error: security.reason },
        { status: 403 }
      );
    }

    // ==============================
    // AUTH
    // ==============================
    const user = await getUser(req);

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // ==============================
    // RATE LIMIT
    // ==============================
    const allowed = await rateLimit(`approve:${user.id}`, 10, 60_000);

    if (!allowed) {
      return NextResponse.json(
        { success: false, error: "Too many requests" },
        { status: 429 }
      );
    }

    // ==============================
    // ADMIN CHECK (SAFE TYPE)
    // ==============================
    const { data: profileRow } = await supabase
      .from("profiles")
      .select("id, role")
      .eq("id", user.id)
      .single();

    const profile = profileRow as Profile | null;

    if (!profile || profile.role !== "admin") {
      return NextResponse.json(
        { success: false, error: "Forbidden" },
        { status: 403 }
      );
    }

    // ==============================
    // BODY
    // ==============================
    const body = (await req.json()) as ApprovePaymentBody;

    if (!body?.paymentRequestId) {
      return NextResponse.json(
        { success: false, error: "paymentRequestId required" },
        { status: 400 }
      );
    }

    // ==============================
    // LOAD PAYMENT REQUEST
    // ==============================
    const { data: requestRow } = await supabase
      .from("payment_requests")
      .select("*")
      .eq("id", body.paymentRequestId)
      .single();

    const request = requestRow as PaymentRequest | null;

    if (!request) {
      return NextResponse.json(
        { success: false, error: "Payment request not found" },
        { status: 404 }
      );
    }

    if (request.status === "approved") {
      return NextResponse.json(
        { success: false, error: "Already approved" },
        { status: 409 }
      );
    }

    // ==============================
    // APPROVE REQUEST
    // ==============================
    const table = "payment_requests";

const { error: approveError } = await supabase
  .from("payment_requests")
  .update({
    status: "approved",
    verified: true,
    approved_at: new Date().toISOString(),
  } as any)   // 🔥 IMPORTANT FIX
  .eq("id", request.id);
if (approveError) {
  return NextResponse.json(
    { success: false, error: approveError.message },
    { status: 500 }
  );
}    // ==============================
    // CREDIT WALLET
    // ==============================
    const { data: walletRow } = await supabase
      .from("wallets")
      .select("balance")
      .eq("user_id", request.user_id)
      .single();

    const balance = (walletRow as any)?.balance ?? 0;

    const { error: walletError } = await supabase
      .from("wallets")
      .update({
        balance: balance + request.credits,
      })
      .eq("user_id", request.user_id);

    if (walletError) {
      return NextResponse.json(
        { success: false, error: walletError.message },
        { status: 500 }
      );
    }

    // ==============================
    // SUCCESS RESPONSE
    // ==============================
    return NextResponse.json({
      success: true,
      approved: true,
      paymentRequestId: request.id,
      credited: request.credits,
      userId: request.user_id,
      security: {
        decision: security.decision,
        risk: security.context?.riskScore,
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
