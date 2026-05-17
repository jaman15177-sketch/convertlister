import { BaseAdapter, Product }
from "./base.adapter"

export const aliexpressAdapter: BaseAdapter = {

  async fetch(limit: number) {

    const products: Product[] = []

    for (let i = 1; i <= limit; i++) {

      products.push({
        id: `ali-${i}`,
        title: `AliExpress Product ${i}`,
        url: "https://aliexpress.com",
        price: Math.random() * 80,
        rating: 3 + Math.random() * 2,
        reviews: Math.floor(Math.random() * 500),
        source: "aliexpress"
      })
    }

    return products
  }
}
