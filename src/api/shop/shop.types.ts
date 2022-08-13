export interface ProductInfo {
  article: string
  barcode: string
  category: number
  created: string
  description: string
  id: number
  image: string
  is_initial: boolean
  length: number
  price: string
  short_title: string
  title: string
  width: number
}

export interface Product {
  id: number
  rating: number
  title: string
  delivery_period: number
  count: number
  price: number
  is_available: boolean
  product: ProductInfo
}

export interface GetProducts {
  search?: string
  page?: number
}
