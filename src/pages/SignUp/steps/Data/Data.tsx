import { SubmitHandler, useFormContext } from 'react-hook-form'

import { RadioGroup, TextField, PhoneField, Button } from 'ui'

import { UserType, FormFields } from '../../SignUp.types'

import * as S from './Data.styled'

interface UserTypeOption {
  label: string
  value: UserType
}

interface DataStepProps {
  loading?: boolean
  onDataSubmit: SubmitHandler<FormFields>
}

export const DataStep = ({ loading, onDataSubmit }: DataStepProps) => {
  const { handleSubmit, watch } = useFormContext<FormFields>()

  const userType = watch('userType')

  const userTypes: UserTypeOption[] = [
    { label: 'Физ. лицо', value: 'individual' },
    { label: 'ООО', value: 'ooo' },
    { label: 'ИП', value: 'entrepreneur' }
  ]

  return (
    <S.Form onSubmit={handleSubmit(onDataSubmit)}>
      <RadioGroup name="userType" options={userTypes} />

      <TextField name="firstName" label="Ваше имя" />

      <PhoneField name="phone" />

      <TextField type="email" name="email" label="Электронная почта" />

      {userType !== 'individual' && (
        <>
          <TextField type="number" name="inn" label="ИНН" />
          <TextField type="number" name="checkingAccount" label="Р/сч" />
          <TextField type="number" name="bik" label="БИК" />
          <TextField type="number" name="ogrn" label="ОГРН" />
        </>
      )}

      {userType === 'ooo' && <TextField name="legalAddress" label="Юридический адрес" />}

      <Button type="submit" loading={loading}>
        Зарегистрироваться
      </Button>
    </S.Form>
  )
}
