import { useForm, FormProvider } from 'react-hook-form'
import { useEffect } from 'react'

import { PersonFields } from 'components/forms'
import { Box } from 'common'
import { Button, Skeleton } from 'ui'

import { User } from 'types/account'
import { DeliveryAddress } from 'types/orders'
import { formatPhone, getFullAddressStr } from 'utils'

import * as S from './CustomerInfoCard.styled'

interface FormFields {
  firstName: string
  middleName: string
  lastName: string
  email: string
  phone: string
}

interface CustomerInfoCardProps {
  info: User
  deliveryAddress: DeliveryAddress
  editable?: boolean
  isChanging?: boolean
  onCustomerChange?: (fields: FormFields) => void
}

export const CustomerInfoCard = ({
  info,
  deliveryAddress,
  editable = false,
  isChanging = false,
  onCustomerChange
}: CustomerInfoCardProps) => {
  const useFormProps = useForm<FormFields>()
  const { handleSubmit, reset } = useFormProps

  useEffect(() => {
    if (editable) {
      const { firstName, middleName, lastName, phone, email } = info

      reset({ firstName, middleName, lastName, phone, email })
    }
  }, [info, editable])

  const { firstName, middleName, lastName, email, phone } = info
  const { city, street, house, building, apartment } = deliveryAddress

  const onCustomerSubmit = ({ firstName, middleName, lastName, email, phone }: FormFields) => {
    if (onCustomerChange) {
      onCustomerChange({ firstName, middleName, lastName, email, phone })
    }
  }

  return (
    <S.CustomerInfoCard>
      <Box title="Информация о покупателе">
        {!editable ? (
          <S.List>
            <S.ListItem>
              <S.Label>ФИО</S.Label>
              <S.Value>
                {firstName} {middleName} {lastName}
              </S.Value>
            </S.ListItem>

            <S.ListItem>
              <S.Label>Электронная почта</S.Label>
              <S.Value>{email}</S.Value>
            </S.ListItem>

            <S.ListItem>
              <S.Label>Телефон</S.Label>
              <S.Value>{phone ? formatPhone(phone) : null}</S.Value>
            </S.ListItem>

            <S.ListItem>
              <S.Label>Адрес доставки</S.Label>
              <S.Value>{getFullAddressStr({ city, street, house, building, apartment })}</S.Value>
            </S.ListItem>
          </S.List>
        ) : (
          <FormProvider {...useFormProps}>
            <S.Form onSubmit={handleSubmit(onCustomerSubmit)}>
              {!isChanging ? (
                <PersonFields />
              ) : (
                <S.SkeletonGrid>
                  <Skeleton count={5} height={47.88} />
                </S.SkeletonGrid>
              )}

              <Button type="submit" loading={isChanging}>
                Сохранить
              </Button>
            </S.Form>
          </FormProvider>
        )}
      </Box>
    </S.CustomerInfoCard>
  )
}
