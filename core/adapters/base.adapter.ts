export interface Product {
  id: string
  title: string
  url: string
  price: number
  rating: number
  reviews: number
  source?: string
}

export interface BaseAdapter {

  fetch(limit: number): Promise<Product[]>
}
