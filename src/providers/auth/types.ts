import { VerifyCodeReq } from 'api/auth/types'
import { AxiosResponse } from 'axios'
import { UseMutationResult } from 'react-query'

export type UserType = 'individual' | 'ooo' | 'entrepreneur'

export interface SignUpData {
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

export interface User {
  id: number
  firstName: string
  middleName: string
  lastName: string
  phone: string
  email: string
}

export type VerifyCode = UseMutationResult<
  {
    phone: string
    code: string
  },
  unknown,
  VerifyCodeReq,
  unknown
>

export type LoginPhone = UseMutationResult<AxiosResponse<any, any>, unknown, string, unknown>

export interface ConfirmCode {
  phone: string
  code: string
}

export interface AuthContextType {
  isAuth: boolean
  user?: User
  signUpProcessing: boolean
  isTokenCreating: boolean
  signUp: (data: SignUpData) => void
  verifyCode: VerifyCode
  loginPhone: LoginPhone
  confirmCode: ({ phone, code }: ConfirmCode) => Promise<void>
  logout: () => void
}
