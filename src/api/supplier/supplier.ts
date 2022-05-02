import { API } from 'core'

import {
  AddPersonalDataReq,
  AddPersonalDataRes,
  PersonalData,
  AddCompanyDataReq,
  CompanyEnum,
  AddSupplierDataReq,
  AddDeliveryDataReq,
  DeliveryType,
  DeliveryEnum,
  CompanyType,
  Conclusion,
  PriceList,
  AddStoreReq,
  AddStoreRes,
  AddStoreImgReq
} from './supplier.types'

const root = '/account/supplier'

export const addPersonalData = async ({
  firstName,
  middleName,
  lastName,
  email,
  phone
}: AddPersonalDataReq) => {
  const { data: personalData } = await API.post<AddPersonalDataRes>('/account/register-supplier/', {
    first_name: firstName,
    middle_name: middleName,
    last_name: lastName,
    phone,
    email
  })

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
}: AddCompanyDataReq) => {
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

export const addSupplierData = ({ userId, inStore, categories, brands }: AddSupplierDataReq) => {
  return API.post(`${root}-product-information/`, {
    user: userId,
    in_store: inStore,
    categories,
    brands
  })
}

export const addDeliveryData = ({ userId, delivery, pickup }: AddDeliveryDataReq) => {
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

export const addStoreImg = ({ storeId, images }: AddStoreImgReq) => {
  const formData = new FormData()

  formData.append('supplier_store_id', String(storeId))
  images.forEach((img) => {
    formData.append('image', img)
  })

  return API.post('/account/store-image', formData)
}

export const addStore = async ({
  userId,
  name,
  address,
  desc,
  phone,
  email,
  lat,
  lng,
  images
}: AddStoreReq) => {
  const { data } = await API.post<AddStoreRes>(`${root}-store/`, {
    user: userId,
    name,
    address,
    description: desc,
    phone,
    email,
    lat,
    lng
  })

  if (images?.length) {
    addStoreImg({ storeId: data.id, images })
  }
}

export const addPriceListType = ({ userId, type }: PriceList) => {
  return API.post(`${root}-price-list-information/`, { user: userId, type })
}

export const addConclusion = ({ userId, text }: Conclusion) => {
  return API.post(`${root}-conclusion/`, { user: userId, text })
}
