import { fetchAmazonProducts } from "../importer/amazon.importer"
import { supabase } from "../../lib/supabase-client"

export async function runBatch() {

  console.log("🚀 BATCH STARTED")

  const products =
    await fetchAmazonProducts()

  for (const p of products) {

    console.log("⚙️ PROCESSING:", p.title)

    const score =
      Math.floor(
        Math.random() * 100
      )

    const isWinner = score > 70

    if (!isWinner) {
      console.log("❌ REJECTED:", p.title)
      continue
    }

    await supabase
      .from("product_metrics")
      .insert({
        ...p,
        winning_score: score
      })

    console.log("✅ WINNER SAVED:", p.title)
  }

  console.log("🏁 BATCH COMPLETE")
}
