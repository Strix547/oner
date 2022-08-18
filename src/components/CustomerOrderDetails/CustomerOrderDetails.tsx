import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'

import { Button } from 'ui'
import { DeliveryTypeSelect, PaymentTypeSelect } from 'components/common'

import { getFullAddressStr } from 'utils'
import { DeliveryAddress } from 'types/orders'

import * as S from './CustomerOrderDetails.styled'

import PenIcon from 'public/icons/pen.svg'

interface FormFields {
  deliveryType: number
  paymentType: number
}

interface OptionType {
  id: number
  title: string
}

interface CustomerOrderDetailsProps {
  address: DeliveryAddress
  deliveryType: OptionType
  paymentType: OptionType
  editable?: boolean
  onPaymentTypeChange: (id: number) => void
  onDeliveryTypeChange: (id: number) => void
}

export const CustomerOrderDetails = ({
  address,
  paymentType,
  deliveryType,
  editable = false,
  onPaymentTypeChange,
  onDeliveryTypeChange
}: CustomerOrderDetailsProps) => {
  const useFormProps = useForm<FormFields>({
    defaultValues: {
      deliveryType: deliveryType.id,
      paymentType: paymentType.id
    }
  })

  const [isPaymentTypeEditing, setPaymentTypeEditing] = useState(false)
  const [isDeliveryTypeEditing, setDeliveryTypeEditing] = useState(false)

  const { city, street, house, building, apartment } = address

  return (
    <S.CustomerOrderDetails>
      <S.Left>
        <S.Label>Адрес доставки</S.Label>
        <S.Value>{getFullAddressStr({ city, street, house, building, apartment })}</S.Value>

        <FormProvider {...useFormProps}>
          <S.Label>Тип оплаты</S.Label>

          {!isPaymentTypeEditing ? (
            <S.ValueEditable>
              {paymentType.title}

              {editable && (
                <Button
                  variant="text"
                  onClick={() => {
                    setPaymentTypeEditing(true)
                  }}
                >
                  <PenIcon />
                </Button>
              )}
            </S.ValueEditable>
          ) : (
            <PaymentTypeSelect name="paymentType" onChange={onPaymentTypeChange} />
          )}

          <S.Label>Тип доставки</S.Label>

          {!isDeliveryTypeEditing ? (
            <S.ValueEditable>
              {deliveryType.title}

              {editable && (
                <Button
                  variant="text"
                  onClick={() => {
                    setDeliveryTypeEditing(true)
                  }}
                >
                  <PenIcon />
                </Button>
              )}
            </S.ValueEditable>
          ) : (
            <DeliveryTypeSelect name="deliveryType" onChange={onDeliveryTypeChange} />
          )}
        </FormProvider>
      </S.Left>

      {editable && <Button>Оплатить</Button>}
    </S.CustomerOrderDetails>
  )
}
