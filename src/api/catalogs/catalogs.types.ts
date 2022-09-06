// type SearchParamsType =
//   | 'Серия' series
//   | 'Тип кузова' body
//   | 'Год выпуска' year
//   | 'Модель' model
//   | 'Рынок' market
//   | 'Каталог' catalogue
//   | 'Тип серии' series
//   | 'Модельный год' model
//   | 'Год' year
//   | 'Vehicle Type' vehicle
//   | 'Vehicle Family' vehicle
//   | 'Регион' region
//   | 'Тип' type
//   | 'Тип ТС' vehicle
//   | 'Семейство' functional
//   | 'Модификация' adjustment
//   | 'Кузов' body
//   | 'Категория' category
//   | 'Тип агрегата' unit
//   | 'Торговое обозначение' trade
//   | 'Модельный ряд' model
//   | 'Market' market
//   | 'Vehicle Name' vehicle
//   | 'Year' year
//   | 'Catalog' shop
//   | 'Model' model

export interface CarBrand {
  code: string
  brand: string
  name: string
  icon: string
  vinexample: string
}

export interface CarBrands {
  [key: string]: CarBrand[]
}

export interface GetSparePartsCategories {
  catalog: string
  vehicleId: string
  ssd: string
}

export interface SparePartsCategory {
  categoryid: string
  name: string
  code: string
  childrens: string
  parentcategoryid: string
}

export interface GetCarSearchOptions {
  brandCode: string
  ssd?: string
}

export interface FindCar {
  brandCode: string
  ssd: string
}

export interface CarSearchOptions {
  allowlistvehicles: string
  automatic: string
  conditionid: string
  determined: string
  name: string
  type: string
  value?: string
}

export interface FindedCarDetails {
  filter_level: null
  market: string
  name: string
  prodrange: string
  engine?: string
  engine_info?: string
  sales_code?: string
  transmission?: string
}

export interface FindedCar {
  brand: string
  catalog: string
  details: FindedCarDetails
  name: string
  ssd: string
  vehicleid: string
}

export interface SubCategoryValue {
  quickgroupid: string
  name: string
  link: string
}

export interface SubCategory {
  quickgroupid: string
  name: string
  link: string
  values: SubCategoryValue[]
}

export interface Category {
  quickgroupid: string
  name: string
  link: string
  parameters: SubCategory[]
}

export interface CategoryGroup {
  quickgroupid: string
  name: string
  link: string
  details: Category[]
}

export interface CategoryGroups {
  quickgroupid: string
  link: string
  name: string
  groups: CategoryGroup[]
}

export interface SearchByVin {
  vin: string
  catalogCode?: string
}

export interface SearchByCarBodyNumber {
  code: string
  number: string
  catalogCode?: string
}
