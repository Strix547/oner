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

export type PhoneLogin = UseMutationResult<AxiosResponse<any, any>, unknown, string, unknown>
export type EmailLogin = UseMutationResult<
  { accessToken: string; refreshToken: string },
  unknown,
  { email: string; password: string },
  unknown
>

export interface ConfirmCode {
  phone: string
  code: string
}

export interface OnTokenCreate {
  accessToken: string
  refreshToken: string
}

export interface AuthContextType {
  isAuth: boolean
  user?: User
  signUpProcessing: boolean
  isTokenCreating: boolean
  signUp: (data: SignUpData) => void
  verifyCode: VerifyCode
  phoneLogin: PhoneLogin
  emailLogin: EmailLogin
  confirmCode: ({ phone, code }: ConfirmCode) => Promise<void>
  logout: () => void
}
