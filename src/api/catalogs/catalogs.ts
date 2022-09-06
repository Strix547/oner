import { API } from 'core'

import {
  transformCarBrands,
  transformSparePartsCategoryGroup,
  transformCarSearchOptions,
  transformFindedCar
} from './catalogs.transformers'

import {
  CarBrands,
  GetSparePartsCategories,
  GetCarSearchOptions,
  FindCar,
  CarSearchOptions,
  FindedCar,
  CategoryGroups,
  SearchByVin,
  SearchByCarBodyNumber
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

export const quickDetail = async () => {
  return API.get('/quick-detail/', {
    params: {
      catalog: 'AU1394',
      vehicle_id: '659',
      quickgroup_id: '323',
      ssd: '$*KwHl0cDTmIeBluLl46Lkwb2piY6Q4OLi5vD2-b-WqvK19PHprqLdgvT98PWlvPGuurz1g4KR9frx8e2ivO325eLu-vHx46K87fbzkYbu8_-uou-09PHq9_TlnsCw3uX0_fD1s7Lxrrq89ZKBiJX0_fOs9P_19uvw9YWahqz9AAAAAANJxdk=$'
    }
  })
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

export const searchByVin = async ({ vin, catalogCode }: SearchByVin) => {
  return API.get('/search/', { params: { vin, catalog: catalogCode } })
}

export const searchByCarBodyNumber = async ({
  code,
  number,
  catalogCode
}: SearchByCarBodyNumber) => {
  return API.get('/code-frame/', { params: { code, number, catalog: catalogCode } })
}

export const getCatalogInfo = async (catalogCode: string) => {
  return API.get('/catalog-info/', { params: { catalog: 'BMW201910' } })
}
