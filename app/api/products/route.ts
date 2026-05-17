import { supabase } from "@/lib/supabase-client"

export async function GET() {

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
