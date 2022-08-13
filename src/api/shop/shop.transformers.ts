import * as ApiTypes from './shop.types'

import { Product, ProductInfo } from 'types/shop'

const transformProductInfo = (info: ApiTypes.ProductInfo): ProductInfo => {
  const {
    id,
    article,
    barcode,
    created: createdDateTime,
    description,
    image,
    is_initial: isInitial,
    length,
    width,
    price,
    title,
    short_title: titleShort,
    category: categoryId
  } = info

  return {
    id,
    categoryId,
    article,
    barcode,
    createdDateTime,
    description,
    title,
    titleShort,
    width,
    length,
    price,
    image,
    isInitial
  }
}

export const transformProduct = (product: ApiTypes.Product): Product => {
  const {
    id,
    product: productInfo,
    rating,
    title,
    delivery_period: deliveryPeriod,
    count: availableAmount,
    price,
    is_available: isAvailable
  } = product

  return {
    id,
    productInfo: transformProductInfo(productInfo),
    rating,
    title,
    deliveryPeriod,
    availableAmount,
    price,
    isAvailable
  }
}
