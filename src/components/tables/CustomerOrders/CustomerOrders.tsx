import { useMemo } from 'react'
import { Column } from 'react-table'
import Link from 'next/link'
import Typography from '@mui/material/Typography'

import { Table, Button, Skeleton } from 'ui'
import { CancelButton, ChatButton } from 'common/buttons'
import { OrderStatusBadge } from 'components'

import { ROUTE_NAMES } from 'core'
import { numberToPrice, formatOrder } from 'utils'
import { Order, OrderStatus } from 'types/orders'

import * as S from './CustomerOrders.styled'

import CrossIcon from 'public/icons/cross-2.svg'
import ChatIcon from 'public/icons/chat-3.svg'

interface OrderFormatted {
  id: number
  date: string
  status: OrderStatus
  paymentType: string
  delivery: {
    type: string
    price: number
  }
  priceTotal: number
  actions: null
}

interface CustomerOrdersTableProps {
  orders?: Order[]
  isLoading?: boolean
  onOrderCancel: (id: number) => void
  onChatOpen: (id: number) => void
}

export const CustomerOrdersTable = ({
  orders = [],
  isLoading,
  onOrderCancel,
  onChatOpen
}: CustomerOrdersTableProps) => {
  const columns: Column<OrderFormatted>[] = useMemo(
    () => [
      {
        Header: 'Номер заказа',
        accessor: 'id',
        Cell: ({ value: id }) => {
          return (
            <Link href={`${ROUTE_NAMES.CUSTOMER_ORDERS}/${id}`} passHref>
              <S.Link>№ {id}</S.Link>
            </Link>
          )
        }
      },
      {
        Header: 'Дата заказа',
        accessor: 'date',
        Cell: ({ value: date }) => {
          return new Date(date).toLocaleDateString()
        }
      },
      {
        Header: 'Тип доставки',
        accessor: 'delivery',
        Cell: ({ value: delivery }) => {
          return delivery.type
        }
      },
      {
        Header: 'Тип оплаты',
        accessor: 'paymentType'
      },
      {
        Header: 'Стоимость',
        accessor: 'priceTotal',
        Cell: ({ value: priceTotal }) => {
          return <Typography fontWeight={500}>{numberToPrice(priceTotal)}</Typography>
        }
      },
      {
        Header: 'Текущий статус',
        accessor: 'status',
        Cell: ({ value: status }) => {
          return <OrderStatusBadge status={status} />
        }
      },
      {
        accessor: 'actions',
        Cell: ({ row }) => {
          const orderId = row.original.id

          return (
            <S.ActionsRow>
              <CancelButton
                onClick={() => {
                  onOrderCancel(orderId)
                }}
              />

              <ChatButton
                onClick={() => {
                  onChatOpen(orderId)
                }}
              />
            </S.ActionsRow>
          )
        }
      }
    ],
    [onOrderCancel]
  )

  const tableCardsList = orders.length ? (
    orders.map(formatOrder).map((order) => {
      const { id, date, delivery, paymentType, priceTotal, status } = order

      return (
        <S.TableCard key={id}>
          <S.TableCardTop>
            <Link href={`${ROUTE_NAMES.CUSTOMER_ORDERS}/${id}`} passHref>
              <S.Link>№ {id}</S.Link>
            </Link>

            <span>{new Date(date).toLocaleDateString()}</span>
          </S.TableCardTop>

          <S.TableCardContent>
            <S.TableCardRows>
              <Typography>Тип доставки</Typography>
              <Typography>{delivery.type}</Typography>

              <Typography>Тип оплаты</Typography>
              <Typography>{paymentType}</Typography>

              <Typography>Стоимость</Typography>
              <Typography fontWeight={500}>{numberToPrice(priceTotal)}</Typography>

              <Typography>Статус</Typography>
              <OrderStatusBadge status={status} />
            </S.TableCardRows>

            <S.TableCardActions>
              <Button
                color="gray"
                variant="outlined"
                startIcon={<CrossIcon />}
                onClick={() => {
                  onOrderCancel(id)
                }}
              >
                Отменить
              </Button>

              <Button
                color="gray"
                variant="outlined"
                startIcon={<ChatIcon />}
                onClick={() => {
                  onChatOpen(id)
                }}
              >
                Поддержка
              </Button>
            </S.TableCardActions>
          </S.TableCardContent>
        </S.TableCard>
      )
    })
  ) : (
    <S.NoDataText>Данные отсутствуют</S.NoDataText>
  )

  return (
    <S.CustomerOrdersTable>
      <Table
        columns={columns}
        isLoading={isLoading}
        data={orders.map((order) => {
          return {
            ...formatOrder(order),
            actions: null
          }
        })}
      />

      <S.TableCardsList>
        {!isLoading ? tableCardsList : <Skeleton count={3} height={282} />}
      </S.TableCardsList>
    </S.CustomerOrdersTable>
  )
}
