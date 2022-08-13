import { FormProvider, useForm } from 'react-hook-form'

import { Select } from 'ui'
import { Box } from 'common'
import { PaymentTypeSelect } from 'components/common'

import * as S from './PaymentTypeCard.styled'

import CheckFilledIcon from 'public/icons/check-filled.svg'
import { useEffect } from 'react'

interface PaymentInfo {
  paymentMethod: {
    id: number
    title: string
  }
  payed: boolean
  paymentDateTime: string
}

interface PaymentTypeCardProps {
  info?: PaymentInfo
  editable?: boolean
  onPaymentTypeChange?: (id: number) => void
}

export const PaymentTypeCard = ({
  info,
  editable = false,
  onPaymentTypeChange
}: PaymentTypeCardProps) => {
  const useFormProps = useForm()
  const { watch, reset, getValues } = useFormProps

  const paymentType = watch('paymentType')

  useEffect(() => {
    const paymentType = getValues('paymentType')

    if (editable && info && !paymentType) {
      reset({
        paymentType: info.paymentMethod.id
      })
    }
  }, [reset, getValues, info])

  useEffect(() => {
    if (editable && onPaymentTypeChange && paymentType !== info?.paymentMethod.id) {
      onPaymentTypeChange(paymentType)
    }
  }, [paymentType])

  if (!editable) {
    const { paymentMethod, payed, paymentDateTime } = info || {}

    return (
      <S.PaymentTypeCard>
        <Box title="Тип оплаты">
          <S.List>
            <S.ListItem>
              <S.Label>Способ оплаты</S.Label>
              <S.Value>{paymentMethod?.title ?? ''}</S.Value>
            </S.ListItem>

            <S.ListItem>
              <S.Label>Статус</S.Label>
              <S.Value>
                {payed ? (
                  <S.PayedStatus>
                    <CheckFilledIcon />
                    <span>Оплачен</span>
                  </S.PayedStatus>
                ) : (
                  'Не оплачен'
                )}
              </S.Value>
            </S.ListItem>

            {payed && (
              <>
                <S.ListItem>
                  <S.Label>Дата оплаты</S.Label>
                  <S.Value>
                    {paymentDateTime ? new Date(paymentDateTime)?.toLocaleDateString() : null}
                  </S.Value>
                </S.ListItem>

                <S.ListItem>
                  <S.Label>Документ оплаты</S.Label>
                  <S.Link>Электронный чек</S.Link>
                </S.ListItem>
              </>
            )}
          </S.List>
        </Box>
      </S.PaymentTypeCard>
    )
  }

  const paymentStatuses = [
    { label: 'Оплачен', value: 'payed' },
    { label: 'Не оплачен', value: 'not-payed' }
  ]

  return (
    <S.PaymentTypeCard>
      <Box title="Тип оплаты">
        <S.SelectsColumn>
          <FormProvider {...useFormProps}>
            <PaymentTypeSelect name="paymentType" />
            <Select name="status" label="Статус" options={paymentStatuses} />
          </FormProvider>
        </S.SelectsColumn>
      </Box>
    </S.PaymentTypeCard>
  )
}
