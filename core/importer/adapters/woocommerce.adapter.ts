import { normalizeProduct }
from "../normalize"

export async function importWooCommerce(
  limit = 30
) {

  const products = []

  for (let i = 1; i <= limit; i++) {

    const raw = {

      id: `woo-${i}`,

      title:
        `WooCommerce Product ${i}`,

      price:
        Math.floor(
          Math.random() * 100
        ) + 20,

      rating:
        Number(
          (
            Math.random() * 2 + 3
          ).toFixed(1)
        ),

      reviews_count:
        Math.floor(
          Math.random() * 2000
        ),

      image:
        "https://placehold.co/300",

      url:
        `https://woocommerce.com/${i}`
    }

    products.push(

      normalizeProduct(
        raw,
        "woocommerce"
      )
    )
  }

  return products
}
