import { getSupabase } from "@/lib/supabase-client";

const supabase = getSupabase();export async function GET() {

  const { data } =
    await supabase
      .from("product_metrics")
      .select("*")
      .order("winning_score", {
        ascending: false
      })

  return Response.json({
    success: true,
    data
  })
}
