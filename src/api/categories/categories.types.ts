interface Category {
  id: number
  title: string
}

export interface FetchCategoriesRes {
  count: number
  next?: string
  previous?: string
  results: Category[]
}
