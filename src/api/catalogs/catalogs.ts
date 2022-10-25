import { API } from 'core'

import {
  transformCarBrands,
  transformSparePartsCategoryGroup,
  transformCarSearchOptions,
  transformFindedCar,
  transformFindedCarByVinOrBodyNumber,
  transformSparePartUnits,
  transformUnitDetail
} from './catalogs.transformers'

import {
  CarBrands,
  GetSparePartsCategories,
  GetCarSearchOptions,
  FindCar,
  CarSearchOptions,
  FindedCar,
  CategoryGroups,
  SearchCarByVin,
  SearchCarByBodyNumber,
  FindedCarByVinOrBodyNumber,
  GetSparePartsUnits,
  GetSparePartUnitDetail,
  SparePartUnit,
  UnitDetail,
  GetQuickDetail
} from './catalogs.types'

export const getCarBrands = async () => {
  const { data: brands } = await API.get<CarBrands>('/list-catalogs/')

  return transformCarBrands(brands)
}

export const getListCategories = async () => {
  const { data: categories } = await API.get('/list-categories/', {
    params: {
      catalog: 'CFIAT84',
      vehicle_id: '5266',
      ssd: '$*KwFQZHVaIDcLV1sQVVdMAQgcPDslVlBRUQoDG1paGgYDFzsFVFFpViEaCBQQJFcCDB5RMFdQU1tTVkVCQFAjVVZQUFMAAAAAJ2cG8Q==$',
      category_id: '-1'
    }
  })
  return categories
}

export const getCarSearchOptions = async ({ brandCode, ssd }: GetCarSearchOptions) => {
  const { data } = await API.get<{ wizard: CarSearchOptions[] }>('/get-by-wizard/', {
    params: { catalog: brandCode, ssd }
  })

  return data.wizard.map(transformCarSearchOptions)
}

export const findCar = async ({ brandCode, ssd }: FindCar) => {
  const { data } = await API.get<{ cars: FindedCar[] }>('/find-by-wizard/', {
    params: { catalog: brandCode, ssd: ssd }
  })

  return data.cars.map(transformFindedCar)
}

export const getQuickDetail = async ({ catalog, vehicleId, quickGroupId, ssd }: GetQuickDetail) => {
  const { data } = await API.get('/quick-detail/', {
    params: {
      catalog: catalog,
      vehicle_id: vehicleId,
      quickgroup_id: quickGroupId,
      ssd
    }
  })

  return data
}

export const getSparePartsCategories = async ({
  catalog,
  vehicleId,
  ssd
}: GetSparePartsCategories) => {
  const { data: categories } = await API.get<CategoryGroups>('/quick-group/', {
    params: {
      catalog,
      vehicle_id: vehicleId,
      ssd
    }
  })

  return categories.groups.map(transformSparePartsCategoryGroup)
}

export const detailByUnit = async () => {
  return API.get('/detail-by-unit/', {
    params: {
      catalog: 'AU1394',
      unit_id: '3887011',
      ssd: '$*KwFPe2p5Mi0rPEhPSQhOaxcDIyQ6SkhITFpcUxU8AFgfXltDBAh3KF5XWl8PFlsEEBZfKSg7X1BbW0cIFkdcT0hEUFtbSQgWR1xZOyxEWVUECEUeXltAXV5PNGoadE9eV1pfGRhbBBAWXzgrIj9eV1kGXlVfXEFaXy8wLAZXAAAAAPx2wbI=$'
    }
  })
}

export const findOEM = async () => {
  return API.get('/find-oem/', {
    params: {
      oem: '059131511CH'
    }
  })
}

export const searchCarByVin = async ({ vin, catalogCode }: SearchCarByVin) => {
  const { data: findedCar } = await API.get<FindedCarByVinOrBodyNumber>('/search/', {
    params: { vin, catalog: catalogCode }
  })

  return transformFindedCarByVinOrBodyNumber(findedCar)
}

export const searchCarByBodyNumber = async ({ bodyNumber, catalogCode }: SearchCarByBodyNumber) => {
  const [code, number] = bodyNumber.split('-')

  const { data: findedCar } = await API.get<FindedCarByVinOrBodyNumber>('/code-frame/', {
    params: { code, number, catalog: catalogCode }
  })

  return transformFindedCarByVinOrBodyNumber(findedCar)
}

export const getCatalogInfo = async (catalogCode: string) => {
  return API.get('/catalog-info/', { params: { catalog: 'BMW201910' } })
}

export const getSparePartsUnits = async ({ vehicleId, catalog, ssd }: GetSparePartsUnits) => {
  const {
    data: { data }
  } = await API.get<{ data: SparePartUnit[] }>('/list-units', {
    params: {
      vehicle_id: vehicleId,
      catalog,
      ssd
    }
  })

  return transformSparePartUnits(data)
}

export const getSparePartUnitDetail = async ({ catalog, ssd, unitId }: GetSparePartUnitDetail) => {
  const { data } = await API.get<UnitDetail>('/detail-by-unit', {
    params: {
      catalog,
      ssd,
      unit_id: unitId
    }
  })

  return transformUnitDetail(data)
}
