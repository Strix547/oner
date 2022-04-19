import { useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Typography from '@mui/material/Typography'
import { useForm, FormProvider } from 'react-hook-form'
import { useRouter } from 'next/router'

import { PageLayout, WeSentCode } from 'components'
import { Link } from 'ui'
import { DataStep } from './steps'

import { ROUTE_NAMES } from 'core'
import { useAuth } from 'hooks'
import { FormFields, Step } from './SignUp.types'

import * as S from './SignUp.styled'

type UserType = 'individual' | 'ooo' | 'entrepreneur'

interface SignUpData {
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

export const SignUpPage: NextPage = () => {
  const router = useRouter()
  const useFormProps = useForm<FormFields>({
    defaultValues: {
      userType: 'individual'
    }
  })
  const { getValues } = useFormProps
  const phone = getValues('phone')

  const [step, setStep] = useState<Step>('data')

  const { signUp, verifyCode, confirmCode, signUpProcessing } = useAuth()

  const onCodeSubmit = async (code: number) => {
    await confirmCode({ phone, code: String(code) })
    router.push(ROUTE_NAMES.ACCOUNT_PERSONAL_INFO)
  }

  const onSignUpDataSubmit = (data: SignUpData) => {
    signUp(data)
    setStep('code')
  }

  return (
    <S.SignUpPage>
      <Head>
        <title>Регистрация</title>
      </Head>

      <PageLayout>
        <S.Box>
          <S.Top>
            <Typography variant="h2">Регистрация</Typography>
          </S.Top>

          <S.StepsContent>
            {step === 'data' ? (
              <FormProvider {...useFormProps}>
                <DataStep loading={signUpProcessing} onDataSubmit={onSignUpDataSubmit} />
              </FormProvider>
            ) : (
              <WeSentCode
                phone={phone}
                loading={verifyCode.isLoading}
                onResend={() => signUp(getValues())}
                onCodeSubmit={onCodeSubmit}
              />
            )}
          </S.StepsContent>

          <S.Bottom>
            <Typography>Есть аккаунт?</Typography>
            <Link href={ROUTE_NAMES.SIGN_IN}>Войти</Link>
          </S.Bottom>
        </S.Box>
      </PageLayout>
    </S.SignUpPage>
  )
}
