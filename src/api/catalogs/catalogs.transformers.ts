import * as ApiTypes from './catalogs.types'

import {
  CarBrands,
  CarBrand,
  FindedCar,
  Category,
  CategoryGroup,
  SparePartUnit,
  FindedCarByVinOrBodyNumber,
  UnitDetailInfo,
  UnitDetailUnit,
  UnitDetail
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

export const transformFindedCar = (car: ApiTypes.FindedCar): FindedCar => {
  const { brand, catalog, details, name, ssd, vehicleid: vehicleId } = car

  return {
    name,
    vehicleId,
    brand,
    catalog,
    details,
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

export const transformSparePartUnits = (units: ApiTypes.SparePartUnit[]): SparePartUnit[] => {
  return units.map((unit) => {
    const {
      unitid: unitId,
      code,
      imageurl: imageUrl,
      largeimageurl: imageLargeUrl,
      name,
      ssd
    } = unit

    return {
      unitId,
      code,
      name,
      ssd,
      imageUrl,
      imageLargeUrl
    }
  })
}

export const transformFindedCarByVinOrBodyNumber = (
  car: ApiTypes.FindedCarByVinOrBodyNumber
): FindedCarByVinOrBodyNumber => {
  const { attributes, brand, catalog, name, ssd, units, vehicleid: vehicleId } = car

  return {
    brand,
    name,
    catalog,
    ssd,
    vehicleId,
    attributes: Object.values(attributes),
    units: transformSparePartUnits(units)
  }
}

export const transformUnitDetail = (detail: ApiTypes.UnitDetail): UnitDetail => {
  const { unit_info, units } = detail

  const transformUnitInfo = (info: ApiTypes.UnitDetailInfo): UnitDetailInfo => {
    const {
      code,
      imageurl: imageUrl,
      largeimageurl: largeImageUrl,
      name,
      ssd,
      unitid: unitId
    } = info

    return {
      code,
      imageUrl,
      largeImageUrl,
      name,
      ssd,
      unitId
    }
  }

  const transformUnits = (units: ApiTypes.UnitDetailUnit[]): UnitDetailUnit[] => {
    return units.map((unit) => {
      const {
        codeonimage: codeOnImage,
        name,
        oem,
        ssd,
        details,
        image_positions: imagePositions
      } = unit

      return {
        codeOnImage,
        name,
        oem,
        ssd,
        details,
        imagePositions
      }
    })
  }

  return {
    unitInfo: transformUnitInfo(unit_info),
    units: transformUnits(units)
  }
}
