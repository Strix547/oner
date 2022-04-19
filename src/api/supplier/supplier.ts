import { AxiosResponse } from 'axios'
import { API } from 'core'

import {
  AddPersonalData,
  AddPersonalDataReq,
  AddPersonalDataRes,
  PersonalData,
  AddCompanyData,
  CompanyEnum,
  SupplierData,
  DeliveryData,
  DeliveryType,
  DeliveryEnum,
  CompanyType,
  Conclusion,
  PriceList,
  Store
} from './supplier.types'

const root = '/account/supplier'

const transformPersonalData = (data: AddPersonalDataRes): PersonalData => {
  const {
    id: userId,
    first_name: firstName,
    middle_name: middleName,
    last_name: lastName,
    phone,
    email
  } = data

  return {
    userId: userId,
    firstName,
    middleName,
    lastName,
    phone,
    email
  }
}

export const addPersonalData = async ({
  firstName,
  middleName,
  lastName,
  email,
  phone
}: AddPersonalData) => {
  const { data: personalData } = await API.post<
    AddPersonalDataRes,
    AxiosResponse<AddPersonalDataRes, AddPersonalDataReq>,
    AddPersonalDataReq
  >('/account/register-supplier/', {
    first_name: firstName,
    middle_name: middleName,
    last_name: lastName,
    phone,
    email
  })

  return transformPersonalData(personalData)
}

export const addCompanyData = ({
  userId,
  type,
  inn,
  ogrn,
  bik,
  checkingAccount,
  address
}: AddCompanyData) => {
  const getBackendType = (type: CompanyType) => {
    switch (type) {
      case 'ooo':
        return CompanyEnum.ooo
      case 'entrepreneur':
        return CompanyEnum.entrepreneur
    }
  }

  return API.post(`${root}-information/`, {
    user: userId,
    type: getBackendType(type),
    inn,
    rsch: checkingAccount,
    bik,
    ogrn,
    address
  })
}

export const addSupplierData = ({ userId, inStore, categories, brands }: SupplierData) => {
  return API.post(`${root}-product-information/`, {
    user: userId,
    in_store: inStore,
    categories,
    brands
  })
}

export const addDeliveryData = ({ userId, delivery, pickup }: DeliveryData) => {
  const getBackendDelivery = (delivery: DeliveryType) => {
    switch (delivery) {
      case 'oner':
        return DeliveryEnum.oner
      case 'yourself':
        return DeliveryEnum.store
    }
  }

  return API.post(`${root}-delivery/`, {
    user: userId,
    delivery: getBackendDelivery(delivery),
    pickup
  })
}

export const addStore = ({ userId, name, address, desc, phone, email, lat, lng }: Store) => {
  return API.post(`${root}-store/`, {
    user: userId,
    name,
    address,
    description: desc,
    phone,
    email,
    lat,
    lng
  })
}

export const addPriceListType = ({ userId, type }: PriceList) => {
  return API.post(`${root}-price-list-information/`, { user: userId, type })
}

export const addConclusion = ({ userId, text }: Conclusion) => {
  return API.post(`${root}-conclusion/`, { user: userId, text })
}

export const addStoreImg = () => {}
