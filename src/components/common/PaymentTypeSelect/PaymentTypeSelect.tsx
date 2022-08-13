import { useQuery } from 'react-query'

import { Select } from 'ui'

import { constantsAPI } from 'api'

import * as S from './PaymentTypeSelect.styled'

interface PaymentTypeSelectProps {
  name: string
  label?: string
}

export const PaymentTypeSelect = ({ name, label = 'Тип оплаты' }: PaymentTypeSelectProps) => {
  const { data: paymentTypes = [], isLoading: isPaymentTypesLoading } = useQuery(
    'payment-types',
    constantsAPI.getPaymentMethods
  )

  const paymentTypeOptions = paymentTypes.map(({ id, title }) => {
    return {
      label: title,
      value: id
    }
  })

  return (
    <S.PaymentTypeSelect>
      <Select
        name={name}
        label={label}
        options={paymentTypeOptions}
        isLoading={isPaymentTypesLoading}
      />
    </S.PaymentTypeSelect>
  )
}
