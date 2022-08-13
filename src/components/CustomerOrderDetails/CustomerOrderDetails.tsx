import { useState, useEffect } from 'react'
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
  onPaymentTypeChange: (paymentTypeId: number) => void
  onDeliveryTypeChange: (deliveryTypeId: number) => void
}

export const CustomerOrderDetails = ({
  address,
  paymentType,
  deliveryType,
  editable = false,
  onPaymentTypeChange,
  onDeliveryTypeChange
}: CustomerOrderDetailsProps) => {
  const useFormProps = useForm<FormFields>()
  const { watch, reset } = useFormProps
  const deliveryTypeWatch = watch('deliveryType')
  const paymentTypeWatch = watch('paymentType')

  const [isPaymentTypeEditable, setPaymentTypeEditable] = useState(false)
  const [isDeliveryTypeEditable, setDeliveryTypeEditable] = useState(false)

  useEffect(() => {
    reset({
      deliveryType: deliveryType.id,
      paymentType: paymentType.id
    })
  }, [deliveryType, paymentType, reset])

  useEffect(() => {
    if (paymentTypeWatch && paymentTypeWatch !== paymentType.id) {
      onPaymentTypeChange(paymentTypeWatch)
    }
  }, [paymentTypeWatch])

  useEffect(() => {
    if (deliveryTypeWatch && deliveryTypeWatch !== deliveryType.id) {
      onDeliveryTypeChange(deliveryTypeWatch)
    }
  }, [deliveryTypeWatch])

  const { city, street, house, building, apartment } = address

  return (
    <S.CustomerOrderDetails>
      <S.Left>
        <S.Label>Адрес доставки</S.Label>
        <S.Value>{getFullAddressStr({ city, street, house, building, apartment })}</S.Value>

        <FormProvider {...useFormProps}>
          <S.Label>Тип оплаты</S.Label>
          {!isPaymentTypeEditable ? (
            <S.ValueEditable>
              {paymentType.title}

              {editable && (
                <Button
                  variant="text"
                  onClick={() => {
                    setPaymentTypeEditable(true)
                  }}
                >
                  <PenIcon />
                </Button>
              )}
            </S.ValueEditable>
          ) : (
            <PaymentTypeSelect name="paymentType" />
          )}

          <S.Label>Тип доставки</S.Label>
          {!isDeliveryTypeEditable ? (
            <S.ValueEditable>
              {deliveryType.title}

              {editable && (
                <Button
                  variant="text"
                  onClick={() => {
                    setDeliveryTypeEditable(true)
                  }}
                >
                  <PenIcon />
                </Button>
              )}
            </S.ValueEditable>
          ) : (
            <DeliveryTypeSelect name="deliveryType" />
          )}
        </FormProvider>
      </S.Left>

      {editable && <Button>Оплатить</Button>}
    </S.CustomerOrderDetails>
  )
}
