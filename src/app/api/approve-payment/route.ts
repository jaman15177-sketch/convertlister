import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getUser } from "@/lib/auth";
import { isAdmin } from "@/lib/admin";

export async function POST(req: Request) {
  try {
    const user = await getUser(req);

    // 1. AUTH CHECK
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // 2. ADMIN CHECK
    const admin = await isAdmin(user.id);

    if (!admin) {
      return NextResponse.json(
        { error: "Forbidden - Admin only" },
        { status: 403 }
      );
    }

    const { paymentId } = await req.json();

    if (!paymentId) {
      return NextResponse.json(
        { error: "Missing paymentId" },
        { status: 400 }
      );
    }

    // 3. GET PAYMENT
    const { data: payment, error } = await supabase
      .from("payment_requests")
      .select("*")
      .eq("id", paymentId)
      .single();

    if (error || !payment) {
      return NextResponse.json(
        { error: "Payment not found" },
        { status: 404 }
      );
    }

    // 4. CHECK ALREADY APPROVED
    if (payment.status === "approved") {
      return NextResponse.json({
        error: "Already approved",
      });
    }

    // 5. FRAUD CHECK (basic safety)
    if (!payment.trx_id || payment.amount <= 0) {
      return NextResponse.json({
        error: "Invalid payment data",
      });
    }

    // 6. GET WALLET
    const { data: wallet } = await supabase
      .from("wallets")
      .select("*")
      .eq("user_id", payment.user_id)
      .single();

    // 7. UPDATE WALLET
    const newBalance =
      (wallet?.balance || 0) + payment.credits;

    await supabase
      .from("wallets")
      .update({
        balance: newBalance,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", payment.user_id);

    // 8. MARK PAYMENT APPROVED
    await supabase
      .from("payment_requests")
      .update({
        status: "approved",
        verified: true,
      })
      .eq("id", paymentId);

    // 9. AUDIT LOG
    await supabase.from("audit_logs").insert({
      user_id: payment.user_id,
      action: "PAYMENT_APPROVED",
      meta: {
        paymentId,
        amount: payment.amount,
        credits: payment.credits,
        trx_id: payment.trx_id,
        approved_by: user.id,
      },
    });

    // 10. RESPONSE
    return NextResponse.json({
      success: true,
      message: "Payment approved successfully",
      newBalance,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
