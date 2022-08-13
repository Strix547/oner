import { API } from 'core'

import { transformCustomer, transformSupplier } from './manager.transformers'
import { transformOrder } from 'api/orders/order.transformers'
import { transformRequisite } from 'api/account/account.transformers'

import {
  Customer,
  Supplier,
  SendEmailToSupplier,
  ChangeSupplier,
  ChangeCustomer,
  GetOrders,
  ChangeMainRequisites,
  ChangeOrderProduct,
  RefundOrder,
  ChangeOrder,
  CreateRequisite,
  ChangeRequisite,
  RequisiteItem,
  GetRequisites
} from './manager.types'
import { ResponsePagination } from 'types/axios'
import { Order } from 'api/orders/orders.types'

const root = '/manager'

export const getSuppliers = async () => {
  const { data: suppliers } = await API.get<Supplier[]>(`${root}/suppliers/`)

  return suppliers.map(transformSupplier)
}

export const getSupplier = async (id: number) => {
  const { data: supplier } = await API.get<Supplier>(`${root}/suppliers/${id}/`)

  return transformSupplier(supplier)
}

export const changeSupplier = ({
  supplierId,
  firstName,
  middleName,
  lastName,
  phone,
  email,
  active
}: ChangeSupplier) => {
  return API.patch(`${root}/suppliers/${supplierId}/`, {
    first_name: firstName,
    middle_name: middleName,
    last_name: lastName,
    phone,
    email,
    is_active: active
  })
}

export const sendEmailToSupplier = ({
  supplierId,
  emailReply,
  subject,
  files,
  message
}: SendEmailToSupplier) => {
  if (files) {
    const formData = new FormData()

    formData.append('reply_address', emailReply)
    formData.append('subject', subject)
    formData.append('message', message)

    files.forEach((file) => {
      formData.append('files', file)
    })

    return API.post(`${root}/suppliers/${supplierId}/email_message/`, formData)
  } else {
    return API.post(`${root}/suppliers/${supplierId}/email_message/`, {
      reply_address: emailReply,
      subject,
      message,
      files
    })
  }
}

export const getCustomers = async () => {
  const { data: customers } = await API.get<Customer[]>(`${root}/clients/`)

  return customers.map(transformCustomer)
}

export const getCustomer = async (id: number) => {
  const { data: customer } = await API.get<Customer>(`${root}/clients/${id}/`)

  return transformCustomer(customer)
}

export const changeCustomer = async ({
  customerId,
  email,
  firstName,
  middleName,
  lastName,
  phone,
  active
}: ChangeCustomer) => {
  return API.patch(`${root}/clients/${customerId}/`, {
    user: customerId,
    email,
    first_name: firstName,
    middle_name: middleName,
    last_name: lastName,
    phone,
    is_active: active
  })
}

export const getOrders = async ({ role, page }: GetOrders) => {
  const orderEndpointWithParams =
    role === 'customers'
      ? `${root}/orders/?user__user_roles=7&user__user_roles=8&user__user_roles=9&page=${page}`
      : `${root}/orders/?user__user_roles=6&page=${page}`

  const { data } = await API.get<ResponsePagination<Order[]>>(orderEndpointWithParams)

  return {
    ...data,
    results: data.results.map(transformOrder)
  }
}

export const getOrder = async (id: number) => {
  const { data: order } = await API.get<Order>(`${root}/orders/${id}/`)

  return transformOrder(order)
}

export const archiveOrder = (id: number) => {
  return API.post(`${root}/orders/${id}/to_archive/`)
}

export const unarchiveOrder = (id: number) => {
  return API.post(`${root}/orders/${id}/un_archive/`)
}

export const enableStore = (id: number) => {
  return API.post(`${root}/supplier-store/${id}/enable/`)
}

export const disableStore = (id: number) => {
  return API.post(`${root}/supplier-store/${id}/disable/`)
}

export const changeSupplierMainRequisites = ({
  supplierId,
  requisitesId
}: ChangeMainRequisites) => {
  return API.post(`${root}/suppliers/${supplierId}/change_main_requisite/`, {
    id: requisitesId
  })
}

export const changeOrderProduct = ({ id, orderId, productId, count }: ChangeOrderProduct) => {
  return API.patch(`${root}/order-products/${id}/`, {
    product: productId,
    count,
    order: orderId,
    sellprice_currency: 'RUB'
  })
}

export const cancelOrder = (id: number) => {
  return API.post(`${root}/orders/${id}/order_cancel/`)
}

export const refundOrder = ({ orderId, description = 'none' }: RefundOrder) => {
  return API.post(`${root}/orders/${orderId}/order_refund/`, {
    refund_description: description,
    make_refund: true
  })
}

export const changeOrder = ({
  orderId,
  status,
  paymentType,
  deliveryType,
  requisiteId
}: ChangeOrder) => {
  return API.patch(`${root}/orders/${orderId}/`, {
    state: status,
    payment_method: paymentType,
    shipment: deliveryType,
    requisite: requisiteId
  })
}

export const getRequisites = async ({ userId }: GetRequisites = {}) => {
  const { data } = await API.get<ResponsePagination<RequisiteItem[]>>(`${root}/requisites/`, {
    params: {
      user: userId
    }
  })

  return {
    ...data,
    results: data.results.map(transformRequisite)
  }
}

export const createRequisite = ({ userId, name, accountNumber, bik }: CreateRequisite) => {
  return API.post(`${root}/requisites/`, {
    user: userId,
    title: name,
    account_number: accountNumber,
    bik
  })
}

export const changeRequisite = ({ id, userId, name, accountNumber, bik }: ChangeRequisite) => {
  return API.patch(`${root}/requisites/${id}/`, {
    user: userId,
    title: name,
    account_number: accountNumber,
    bik
  })
}

export const deleteRequisite = (id: number) => {
  return API.delete(`${root}/requisites/${id}/`)
}
