
export async function importAliExpressProducts() {

  const products = []

  for (let i = 1; i <= 30; i++) {

    products.push({

      title:
        `AliExpress Product ${i}`,

      price:
        Math.floor(
          Math.random() * 80
        ) + 5,

      rating:
        Number(
          (Math.random() * 2 + 3)
          .toFixed(1)
        ),

      reviews_count:
        Math.floor(
          Math.random() * 10000
        )
    })
  }

  return products
}
