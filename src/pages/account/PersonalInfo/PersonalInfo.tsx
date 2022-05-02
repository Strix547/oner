import { NextPage } from 'next'
import { useEffect } from 'react'
import Head from 'next/head'
import { FormProvider, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

import { PageLayout, AccountLayout } from 'components'
import { TextField, EmailField, PhoneField, Button } from 'ui'

import { useAuth } from 'hooks'
import { accountAPI } from 'api'

import * as S from './PersonalInfo.styled'

interface FormFields {
  firstName: string
  middleName: string
  lastName: string
  phone: string
  email: string
}

export const AccountPersonalInfoPage: NextPage = () => {
  const useFormProps = useForm<FormFields>()
  const { handleSubmit, reset } = useFormProps

  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      const { lastName, firstName, middleName, phone, email } = user
      reset({ lastName, firstName, middleName, phone, email })
    }
  }, [user, reset])

  const changeMe = useMutation((fields: Omit<FormFields, 'email'>) => accountAPI.changeMe(fields), {
    onError: () => {
      toast.error('Ошибка!')
    },
    onSuccess: () => {
      toast.success('Данные успешно изменены')
    }
  })

  const onPersonalInfoChange = ({ firstName, middleName, lastName, phone }: FormFields) => {
    changeMe.mutate({ firstName, middleName, lastName, phone })
  }

  return (
    <S.AccountPersonalInfoPage>
      <Head>
        <title>Персональная информация</title>
      </Head>

      <PageLayout>
        <AccountLayout title="Персональная информация">
          <S.Box>
            <FormProvider {...useFormProps}>
              <S.Form onSubmit={handleSubmit(onPersonalInfoChange)}>
                <TextField name="lastName" label="Фамилия" placeholder="Фамилия" />
                <TextField name="firstName" label="Имя" placeholder="Имя" />
                <TextField name="middleName" label="Отчество" placeholder="Отчество" />
                <PhoneField name="phone" />
                <EmailField name="email" disabled />

                <Button type="submit" loading={changeMe.isLoading}>
                  Сохранить изменения
                </Button>
              </S.Form>
            </FormProvider>
          </S.Box>
        </AccountLayout>
      </PageLayout>
    </S.AccountPersonalInfoPage>
  )
}
