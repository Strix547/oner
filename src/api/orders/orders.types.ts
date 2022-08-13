import { RequisiteItem, User } from 'api/account/account.types'
import { UserRoleType } from 'types/account'
import { OrderStatus, ProductStatus } from 'types/orders'

interface PaymentMethod {
  id: number
  title: string
}

export interface Product {
  id: number
  product_name: string
  product_article: string
  product_price: number
  count: number
  sellprice: number
  sellprice_currency: string
  discount: number
  product: number
  state: ProductStatus
  order: number
}

interface Shipment {
  id: number
  title: string
}

export interface ShippingAddress {
  apartment: string
  building: string
  city: string
  house: string
  id: number
  index: string
  street: string
  title: string
  user: number
}

export interface OrderDocument {
  id: number
  name: string
  size: string
  file: string
  created: string
  order: number
}

export interface RefundItem {
  id: number
  order: {
    id: number
    created: string
    state: OrderStatus
  }
  product: {
    id: number
    product: Product
  }
  count: number
  created: string
}

export interface OrderUser {
  id: number
  first_name: string
  middle_name: string
  last_name: string
  phone: string
  email: string
  user_roles: {
    id: number
    title: UserRoleType
  }[]
}

export interface Order {
  id: number
  created: string
  entered: string
  note: string
  order_documents: OrderDocument[]
  payment_method: PaymentMethod
  products: Product[]
  refunds: RefundItem[]
  shipment: Shipment
  sipping_address: ShippingAddress
  shipping_price: number
  state: OrderStatus
  subtotal: number
  total: number
  is_archive: boolean
  requisite: RequisiteItem
  user: User
}

export interface CreateOrderProps {
  status: OrderStatus
  subtotal: number
  total: number
  note: string
  archived: boolean
  shippingPrice: number
  paymentTypeId: number
  userId: number
  shipmentId: number
  shippingAddressId: number
}

export interface GetOrders {
  id?: number
  page?: number
  status?: OrderStatus
  startDate?: string
  endDate?: string
  isArchive?: boolean
}

export interface CancelOrderProduct {
  orderId: number
  productId: number
}

export interface ChangeOrder {
  orderId: number
  deliveryId?: number
  paymentId?: number
}

export interface ChangeOrderProduct {
  id: number
  orderId: number
  productId: number
  count?: number
}

export interface RefundOrder {
  orderId: number
  desc: string
}

export interface RefundOrderProduct {
  orderId: number
  productId: number
}
