import { StoreStatus, PriceListStatus, PriceListType } from 'types/supplier'

export interface AddPersonalDataReq {
  firstName: string
  middleName: string
  lastName: string
  phone: string
  email: string
}

export interface AddPersonalDataRes {
  id: number
  first_name: string
  middle_name: string
  last_name: string
  phone: string
  email: string
}

export interface PersonalData {
  userId: number
  firstName: string
  middleName: string
  lastName: string
  phone: string
  email: string
}

export const enum CompanyEnum {
  ooo = 'Entity',
  entrepreneur = 'PersonEntity'
}

export type CompanyType = 'ooo' | 'entrepreneur'

export interface AddCompanyDataReq {
  userId: number
  name: string
  type: CompanyType
  inn: number
  ogrn: number
  bik: number
  checkingAccount: number
  address: string
}

export interface AddSupplierDataReq {
  userId: number
  inStore: boolean
  categories: number[]
  brands: number[]
}

export const enum DeliveryEnum {
  oner = 'Oner',
  store = 'Store'
}

export type DeliveryType = 'oner' | 'yourself'

export interface AddDeliveryDataReq {
  userId: number
  delivery: DeliveryType
  pickup: boolean
}

export interface AddStore {
  userId: number
  name: string
  city: string
  phone: string
  email: string
  lat: number
  lng: number
  address: string
  desc?: string
  images?: File[]
}

export interface AddStoreRes {
  id: number
  name: string
  address: string
  lat: number
  lng: number
  phone: string
  email: string
  description: string
  user: number
}

export interface AddPriceListTypeProps {
  userId: number
  type: PriceListType
}

export interface Conclusion {
  userId: number
  text: string
}

export interface AddStoreImagesReq {
  storeId: number
  images: File[]
}

export interface PriceList {
  id: number
  upload_date?: string
  created: string
  status: PriceListStatus
  active: boolean
  moderator_comment?: string
  error_message?: string
  file?: string
  type: PriceListType
  user: number
}

export interface Store {
  id: number
  name: string
  city: string
  address: string
  lat: number
  lng: number
  phone: string
  status: StoreStatus
  enabled: boolean
  email: string
  description: string
  store_images?: {
    id: number
    image: string
  }[]
  user: number
}

export interface EditStore {
  storeId: number
  userId: number
  name: string
  address: string
  lat: number
  lng: number
  city: string
  phone: string
  email: string
  desc?: string
}

export interface ChangeSupplierEntityData {
  id: number
  type: 'Entity' | 'PersonEntity'
  ownershipForm: 'private' | 'public' | null
  name: string
  inn: number
  kpp: number | null
  ogrn: number
  address: string
  phone: string | null
  website: string | null
  email: string | null
  supplierId: number
}
