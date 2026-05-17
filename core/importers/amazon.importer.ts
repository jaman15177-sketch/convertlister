export async function importAmazonProducts() {

  const products = []

  for (let i = 1; i <= 30; i++) {

    products.push({

      title:
        `Amazon Product ${i}`,

      price:
        Math.floor(
          Math.random() * 100
        ) + 10,

      rating:
        Number(
          (Math.random() * 2 + 3)
          .toFixed(1)
        ),

      reviews_count:
        Math.floor(
          Math.random() * 5000
        )
    })
  }

  return products
}
