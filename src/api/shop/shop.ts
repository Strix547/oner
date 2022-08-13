import { API } from 'core'

import { transformProduct } from './shop.transformers'

import { Product, GetProducts } from './shop.types'
import { ResponsePagination } from 'types/axios'

export const getProducts = async ({ page, search }: GetProducts) => {
  const { data } = await API.get<ResponsePagination<Product[]>>('/shop-products/', {
    params: { page, search }
  })

  return {
    ...data,
    results: data.results.map(transformProduct)
  }
}
