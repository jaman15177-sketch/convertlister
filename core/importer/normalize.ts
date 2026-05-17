export function normalizeProduct(
  p: any,
  source: string
) {

  return {
    id: `${source}-${p.productId || p.id}`,
    title: p.title || p.name,
    url: p.productUrl || p.url,
    price: Number(p.price || 0),
    rating: Number(p.rating || 0),
    reviews: Number(p.reviews || 0),
    source
  }
}
