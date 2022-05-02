import { createContext, useMemo, useState, ReactNode } from 'react'
import { useQuery, useMutation } from 'react-query'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

import { authAPI, accountAPI } from 'api'
import { setCookie, deleteCookie } from 'utils'

import { SignUpData, AuthContextType, ConfirmCode, OnTokenCreate } from './types'

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

// 1. login / register (send sms code)
// 2. confirm code
export function AuthProvider({ children }: { children: ReactNode }): JSX.Element {
  const router = useRouter()

  const [isAuth, setAuth] = useState(false)

  const onTokenCreate = ({ accessToken, refreshToken }: OnTokenCreate) => {
    setCookie('accessToken', accessToken)
    setCookie('refreshToken', refreshToken)
    setAuth(true)
  }

  const {
    data: user,
    refetch: getMe,
    isLoading: isAccountLoading
  } = useQuery('me', accountAPI.fetchMe, {
    onSuccess: () => {
      setAuth(true)
    },
    onError: () => {
      // not auth
    }
  })

  const registerIndividual = useMutation('register-individual', authAPI.registerIndividual)
  const registerOOO = useMutation('register-ooo', authAPI.registerOOO)
  const registerEntrepreneur = useMutation('register-entrepreneur', authAPI.registerEntrepreneur)
  const phoneLogin = useMutation('phone-login', authAPI.phoneLogin)
  const emailLogin = useMutation('email-token', authAPI.createEmailToken, {
    onSuccess: onTokenCreate,
    onError: ({ response }) => {
      if (response.status === 400) {
        toast.error('Неправильный пароль')
      } else {
        toast.error('Ошибка')
      }
    }
  })

  const verifyCode = useMutation('sms-verify', authAPI.verifyCode, {
    onError: ({ response }) => {
      if (response.status === 400) {
        toast.error('Код введён неверно')
      } else {
        toast.error('Ошибка')
      }
    }
  })

  const createPhoneToken = useMutation('phone-token', authAPI.createPhoneToken, {
    onSuccess: onTokenCreate
  })

  // send sms code
  const signUp = (data: SignUpData) => {
    const { userType, firstName, phone, email, inn, checkingAccount, bik, ogrn, legalAddress } =
      data

    switch (userType) {
      case 'individual':
        registerIndividual.mutate({ firstName, phone, email })
        break
      case 'ooo':
        registerOOO.mutate({
          firstName,
          email,
          phone,
          bik,
          inn,
          ogrn,
          checkingAccount,
          legalAddress
        })
        break
      case 'entrepreneur':
        registerEntrepreneur.mutate({
          firstName,
          email,
          phone,
          bik,
          inn,
          ogrn,
          checkingAccount
        })
        break
    }
  }

  const confirmCode = async ({ phone, code }: ConfirmCode) => {
    await verifyCode.mutateAsync({ phone, code })
    await createPhoneToken.mutateAsync({ phone, code })
    getMe()
  }

  const logout = () => {
    router.push('/')
    setAuth(false)
    deleteCookie('accessToken')
    deleteCookie('refreshToken')
  }

  const signUpProcessing =
    registerIndividual.isLoading || registerOOO.isLoading || registerEntrepreneur.isLoading

  const isTokenCreating = createPhoneToken.isLoading

  const memoedValue = useMemo(
    () => ({
      isAuth,
      user,
      isAccountLoading,
      signUpProcessing,
      isTokenCreating,
      signUp,
      verifyCode,
      phoneLogin,
      logout,
      confirmCode,
      emailLogin
    }),
    [
      isAuth,
      user,
      isAccountLoading,
      signUpProcessing,
      isTokenCreating,
      signUp,
      verifyCode,
      phoneLogin,
      logout,
      confirmCode,
      emailLogin
    ]
  )

  return <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
}
