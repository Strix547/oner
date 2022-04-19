export type UserType = 'individual' | 'ooo' | 'entrepreneur'

export interface FormFields {
  userType: UserType
  firstName: string
  phone: string
  email: string
  inn: number
  checkingAccount: number
  bik: number
  ogrn: number
  legalAddress: string
}

export type Step = 'data' | 'code'
