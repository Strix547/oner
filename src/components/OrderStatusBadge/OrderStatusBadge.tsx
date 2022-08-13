import { ORDER_STATUSES } from 'constant'
import { OrderStatus } from 'types/orders'

import * as S from './OrderStatusBadge.styled'

interface OrderStatusBadgeProps {
  status: OrderStatus
}

export const OrderStatusBadge = ({ status }: OrderStatusBadgeProps) => {
  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'accepted':
        return 'green'
      case 'payed':
        return 'orange'
      case 'shipping':
        return 'primary'
      case 'shipped':
        return 'blue'
      case 'completed':
        return 'cyan'
      case 'cancelled_1':
      case 'canceled_1':
      case 'cancelled_2':
      case 'canceled_2':
      case 'repeated':
        return 'gray'
    }
  }

  const statusText = ORDER_STATUSES.find(({ value }) => status === value)?.label

  return <S.OrderStatusBadge color={getStatusColor(status)}>{statusText}</S.OrderStatusBadge>
}
