import Head from 'next/head'
import Typography from '@mui/material/Typography'
import { useForm, FormProvider } from 'react-hook-form'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

import { Link, EmailField, TextField, Button } from 'ui'

import { ROUTE_NAMES } from 'core'
import { accountAPI } from 'api'

import * as S from 'styled/pages/ForgotPassword'

interface FormFields {
  email: string
  newPassword: string
}

const ForgotPasswordPage = () => {
  const router = useRouter()
  const { reset_uid: uid, reset_token: token } = router.query
  const useFormProps = useForm<FormFields>()
  const { handleSubmit, reset } = useFormProps

  const [step, setStep] = useState(0)

  useEffect(() => {
    if (uid && token) {
      setStep(1)
    }
  }, [uid, token])

  const resetPassword = useMutation(accountAPI.resetPassword, {
    onError: () => {
      toast.error('Ошибка')
    },
    onSuccess: () => {
      toast.success('Сообщение отправлено на ваш e-mail адрес')
    }
  })

  const resetPasswordConfirm = useMutation(accountAPI.resetPasswordConfirm, {
    onError: () => {
      toast.error('Ошибка')
    },
    onSuccess: () => {
      setStep(0)
      toast.success('Пароль успешно изменён')
      router.replace(router.pathname, undefined, { shallow: true })
    }
  })

  const onResetPasswordSubmit = ({ email }: FormFields) => {
    resetPassword.mutate(email)
    reset({
      email: ''
    })
  }

  const onResetPasswordConfirmSubmit = ({ newPassword }: FormFields) => {
    if (typeof uid === 'string' && typeof token === 'string') {
      resetPasswordConfirm.mutate({ uid, token, newPassword })
    }
  }

  return (
    <>
      <Head>
        <title>Восстановление пароля</title>
      </Head>

      <S.Box>
        <S.Top>
          <Typography variant="h2">Восстановление пароля</Typography>
        </S.Top>

        <S.Content>
          <FormProvider {...useFormProps}>
            {step === 0 ? (
              <S.Form onSubmit={handleSubmit(onResetPasswordSubmit)}>
                <EmailField name="email" />

                <Button type="submit" fullWidth loading={resetPassword.isLoading}>
                  Восстановить
                </Button>
              </S.Form>
            ) : (
              <S.Form onSubmit={handleSubmit(onResetPasswordConfirmSubmit)}>
                <TextField name="newPassword" type="password" label="Новый пароль" />

                <Button type="submit" fullWidth loading={resetPasswordConfirm.isLoading}>
                  Сохранить
                </Button>
              </S.Form>
            )}
          </FormProvider>
        </S.Content>

        {false && (
          <S.Content>
            <FormProvider {...useFormProps}>
              <S.Form onSubmit={handleSubmit(onResetPasswordConfirmSubmit)}>
                <TextField name="newPassword" type="password" label="Новый пароль" />

                <Button type="submit" fullWidth>
                  Сохранить
                </Button>
              </S.Form>
            </FormProvider>
          </S.Content>
        )}

        <S.Bottom>
          <Typography>Вспомнили пароль?</Typography>
          <Link href={ROUTE_NAMES.SIGN_IN}>Войти</Link>
        </S.Bottom>
      </S.Box>
    </>
  )
}

export default ForgotPasswordPage
