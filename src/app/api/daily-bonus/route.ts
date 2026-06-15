import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getUser } from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  const user = await getUser(req);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // RATE LIMIT (prevent spam)
  if (!rateLimit(user.id, 5)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const today = new Date().toISOString().split("T")[0];

  const { data: wallet } = await supabase
    .from("wallets")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (wallet?.last_daily_claim === today) {
    return NextResponse.json({ message: "Already claimed" });
  }

  await supabase
    .from("wallets")
    .update({
      balance: (wallet?.balance || 0) + 30,
      last_daily_claim: today,
    })
    .eq("user_id", user.id);

  return NextResponse.json({ success: true });
}
