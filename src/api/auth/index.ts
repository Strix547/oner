import { API } from 'core'
import { setCookie } from 'utils'

import {
  RegisterOOOReq,
  RegisterEntrepreneurReq,
  RegisterIndividualReq,
  CreateEmailTokenReq,
  Tokens,
  CreatePhoneTokenReq,
  VerifyCodeReq,
  VerifyCodeRes
} from './types'

const root = '/account'

export const loginPhone = (phone: string) => {
  return API.post(`${root}/login-phone/`, { phone })
}

export const registerOOO = ({
  firstName,
  email,
  phone,
  bik,
  inn,
  ogrn,
  checkingAccount,
  legalAddress
}: RegisterOOOReq) => {
  return API.post(`${root}/register-entity/`, {
    first_name: firstName,
    email,
    phone,
    bik,
    inn,
    ogrn,
    rsch: checkingAccount,
    address: legalAddress
  })
}

export const registerEntrepreneur = ({
  firstName,
  phone,
  email,
  inn,
  checkingAccount,
  bik,
  ogrn
}: RegisterEntrepreneurReq) => {
  return API.post(`${root}/register-person-entity/`, {
    first_name: firstName,
    phone,
    email,
    inn,
    rsch: checkingAccount,
    bik,
    ogrn
  })
}

export const verifyCode = async ({ phone, code }: VerifyCodeReq) => {
  const { data } = await API.post<VerifyCodeRes>(`${root}/sms-verify/`, {
    phone,
    sms_code: code
  })

  return {
    phone: data.phone,
    code: data.sms_code
  }
}

export const registerIndividual = ({ firstName, phone, email }: RegisterIndividualReq) => {
  return API.post(`${root}/register-person/`, { first_name: firstName, phone, email })
}

export const createEmailToken = ({ email, password }: CreateEmailTokenReq) => {
  return API.post(`${root}/token-email`, { email, password })
}

export const createPhoneToken = async ({ phone, code }: CreatePhoneTokenReq) => {
  const { data } = await API.post<Tokens>(`${root}/token-phone`, { phone, sms_code: code })

  return { accessToken: data.access, refreshToken: data.refresh }
}

export const refreshAccessToken = async (refreshToken: string) => {
  const { data } = await API.post<Tokens>(`${root}/token-refresh`, { refresh: refreshToken })
  return data.access
}
