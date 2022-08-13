import { API } from 'core'
import { ResponsePagination } from 'types/axios'

import { ProductBrand, ProductCategory, PaymentMethod } from './constants.types'

export const getBrands = async (page: number) => {
  const { data } = await API.get<ResponsePagination<ProductBrand[]>>('/car-brands/', {
    params: { page }
  })

  return data
}

export const getCategories = async (page: number) => {
  const { data } = await API.get<ResponsePagination<ProductCategory[]>>('/category/', {
    params: { page }
  })

  return data
}

export const getPaymentMethods = async () => {
  const { data } = await API.get<PaymentMethod[]>('/payment-methods/')

  return data
}
