import { NextResponse } from "next/server";
import { getUser } from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";
import { supabase } from "@/lib/supabase";

import { runSecurityKernel } from "@/security/kernel/security-kernel-runner";

export async function POST(req: Request) {
  try {
    // 🔐 SECURITY LAYER
    const security = await runSecurityKernel(req);

    if (security.decision === "BLOCK") {
      return NextResponse.json(
        { success: false, error: security.reason },
        { status: 403 }
      );
    }

    const user = await getUser(req);

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const allowed = await rateLimit(`bonus:${user.id}`, 5, 60_000);

    if (!allowed) {
      return NextResponse.json(
        { success: false, error: "Too many requests" },
        { status: 429 }
      );
    }

    const { data: wallet } = await supabase
      .from("wallets")
      .select("*")
      .eq("user_id", user.id)
      .single();

    const current = wallet?.balance ?? 0;

    await supabase
      .from("wallets")
      .update({ balance: current + 10 })
      .eq("user_id", user.id);

    return NextResponse.json({
      success: true,
      bonus: 10,
      newBalance: current + 10,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
