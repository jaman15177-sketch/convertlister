import { getSourceAdapter }
from "./source.manager"

import {
  addToQueue
} from "../queue/import.queue"

export async function batchImport(
  sources: string[],
  limit = 30
) {

  console.log("🚀 AUTO BATCH IMPORT START")

  let total = 0

  for (const source of sources) {

    console.log(`📦 SOURCE: ${source}`)

    const adapter =
      getSourceAdapter(source)

    if (!adapter) {

      console.log(
        `❌ NO ADAPTER: ${source}`
      )

      continue
    }

    const products =
      await adapter.fetch(limit)

    console.log(
      `✅ IMPORTED: ${products.length}`
    )

    addToQueue(products)

    total += products.length
  }

  console.log(
    "🏁 TOTAL QUEUED:",
    total
  )

  return total
}
