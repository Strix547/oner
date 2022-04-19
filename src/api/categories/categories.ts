import { API } from 'core'

import { FetchCategoriesRes } from './categories.types'

const root = '/category'

export const fetchCategories = async (page: number) => {
  const { data } = await API.get<FetchCategoriesRes>(`${root}/`, { params: { page } })

  return data
}
