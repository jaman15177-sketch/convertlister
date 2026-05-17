import { nextProduct } from "../queue/import.queue"
import { processProduct } from "../pipeline/winner.pipeline"

export async function processQueue() {

  console.log("⚙️ PROCESSING START")

  while (true) {

    const product = nextProduct()

    if (!product) {

      console.log("🏁 QUEUE EMPTY")

      break
    }

    try {

      console.log(
        "⚙️ PROCESSING:",
        product.title
      )

      const result =
        await processProduct(product)

      // =====================
      // SAFE CHECK
      // =====================
      if (!result) {

        console.log("⚠️ SKIPPED NULL RESULT")
        continue
      }

      console.log(
        "📊 RESULT:",
        result.status
      )

    } catch (err) {

      console.log(
        "❌ ERROR:",
        err
      )
    }
  }
}
