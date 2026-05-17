import { BaseAdapter, Product }
from "./base.adapter"

export const amazonAdapter: BaseAdapter = {

  async fetch(limit: number) {

    const products: Product[] = []

    for (let i = 1; i <= limit; i++) {

      products.push({
        id: `amazon-${i}`,
        title: `Amazon Product ${i}`,
        url: "https://amazon.com",
        price: Math.floor(Math.random() * 100),
        rating: 4 + Math.random(),
        reviews: Math.floor(Math.random() * 1000),
        source: "amazon"
      })
    }

    return products
  }
}
