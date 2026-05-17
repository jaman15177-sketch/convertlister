import { normalizeProduct }
from "../normalize"

export async function importAliExpress(
  limit = 30
) {

  const products = []

  for (let i = 1; i <= limit; i++) {

    const raw = {

      id: `ali-${i}`,

      title:
        `AliExpress Product ${i}`,

      price:
        Math.floor(
          Math.random() * 40
        ) + 5,

      rating:
        Number(
          (
            Math.random() * 2 + 3
          ).toFixed(1)
        ),

      reviews_count:
        Math.floor(
          Math.random() * 8000
        ),

      image:
        "https://placehold.co/300",

      url:
        `https://aliexpress.com/${i}`
    }

    products.push(

      normalizeProduct(
        raw,
        "aliexpress"
      )
    )
  }

  return products
}

