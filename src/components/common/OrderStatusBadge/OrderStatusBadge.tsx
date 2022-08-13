import { PRODUCT_STATUSES } from 'constant'
import { ProductStatus } from 'types/orders'

import * as S from './OrderStatusBadge.styled'

interface OrderStatusBadgeProps {
  status: ProductStatus
}

export const OrderStatusBadge = ({ status }: OrderStatusBadgeProps) => {
  const getStatusColor = (status: ProductStatus) => {
    switch (status) {
      case 'ordered':
        return 'green'
      case 'prepared':
        return 'orange'
      case 'shipped':
        return 'blue'
      case 'oos':
      case 'cancelled':
        return 'gray'
    }
  }

  const statusText = PRODUCT_STATUSES.find(({ value }) => status === value)?.label

  return (
    <S.OrderStatusBadge color={getStatusColor(status)} transparent>
      {statusText}
    </S.OrderStatusBadge>
  )
}
