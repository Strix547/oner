import { FileWithPath } from 'react-dropzone'

export interface ImageFile extends FileWithPath {
  preview: string | ArrayBuffer | null
}

interface PersonalDataFields {
  lastName: string
  firstName: string
  middleName: string
  phone: string
  email: string
}

interface CompanyDataFields {
  type: 'ooo' | 'entrepreneur'
  inn: number
  ogrn: number
  bik: number
  checkingAccount: number
  address: string
}

interface Brand {
  id: number
  name: string
  code: string
  icon: string
  slug: string
}

interface Category {
  id: number
  title: string
}

interface SupplierDataFields {
  type: 'ooo' | 'entrepreneur'
  categories: Category[]
  brands: Brand[]
  warehouseAvailable: string
}

interface DeliveryFields {
  type: 'oner' | 'yourself'
  pickup: 'available' | 'not-available'
}

interface ShopesFields {
  name: string
  address: string
  phone: string
  email: string
  howToFindUs: string
  addressCoords: [number, number]
}

interface PriceListInformationFields {
  informationExchange: 'API' | 'XLS'
}

interface FinalPostionFields {
  desc: string
}

export interface FormFields {
  personal: PersonalDataFields
  company: CompanyDataFields
  supplier: SupplierDataFields
  delivery: DeliveryFields
  shopes: ShopesFields
  priceList: PriceListInformationFields
  finalPostion: FinalPostionFields
}
