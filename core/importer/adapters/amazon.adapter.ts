import { normalizeProduct }
from "../normalize"

export async function importAmazon(
  limit = 30
) {

  const products = []

  for (let i = 1; i <= limit; i++) {

    const raw = {

      id: `amazon-${i}`,

      title:
        `Amazon Product ${i}`,

      price:
        Math.floor(
          Math.random() * 50
        ) + 10,

      rating:
        Number(
          (
            Math.random() * 2 + 3
          ).toFixed(1)
        ),

      reviews_count:
        Math.floor(
          Math.random() * 5000
        ),

      image:
        "https://placehold.co/300",

      url:
        `https://amazon.com/${i}`
    }

    products.push(

      normalizeProduct(
        raw,
        "amazon"
      )
    )
  }

  return products
}
