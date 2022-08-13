import { transformRequisite } from 'api/account/account.transformers'

import * as ApiTypes from './orders.types'
import { Product, OrderDocument, RefundItem, Order, DeliveryAddress } from 'types/orders'
import { User } from 'types/account'

export const transformProduct = (product: ApiTypes.Product): Product => {
  const {
    id,
    order: orderId,
    product: productId,
    discount,
    count,
    sellprice: totalPrice,
    sellprice_currency: currency,
    product_name: name,
    product_article: article,
    product_price: productPrice,
    state: status
  } = product

  return {
    id,
    orderId,
    productId,
    discount,
    count,
    totalPrice,
    productPrice,
    currency,
    name,
    article,
    status
  }
}

export const transformDocument = (document: ApiTypes.OrderDocument): OrderDocument => {
  const { id, created: createdDateTime, file, name, order: orderId, size } = document

  return {
    id,
    orderId,
    createdDateTime,
    name,
    file,
    size
  }
}

export const transformRefundItem = (refund: ApiTypes.RefundItem): RefundItem => {
  const { id, order, product, count, created: createdDateTime } = refund

  return {
    id,
    orderInfo: {
      id: order.id,
      createdDateTime: order.created,
      status: order.state
    },
    product: transformProduct(product.product),
    count,
    createdDateTime
  }
}

export const transformDeliveryAddress = (address: ApiTypes.ShippingAddress): DeliveryAddress => {
  const {
    apartment,
    building,
    city,
    house,
    id,
    index: postal,
    street,
    title,
    user: userId
  } = address

  return {
    id,
    title,
    city,
    street,
    house,
    building,
    apartment,
    postal,
    userId
  }
}

export const transformOrderUser = (user: ApiTypes.OrderUser): User => {
  const {
    id,
    first_name: firstName,
    middle_name: middleName,
    last_name: lastName,
    phone,
    email,
    user_roles
  } = user

  return {
    id,
    firstName,
    middleName,
    lastName,
    phone,
    email,
    role: user_roles[0]
  }
}

export const transformOrder = (order: ApiTypes.Order): Order => {
  const {
    id,
    products,
    created: createdDateTime,
    entered: saleDateTime,
    note,
    state: status,
    total: price,
    subtotal,
    user,
    payment_method: paymentMethod,
    shipment: deliveryType,
    order_documents: documents,
    sipping_address: deliveryAddress,
    refunds,
    shipping_price: deliveryPrice,
    is_archive: isArchived,
    requisite
  } = order

  return {
    id,
    products: products.map(transformProduct),
    createdDateTime,
    saleDateTime,
    note,
    status,
    price,
    subtotal,
    user: transformOrderUser(user),
    paymentMethod,
    refunds: refunds.map(transformRefundItem),
    documents: documents.map(transformDocument),
    delivery: {
      type: deliveryType,
      address: transformDeliveryAddress(deliveryAddress),
      price: deliveryPrice
    },
    isArchived,
    requisite: transformRequisite(requisite)
  }
}
