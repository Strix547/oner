import * as ApiTypes from './supplier.types'
import { PriceList, Store } from 'types/supplier'

export const transformPriceList = (priceList: ApiTypes.PriceList): PriceList => {
  const {
    id,
    upload_date: uploadDateTime,
    created: createdDateTime,
    status,
    active,
    moderator_comment: moderatorComment,
    error_message: errorMessage,
    file,
    type,
    user: userId
  } = priceList

  return {
    id,
    uploadDateTime,
    createdDateTime,
    status,
    active,
    moderatorComment,
    errorMessage,
    file,
    type,
    userId
  }
}

export const transformStore = (store: ApiTypes.Store): Store => {
  const {
    id,
    name,
    city,
    address,
    lat,
    lng,
    phone,
    status,
    enabled,
    email,
    description: desc,
    user: userId,
    store_images: images
  } = store

  return {
    id,
    name,
    city,
    address,
    lat,
    lng,
    phone,
    status,
    enabled,
    email,
    desc,
    images: images?.length ? images.map(({ id, image: url }) => ({ id, url })) : [],
    userId
  }
}
