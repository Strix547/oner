import { useQuery } from 'react-query'
import { SelectProps as MuiSelectProps } from '@mui/material/Select'

import { Select } from 'ui'

import { constantsAPI } from 'api'

import * as S from './PaymentTypeSelect.styled'

interface PaymentTypeSelectProps extends Omit<MuiSelectProps, 'onChange'> {
  name: string
  label?: string
  onChange: (id: number) => void
}

export const PaymentTypeSelect = ({
  name,
  label = 'Тип оплаты',
  onChange
}: PaymentTypeSelectProps) => {
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
        onChange={({ target }) => {
          onChange(target.value as number)
        }}
      />
    </S.PaymentTypeSelect>
  )
}
