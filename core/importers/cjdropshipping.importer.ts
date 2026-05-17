export async function importCJProducts() {

  const products = []

  for (let i = 1; i <= 30; i++) {

    products.push({

      title:
        `CJ Product ${i}`,

      price:
        Math.floor(
          Math.random() * 120
        ) + 15,

      rating:
        Number(
          (Math.random() * 2 + 3)
          .toFixed(1)
        ),

      reviews_count:
        Math.floor(
          Math.random() * 3000
        )
    })
  }

  return products
}
