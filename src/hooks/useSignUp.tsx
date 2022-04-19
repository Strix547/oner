import { useMutation } from 'react-query'

import { authAPI } from 'api'

type UserType = 'individual' | 'ooo' | 'entrepreneur'

interface UserData {
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

interface HandleRequest {
  success?: () => void
  error?: () => void
}

interface useSignUpProps {
  onSendCode?: HandleRequest
  onVerifySMS?: HandleRequest
}

export const useSignUp = ({ onSendCode, onVerifySMS }: useSignUpProps) => {
  const handleSendCode = {
    onSuccess: onSendCode?.success,
    onError: onSendCode?.error
  }

  const registerIndividual = useMutation(
    'register-individual',
    authAPI.registerIndividual,
    handleSendCode
  )

  const registerOOO = useMutation('register-ooo', authAPI.registerOOO, handleSendCode)

  const registerEntrepreneur = useMutation(
    'register-entrepreneur',
    authAPI.registerEntrepreneur,
    handleSendCode
  )

  const sendCode = (data: UserData) => {
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
      default:
        return null
    }
  }

  const verifySMS = useMutation('sms-verify', authAPI.verifyCode, {
    onSuccess: ({ phone, code }) => {
      createToken.mutate({ phone, code }), onVerifySMS.success()
    },
    onError: onVerifySMS?.error
  })

  const createToken = useMutation('create-token', authAPI.createPhoneToken)

  const isCodeSending =
    registerIndividual.isLoading || registerOOO.isLoading || registerEntrepreneur.isLoading

  return { sendCode, isCodeSending, verifySMS }
}
