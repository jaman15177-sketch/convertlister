type Product = {
  title?: string;
  price?: number;
  description?: string;
};

export function calculateHealthScore(product: Product): number {
  if (!product) return 0;

  let score = 50;

  if (product.title) score += 10;
  if (product.price) score += 10;
  if (product.description) score += 10;

  return Math.min(score, 100);
}
