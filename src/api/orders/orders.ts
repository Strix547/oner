import { API } from 'core'

import {
  Order,
  GetOrders,
  CancelOrderProduct,
  ChangeOrder,
  ChangeOrderProduct,
  RefundOrder,
  RefundOrderProduct
} from './orders.types'
import { ResponsePagination } from 'types/axios'

import { transformOrder } from './order.transformers'

const root = '/orders'

export const getOrders = async ({
  id,
  page,
  status,
  startDate,
  endDate,
  isArchive
}: GetOrders = {}) => {
  const { data } = await API.get<ResponsePagination<Order[]>>(`${root}/`, {
    params: {
      id,
      page,
      state: status,
      created_gte: startDate,
      created_lte: endDate,
      is_archive: isArchive
    }
  })

  return {
    ...data,
    results: data.results.map(transformOrder)
  }
}

export const getOrder = async (id: number) => {
  const { data: order } = await API.get<Order>(`${root}/${id}/`)

  return transformOrder(order)
}

export const createOrder = () => {
  return API.post(`${root}/`)
}

export const deleteOrder = (id: number) => {
  return API.delete(`${root}/${id}/`)
}

export const changeOrder = ({ orderId, deliveryId, paymentId }: ChangeOrder) => {
  return API.patch(`${root}/${orderId}/`, {
    payment_method: paymentId,
    shipment: deliveryId
  })
}

export const cancelOrder = (id: number) => {
  return API.post(`${root}/${id}/order_cancel/`)
}

export const archiveOrder = (id: number) => {
  return API.post(`${root}/${id}/to_archive/`)
}

export const unarchiveOrder = (id: number) => {
  return API.post(`${root}/${id}/un_archive/`)
}

export const cancelOrderProduct = ({ orderId, productId }: CancelOrderProduct) => {
  return API.post(`${root}/${orderId}/product_cancel/`, { id: productId })
}

export const changeOrderProduct = ({ id, orderId, productId, count }: ChangeOrderProduct) => {
  return API.patch(`/order-products/${id}/`, {
    product: productId,
    count,
    order: orderId,
    sellprice_currency: 'RUB'
  })
}

export const refundOrder = ({ orderId, desc }: RefundOrder) => {
  return API.post(`${root}/${orderId}/order_refund/`, {
    refund_description: desc,
    make_refund: true
  })
}

export const refundOrderProduct = ({ orderId, productId }: RefundOrderProduct) => {
  return API.post(`${root}-refunds/`, {
    order: orderId,
    product: productId
  })
}
