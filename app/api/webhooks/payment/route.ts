import crypto from "crypto";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const secret = process.env.WEBHOOK_SECRET!;
    const rawBody = await req.text();
    const signature = req.headers.get("x-signature") || "";

    const hash = crypto
      .createHmac("sha256", secret)
      .update(rawBody)
      .digest("hex");

    if (hash !== signature) {
      return Response.json(
        { error: "Invalid signature" },
        { status: 401 }
      );
    }

    const body = JSON.parse(rawBody);

    const supabase = await createClient();

    await supabase.from("payment_events").insert({
      event_id: body.eventId,
      user_id: body.userId,
      amount: body.amount,
      status: body.status,
    });

    return Response.json({ success: true });

  } catch (e: any) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
