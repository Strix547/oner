import { transformOrder } from 'api/orders/order.transformers'

import { Store } from 'types/supplier'
import { Supplier, SupplierLegalPerson, RequisitesItem, AccountingItem } from 'types/manager'
import * as ApiTypes from './manager.types'

export const transformCustomer = (customer: ApiTypes.Customer) => {
  const {
    id,
    first_name: firstName,
    middle_name: middleName,
    last_name: lastName,
    email,
    phone,
    is_active: active,
    sales: orders
  } = customer

  return {
    id,
    firstName,
    middleName,
    lastName,
    email,
    phone,
    active,
    orders: orders.map(transformOrder)
  }
}

export const transformStore = (store: ApiTypes.SupplierStore): Store => {
  const {
    id,
    name,
    address,
    lat,
    lng,
    phone,
    status,
    enabled,
    email,
    description: desc,
    city,
    user: userId
  } = store

  return {
    id,
    name,
    address,
    lat,
    lng,
    status,
    enabled,
    phone,
    desc,
    email,
    city,
    userId
  }
}

export const transformLegalPerson = (
  legalPerson: ApiTypes.SupplierLegalPerson
): SupplierLegalPerson => {
  const {
    id,
    type,
    entity_name: name,
    kpp,
    inn,
    rsch,
    bik,
    ogrn,
    address,
    additionally,
    ownership_form: ownershipForm,
    entity_phone: phone,
    entity_email: email,
    entity_website: website
  } = legalPerson

  return {
    id,
    type,
    additionally,
    ownershipForm,
    name,
    inn,
    kpp,
    ogrn,
    address,
    phone,
    website,
    email
  }
}

const transformAccountingItem = (accountingItem: ApiTypes.AccountingItem): AccountingItem => {
  const { accounting_files: files, id, user, created } = accountingItem

  return {
    id,
    user,
    created,
    files
  }
}

const transformRequisitesItem = (requisites: ApiTypes.RequisitesItem): RequisitesItem => {
  const { id, bik, account_number: accountNumber, title: name, user } = requisites

  return {
    id,
    name,
    accountNumber,
    bik
  }
}

export const transformSupplier = (supplier: ApiTypes.Supplier): Supplier => {
  const {
    id,
    first_name: firstName,
    middle_name: middleName,
    last_name: lastName,
    email,
    phone,
    is_active: active,
    supplier_inn: legalPerson,
    supplier_name: stores,
    supplier_accounting: accounting,
    sales: orders,
    requisites,
    main_requisite: mainRequisites
  } = supplier

  return {
    id,
    firstName,
    middleName,
    lastName,
    email,
    phone,
    active,
    legalPerson: legalPerson && transformLegalPerson(legalPerson),
    stores: stores.map(transformStore),
    orders: orders.map(transformOrder),
    accounting: accounting.map(transformAccountingItem),
    requisites: requisites.map(transformRequisitesItem),
    mainRequisites: mainRequisites && transformRequisitesItem(mainRequisites)
  }
}
