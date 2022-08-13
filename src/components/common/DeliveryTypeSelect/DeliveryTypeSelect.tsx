import { useQuery } from 'react-query'

import { Select } from 'ui'

import { shipmentAPI } from 'api'

import * as S from './DeliveryTypeSelect.styled'

interface DeliveryTypeSelectProps {
  name: string
  label?: string
}

export const DeliveryTypeSelect = ({ name, label = 'Тип доставки' }: DeliveryTypeSelectProps) => {
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
      />
    </S.DeliveryTypeSelect>
  )
}
