import * as ApiTypes from './catalogs.types'

import {
  CarBrands,
  CarBrand,
  FindedCarDetails,
  FindedCar,
  Category,
  CategoryGroup
} from 'types/catalogs'

export const transformCarBrands = (brands: ApiTypes.CarBrands): CarBrands => {
  const transformBrand = (brand: ApiTypes.CarBrand): CarBrand => {
    const { code, brand: brandProp, name, icon, vinexample: vinExample } = brand

    return {
      code,
      brand: brandProp,
      name,
      icon,
      vinExample
    }
  }

  const transformedBrands = Object.entries(brands).map(([letter, brands]) => {
    return [letter, brands.map(transformBrand)]
  })

  return Object.fromEntries(transformedBrands)
}

// export const transformSparePartsCategory = (
//   category: ApiTypes.SparePartsCategory
// ): SparePartsCategory => {
//   const {
//     categoryid: categoryId,
//     name,
//     code,
//     childrens,
//     parentcategoryid: parentCategoryId
//   } = category

//   return {
//     parentCategoryId,
//     categoryId,
//     name,
//     code,
//     childrens: childrens === 'false' ? false : true
//   }
// }

export const transformCarSearchOptions = (params: ApiTypes.CarSearchOptions) => {
  const {
    allowlistvehicles,
    automatic,
    conditionid: id,
    determined,
    name,
    type,
    value,
    ...options
  } = params

  return {
    id,
    determined,
    name,
    value,
    options: Object.values(options)[0].map((option: any) => {
      const [value, label] = Object.values(option)

      return {
        label,
        value
      }
    })
  }
}

export const transformFindedCarDetails = (details: ApiTypes.FindedCarDetails): FindedCarDetails => {
  const {
    filter_level: filterLevel,
    market,
    name,
    prodrange: prodRange,
    engine,
    engine_info: engineInfo,
    sales_code: salesCode,
    transmission
  } = details

  return {
    name,
    prodRange,
    market,
    engine,
    engineInfo,
    salesCode,
    transmission
  }
}

export const transformFindedCar = (car: ApiTypes.FindedCar): FindedCar => {
  const { brand, catalog, details, name, ssd, vehicleid: vehicleId } = car

  return {
    name,
    vehicleId,
    brand,
    catalog,
    details: transformFindedCarDetails(details),
    ssd
  }
}

export const transformSparePartsCategory = (category: ApiTypes.Category): Category => {
  const { quickgroupid: id, name, parameters: subCategories } = category

  return {
    id,
    name,
    subCategories: subCategories.map((subCategory) => {
      const { quickgroupid: id, name, values: subCategories } = subCategory

      return {
        id,
        name,
        subCategories: subCategories.map((subCategory) => {
          const { quickgroupid: id, name } = subCategory

          return {
            id,
            name
          }
        })
      }
    })
  }
}

export const transformSparePartsCategoryGroup = (group: ApiTypes.CategoryGroup): CategoryGroup => {
  const { quickgroupid: id, name, details: categories } = group

  return {
    id,
    name,
    categories: categories.map(transformSparePartsCategory)
  }
}
