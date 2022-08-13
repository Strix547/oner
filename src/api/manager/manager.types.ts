import { Order } from 'api/orders/orders.types'
import { OrderStatus } from 'types/orders'

export interface Customer {
  id: number
  first_name: string
  middle_name: string
  last_name: string
  phone: string
  email: string
  is_active: boolean
  sales: Order[]
}

export interface SupplierLegalPerson {
  id: number
  type: 'Entity' | 'PersonEntity'
  entity_name: string
  inn: number
  rsch: number
  bik: number
  kpp: number | null
  ogrn: number
  address: string
  additionally: string | null
  ownership_form: 'private' | 'public' | null
  entity_phone: string | null
  entity_website: string | null
  entity_email: string | null
  user: number
}

export interface SupplierStore {
  id: number
  name: string
  address: string
  lat: number
  lng: number
  phone: string
  status: 'active' | 'disactive' | 'moderation'
  enabled: boolean
  email: string
  city: string
  description: string
  user: number
}

interface AccountingFile {
  id: number
  name: string
  size: string
  file: File
  uploaded: string
  accounting: number
}

export interface AccountingItem {
  id: number
  accounting_files: AccountingFile[]
  created: string
  user: number
}

export interface RequisitesItem {
  account_number: number
  bik: number
  id: number
  title: string
  user: {
    email: string
    first_name: string
    id: number
    last_name: string
    middle_name: string
    phone: string
  }
}

export interface Supplier {
  id: number
  first_name: string
  middle_name: string
  last_name: string
  phone: string
  email: string
  is_active: boolean
  supplier_inn: SupplierLegalPerson
  supplier_name: SupplierStore[]
  supplier_accounting: AccountingItem[]
  requisites: RequisitesItem[]
  main_requisite: RequisitesItem | null
  sales: Order[]
}

export interface SendEmailToSupplier {
  supplierId: number
  emailReply: string
  subject: string
  message: string
  files?: File[]
}

export interface ChangeSupplier {
  supplierId: number
  firstName?: string
  middleName?: string
  lastName?: string
  phone?: string
  email: string
  active?: boolean
}

export interface ChangeCustomer {
  customerId: number
  email: string
  phone?: string
  firstName?: string
  middleName?: string
  lastName?: string
  active?: boolean
}

export interface GetOrders {
  role: 'suppliers' | 'customers'
  page: number
}

export interface ChangeMainRequisites {
  supplierId: number
  requisitesId: number
}

export interface ChangeOrderProduct {
  id: number
  orderId: number
  productId: number
  count?: number
}

export interface RefundOrder {
  orderId: number
  description?: string
}

interface RequisitesUser {
  first_name: string
  middle_name: string
  last_name: string
  phone: string
  email: string
  id: number
}

export interface RequisiteItem {
  id: number
  user: RequisitesUser
  title: string
  account_number: number
  bik: number
}

export interface GetRequisites {
  userId?: number
}

export interface ChangeOrder {
  orderId: number
  status?: OrderStatus
  paymentType?: number
  deliveryType?: number
  requisiteId?: number
}

export interface CreateRequisite {
  userId: number
  name: string
  accountNumber: number
  bik: number
}

export interface ChangeRequisite {
  id: number
  userId: number
  name: string
  accountNumber: number
  bik: number
}
