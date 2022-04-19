import { API } from 'core'

import { FetchBrandsRes } from './brands.types'

const root = '/car-brands'

export const fetchBrands = async (page: number) => {
  const { data } = await API.get<FetchBrandsRes>(`${root}/`, { params: { page } })

  return data
}
