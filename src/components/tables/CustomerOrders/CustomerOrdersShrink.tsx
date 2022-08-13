import { useMemo } from 'react'
import { Column } from 'react-table'
import Link from 'next/link'
import Typography from '@mui/material/Typography'

import { OrderStatusBadge } from 'components'
import { Table } from 'ui'

import { formatOrder, numberToPrice } from 'utils'
import { Order, OrderStatus } from 'types/orders'

import * as S from './CustomerOrders.styled'

interface OrderFormatted {
  id: number
  date: string
  status: OrderStatus
  paymentType: string
  deliveryType: string
  deliveryPrice: number
  priceTotal: number
}

interface CustomerOrdersTableProps {
  orders?: Order[]
  orderPath: string
}

export const CustomerOrdersShrinkTable = ({ orders = [], orderPath }: CustomerOrdersTableProps) => {
  const columns: Column<OrderFormatted>[] = useMemo(
    () => [
      {
        Header: 'Номер заказа',
        accessor: 'id',
        Cell: ({ value: id }) => {
          return (
            <Link href={`${orderPath}/${id}`} passHref>
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
        Header: 'Статус',
        accessor: 'status',
        Cell: ({ value: status }) => {
          return <OrderStatusBadge status={status} />
        }
      },
      {
        Header: 'Тип оплаты',
        accessor: 'paymentType'
      },
      {
        Header: 'Тип доставки',
        accessor: 'deliveryType'
      },
      {
        Header: 'Стоимость доставки',
        accessor: 'deliveryPrice',
        Cell: ({ value: deliveryPrice }) => {
          return <Typography fontWeight={500}>{numberToPrice(deliveryPrice)}</Typography>
        }
      },
      {
        Header: 'Общая сумма',
        accessor: 'priceTotal',
        Cell: ({ value: priceTotal }) => {
          return <Typography fontWeight={500}>{numberToPrice(priceTotal)}</Typography>
        }
      }
    ],
    [orderPath]
  )

  const tableOrdersData = orders.map((order) => {
    const { delivery, ...rest } = formatOrder(order)

    return {
      ...rest,
      deliveryType: delivery.type,
      deliveryPrice: delivery.price
    }
  })

  const tableCards = orders.length ? (
    tableOrdersData.map((order) => {
      const { id, date, status, paymentType, deliveryType, deliveryPrice, priceTotal } = order

      return (
        <S.TableCard key={id}>
          <S.TableCardTop>
            <Link href={`${orderPath}/${id}`} passHref>
              <S.Link>№ {id}</S.Link>
            </Link>
          </S.TableCardTop>

          <S.TableCardContent>
            <S.TableCardRows>
              <Typography>Дата заказа</Typography>
              <Typography>{new Date(date).toLocaleDateString()}</Typography>

              <Typography>Статус</Typography>
              <OrderStatusBadge status={status} />

              <Typography>Тип оплаты</Typography>
              <Typography>{paymentType}</Typography>

              <Typography>Тип доставки</Typography>
              <Typography>{deliveryType}</Typography>

              <Typography>Стоимость доставки</Typography>
              <Typography fontWeight={500}>{numberToPrice(deliveryPrice)}</Typography>

              <Typography>Общая сумма</Typography>
              <Typography fontWeight={500}>{numberToPrice(priceTotal)}</Typography>
            </S.TableCardRows>
          </S.TableCardContent>
        </S.TableCard>
      )
    })
  ) : (
    <S.NoDataText>Данные отсутствуют</S.NoDataText>
  )

  return (
    <S.CustomerOrdersShrinkTable>
      <Table columns={columns} data={tableOrdersData} />

      <S.TableCardsList>{tableCards}</S.TableCardsList>
    </S.CustomerOrdersShrinkTable>
  )
}
