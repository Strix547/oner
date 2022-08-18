import { useQuery } from 'react-query'
import { SelectProps as MuiSelectProps } from '@mui/material/Select'

import { Select } from 'ui'

import { shipmentAPI } from 'api'

import * as S from './DeliveryTypeSelect.styled'

interface DeliveryTypeSelectProps extends Omit<MuiSelectProps, 'onChange'> {
  name: string
  label?: string
  onChange: (deliveryTypeId: number) => void
}

export const DeliveryTypeSelect = ({
  name,
  label = 'Тип доставки',
  onChange
}: DeliveryTypeSelectProps) => {
  const { data: deliveryTypes = [], isLoading: isDeliveryTypesLoading } = useQuery(
    'shipmnent-types',
    shipmentAPI.getDeliveryTypes
  )

  const deliveryTypesOptions = deliveryTypes.map(({ id, title }) => {
    return {
      label: title,
      value: id
    }
  })

  return (
    <S.DeliveryTypeSelect>
      <Select
        name={name}
        label={label}
        options={deliveryTypesOptions}
        isLoading={isDeliveryTypesLoading}
        onChange={({ target }) => {
          onChange(target.value as number)
        }}
      />
    </S.DeliveryTypeSelect>
  )
}
