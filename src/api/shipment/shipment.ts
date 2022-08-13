import { API } from 'core'

import { DeliveryType } from './shipment.types'

const root = '/shipping-methods/'

export const getDeliveryTypes = async () => {
  const { data: deliveryTypes } = await API.get<DeliveryType[]>(`${root}`)

  return deliveryTypes
}
