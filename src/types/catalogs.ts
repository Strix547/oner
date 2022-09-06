export interface CarBrand {
  code: string
  brand: string
  name: string
  icon: string
  vinExample: string
}

export interface CarBrands {
  [key: string]: CarBrand[]
}

export interface SparePartsCategory {
  parentCategoryId: string
  categoryId: string
  name: string
  code: string
  childrens: boolean
}

export interface FindedCarDetails {
  name: string
  prodRange: string
  market: string
  engine?: string
  engineInfo?: string
  salesCode?: string
  transmission?: string
}

export interface FindedCar {
  name: string
  vehicleId: string
  brand: string
  catalog: string
  details: FindedCarDetails
  ssd: string
}

export interface SubCategoryValue {
  id: string
  name: string
}

export interface SubCategory {
  id: string
  name: string
  subCategories: SubCategoryValue[]
}

export interface Category {
  id: string
  name: string
  subCategories: SubCategory[]
}

export interface CategoryGroup {
  id: string
  name: string
  categories: Category[]
}
