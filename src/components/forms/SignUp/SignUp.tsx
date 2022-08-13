import { FormEventHandler } from 'react'

import { RadioGroup, TextField, PhoneField, InnField, OgrnField, BikField, Button } from 'ui'

import * as S from './SignUp.styled'

type UserType = 'individual' | 'ooo' | 'entrepreneur'

interface UserTypeOption {
  label: string
  value: UserType
}

interface SignUpFormProps {
  userType: UserType
  inProcess: boolean
  onSubmit: FormEventHandler<HTMLFormElement>
}

export const SignUpForm = ({ userType, inProcess, onSubmit }: SignUpFormProps) => {
  const userTypes: UserTypeOption[] = [
    { label: 'Физ. лицо', value: 'individual' },
    { label: 'ООО', value: 'ooo' },
    { label: 'ИП', value: 'entrepreneur' }
  ]

  return (
    <S.SignUpForm onSubmit={onSubmit}>
      <RadioGroup name="userType" options={userTypes} />

      <TextField name="firstName" label="Ваше имя" />

      <PhoneField name="phone" />

      <TextField type="email" name="email" label="Электронная почта" />

      {userType !== 'individual' && (
        <>
          <InnField name="inn" />
          <TextField type="number" name="checkingAccount" label="Р/сч" />
          <BikField name="bik" />
          <OgrnField name="ogrn" />
        </>
      )}

      {userType === 'ooo' && <TextField name="legalAddress" label="Юридический адрес" />}

      <Button type="submit" loading={inProcess} fullWidth>
        Зарегистрироваться
      </Button>
    </S.SignUpForm>
  )
}
