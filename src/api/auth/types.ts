export interface RegisterOOOReq {
  firstName: string
  phone: string
  email: string
  inn: number
  checkingAccount: number
  bik: number
  ogrn: number
  legalAddress: string
}

export interface RegisterEntrepreneurReq {
  firstName: string
  phone: string
  email: string
  inn: number
  checkingAccount: number
  bik: number
  ogrn: number
}

export interface RegisterIndividualReq {
  firstName: string
  phone: string
  email: string
}

export interface CreateEmailTokenReq {
  email: string
  password: string
}

export interface CreatePhoneTokenReq {
  phone: string
  code: string
}

export interface Tokens {
  access: string
  refresh: string
}

export interface VerifyCodeReq {
  phone: string
  code: string
}

export interface VerifyCodeRes {
  phone: string
  sms_code: string
}
