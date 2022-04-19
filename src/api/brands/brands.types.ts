interface Brand {
  id: number
  name: string
  code: string
  icon: string
  slug: string
}

export interface FetchBrandsRes {
  count: number
  next?: string
  previous?: string
  results: Brand[]
}
