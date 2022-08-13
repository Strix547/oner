import { API } from 'core'

import { transformPriceList, transformStore } from './supplier.transformers'

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
  AddPriceListTypeProps,
  AddStore,
  AddStoreRes,
  AddStoreImagesReq,
  PriceList,
  Store,
  EditStore,
  ChangeSupplierEntityData
} from './supplier.types'
import { ResponsePagination } from 'types/axios'

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
  name,
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
    entity_name: name,
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

export const getStores = async (page: number) => {
  const { data } = await API.get<ResponsePagination<Store[]>>('/account/supplier-store/', {
    params: { page }
  })

  return {
    ...data,
    results: data.results.map(transformStore)
  }
}

export const getStore = async (id: number) => {
  const { data: store } = await API.get<Store>(`/account/supplier-store/${id}`)

  return transformStore(store)
}

export const addStoreImages = ({ storeId, images }: AddStoreImagesReq) => {
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
  city,
  address,
  desc,
  phone,
  email,
  lat,
  lng,
  images
}: AddStore) => {
  const { data } = await API.post<AddStoreRes>(`${root}-store/`, {
    user: userId,
    name,
    city,
    address,
    description: desc,
    phone,
    email,
    lat,
    lng
  })

  if (images?.length) {
    await addStoreImages({ storeId: data.id, images })
  }
}

export const editStore = ({
  storeId,
  userId,
  name,
  address,
  lat,
  lng,
  city,
  phone,
  desc,
  email
}: EditStore) => {
  return API.patch(`${root}-store/${storeId}/`, {
    name,
    address,
    lat,
    lng,
    city,
    phone,
    email,
    description: desc,
    user: userId
  })
}

export const deleteStore = (id: number) => {
  return API.delete(`${root}-store/${id}/`)
}

export const addPriceListType = ({ userId, type }: AddPriceListTypeProps) => {
  return API.post(`${root}-price-list-information/`, { user: userId, type })
}

export const addConclusion = ({ userId, text }: Conclusion) => {
  return API.post(`${root}-conclusion/`, { user: userId, text })
}

export const getPriceLists = async (page: number, active?: boolean) => {
  const { data } = await API.get<ResponsePagination<PriceList[]>>(
    '/account/supplier-price-list-information/',
    {
      params: {
        page,
        active
      }
    }
  )

  return {
    ...data,
    results: data.results.map(transformPriceList)
  }
}

export const cancelPriceList = (id: number) => {
  return API.post(`${root}-price-list-information/cancel/`, { id })
}

export const enableStore = (id: number) => {
  return API.post(`${root}-store/${id}/enable/`)
}

export const disableStore = (id: number) => {
  return API.post(`${root}-store/${id}/disable/`)
}

export const changeSupplierEntityData = ({
  id,
  type,
  supplierId,
  ownershipForm,
  name,
  inn,
  kpp,
  ogrn,
  address,
  phone,
  website,
  email
}: ChangeSupplierEntityData) => {
  return API.patch(`${root}-information/${id}/`, {
    ownership_form: ownershipForm,
    entity_name: name,
    inn,
    kpp,
    ogrn,
    address,
    entity_phone: phone,
    entity_website: website,
    entity_email: email,
    type,
    user: supplierId
  })
}
