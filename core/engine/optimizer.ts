export interface OptimizedProduct {
  optimizedTitle: string
  optimizedDescription: string
  seoKeywords: string[]
}

export function optimizeProduct(
  title: string
): OptimizedProduct {

  return {

    optimizedTitle:
      `${title} | Best Selling Product`,

    optimizedDescription:
      `High-converting optimized product for ecommerce and dropshipping stores.`,

    seoKeywords: [
      "winning product",
      "best seller",
      "viral product",
      "dropshipping"
    ]
  }
}
