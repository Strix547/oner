import { Select } from 'ui'

import { ORDER_STATUSES } from 'constant'

import * as S from './OrderStatusSelect.styled'

export const OrderStatusSelect = () => {
  return (
    <S.OrderStatusSelect>
      <Select
        name="status"
        options={ORDER_STATUSES.filter(
          ({ value }) => value !== 'canceled_2' || value !== 'canceled_1'
        )}
        label="Выберите статус"
        withReset
      />
    </S.OrderStatusSelect>
  )
}
