import { useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FormProvider, useForm } from 'react-hook-form'
import Typography from '@mui/material/Typography'
import TabContext from '@mui/lab/TabContext'

import { PageLayout, WeSentCode } from 'components'
import { Tabs, Tab, TabPanel, Link, TextField, PhoneField, Checkbox, Button } from 'ui'

import { ROUTE_NAMES } from 'core'
import { useAuth } from 'hooks'

import * as S from './SignIn.styled'

interface FormFields {
  email: string
  password: string
  phone: string
  remember: boolean
}

type Tab = 'email' | 'phone'

type Step = 'phone' | 'code'

export const SignInPage: NextPage = () => {
  const router = useRouter()
  const useFormProps = useForm<FormFields>()
  const { handleSubmit, getValues } = useFormProps

  const [tab, setTab] = useState<Tab>('email')
  const [step, setStep] = useState<Step>('phone')

  const phone = getValues('phone')

  const { loginPhone, confirmCode, isTokenCreating } = useAuth()

  const onCodeResend = () => {
    loginPhone.mutate(phone)
  }

  const onCodeSubmit = async (code: number) => {
    await confirmCode({ phone, code: String(code) })
    router.push(ROUTE_NAMES.ACCOUNT_PERSONAL_INFO)
  }

  const onTabChange = (_: React.SyntheticEvent, value: Tab) => {
    setTab(value)
  }

  const onSignIn = async ({ email, password, phone, remember }: FormFields) => {
    if (tab === 'email') {
      console.log(email, password, remember)
    }

    if (tab === 'phone') {
      await loginPhone.mutateAsync(phone)
      setStep('code')
    }
  }

  return (
    <S.SignInPage>
      <Head>
        <title>Вход</title>
      </Head>

      <PageLayout>
        <S.Box>
          <S.Top>
            <Typography variant="h2">Вход</Typography>
          </S.Top>

          <TabContext value={tab}>
            <FormProvider {...useFormProps}>
              <S.Form onSubmit={handleSubmit(onSignIn)}>
                <Tabs value={tab} onChange={onTabChange}>
                  <Tab label="Электронная почта" value="email" />
                  <Tab label="Номер телефона" value="phone" />
                </Tabs>

                <TabPanel value="email">
                  <TextField type="email" name="email" label="Электронная почта" />
                  <TextField type="password" name="password" label="Пароль" />

                  <S.FormRow>
                    <Checkbox name="remember" label="Запомнить меня" />
                    <Link href={ROUTE_NAMES.FORGOT_PASSWORD}>Я забыл свой пароль</Link>
                  </S.FormRow>
                </TabPanel>

                <TabPanel value="phone">
                  {step === 'phone' ? (
                    <PhoneField name="phone" />
                  ) : (
                    <WeSentCode
                      loading={isTokenCreating}
                      phone={phone}
                      onResend={onCodeResend}
                      onCodeSubmit={onCodeSubmit}
                    />
                  )}
                </TabPanel>

                <Button type="submit">Войти</Button>
              </S.Form>
            </FormProvider>
          </TabContext>

          <S.Bottom>
            <Typography>Нет аккаунта?</Typography>
            <Link href={ROUTE_NAMES.SIGN_UP}>Зарегистрироваться</Link>
          </S.Bottom>
        </S.Box>
      </PageLayout>
    </S.SignInPage>
  )
}
