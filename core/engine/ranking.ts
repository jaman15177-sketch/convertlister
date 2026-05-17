import { supabase } from "../../lib/supabase"

export async function getTopProducts(limit = 5) {
  const { data, error } = await supabase
    .from("product_metrics")
    .select("*")
    .order("winning_score", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("❌ RANKING ERROR:", error.message)
    return []
  }

  return data
}
