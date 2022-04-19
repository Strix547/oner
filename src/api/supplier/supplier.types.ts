export interface AddPersonalData {
  firstName: string
  middleName: string
  lastName: string
  phone: string
  email: string
}

export interface AddPersonalDataReq {
  first_name: string
  middle_name: string
  last_name: string
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

export interface AddCompanyData {
  userId: number
  type: CompanyType
  inn: number
  ogrn: number
  bik: number
  checkingAccount: number
  address: string
}

export interface SupplierData {
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

export interface DeliveryData {
  userId: number
  delivery: DeliveryType
  pickup: boolean
}

export interface Store {
  userId: number
  name: string
  phone: string
  email: string
  lat: number
  lng: number
  address: string
  desc: string
}

export type PriceListType = 'API' | 'XLS'

export interface PriceList {
  userId: number
  type: PriceListType
}

export interface Conclusion {
  userId: number
  text: string
}
