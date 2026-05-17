import { normalizeProduct }
from "../importer/normalize"

export class AliExpressAdapter {

  private appKey =
    process.env.ALIEXPRESS_APP_KEY!

  private appSecret =
    process.env.ALIEXPRESS_APP_SECRET!

  private trackingId =
    process.env.ALIEXPRESS_TRACKING_ID!

  async fetch(limit: number) {

    try {

      const url =
        "https://api-sg.aliexpress.com/sync"

      const response =
        await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-app-key": this.appKey
          },
          body: JSON.stringify({
            method: "aliexpress.product.search",
            app_signature: this.appSecret,
            trackingId: this.trackingId,
            page_size: limit
          })
        })

      const data = await response.json()

      const products =
        data?.result?.products || []

      return products.map((p: any) =>
        normalizeProduct(p, "aliexpress")
      )

    } catch (err) {

      console.log(
        "❌ ALIEXPRESS API ERROR:",
        err
      )

      return []
    }
  }
}

export const aliexpressAdapter =
  new AliExpressAdapter()
