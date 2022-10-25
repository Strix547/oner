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

export interface FindedCar {
  brand: string
  catalog: string
  details: object
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

export interface SearchCarByVin {
  vin: string
  catalogCode?: string
}

export interface SearchCarByBodyNumber {
  bodyNumber: string
  catalogCode?: string
}

export interface FindedCarAttrs {
  [key: string]: {
    name: string
    value: string
  }
}

export interface SparePartUnit {
  code: string
  imageurl: string
  largeimageurl: string
  name: string
  ssd: string
  unitid: string
}

export interface FindedCarByVinOrBodyNumber {
  attributes: FindedCarAttrs
  brand: string
  catalog: string
  name: string
  ssd: string
  vehicleid: number
  units: SparePartUnit[]
}

export interface GetSparePartsUnits {
  vehicleId: string
  ssd: string
  catalog: string
}

export interface GetSparePartUnitDetail {
  catalog: string
  unitId: string
  ssd: string
}

export interface UnitDetailInfo {
  code: string
  imageurl: string
  largeimageurl: string
  name: string
  ssd: string
  unitid: string
}

export interface UnitDetailImagePositions {
  code: string
  type: string
  x1: string
  x2: string
  y1: string
  y2: string
}

export interface UnitDetailUnitDetails {
  amount: string
  family: string
  familyName: string
  macrofamily: string
  measurementUnit: string
  pattern: string
  weigth: string
}

export interface UnitDetailUnit {
  codeonimage: string
  name: string
  oem: string
  ssd: string
  image_positions: UnitDetailImagePositions
  details: UnitDetailUnitDetails
}

export interface UnitDetail {
  unit_info: UnitDetailInfo
  units: UnitDetailUnit[]
}

export interface GetQuickDetail {
  catalog: string
  vehicleId: string
  quickGroupId: string
  ssd: string
}
