import { useMemo } from 'react'
import Link from 'next/link'
import { Column } from 'react-table'
import Typography from '@mui/material/Typography'

import { OrderStatusBadge } from 'components'
import { Table, Button, Skeleton } from 'ui'

import { numberToPrice, formatOrder } from 'utils'
import { OrderStatus, Order } from 'types/orders'

import * as S from './Orders.styled'

import DownloadIcon from 'public/icons/download-box.svg'

interface OrderFormatted {
  id: number
  date: string
  status: OrderStatus
  products: string[]
  paymentType: string
  delivery: {
    type: string
    price: number
  }
  priceTotal: number
}

interface OrdersTableProps {
  orders?: Order[]
  orderPath: string
  isLoading?: boolean
  onArchiveToggle: (id: number, isArchived: boolean) => void
}

export const OrdersTable = ({
  orders = [],
  orderPath,
  isLoading,
  onArchiveToggle
}: OrdersTableProps) => {
  const columns: Column<OrderFormatted & { archive: null }>[] = useMemo(
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
        },
        sortable: true
      },
      {
        Header: 'Дата заказа',
        accessor: 'date',
        Cell: ({ value: date }) => {
          return new Date(date).toLocaleDateString()
        },
        sortable: true
      },
      {
        Header: 'Статус',
        accessor: 'status',
        Cell: ({ value: status }) => {
          return <OrderStatusBadge status={status} />
        }
      },
      {
        Header: 'Состав заказа',
        accessor: 'products',
        Cell: ({ value: products }) => {
          const productsString = products.join(', ')
          const slicedProductsString =
            productsString.length >= 45
              ? products.join(', ').slice(0, 45).concat('...')
              : productsString

          return (
            <S.ColumnShrink>
              <Typography>{slicedProductsString}</Typography>
            </S.ColumnShrink>
          )
        }
      },
      {
        Header: 'Тип оплаты',
        accessor: 'paymentType'
      },
      {
        Header: 'Тип доставки, стоимость',
        accessor: 'delivery',
        Cell: ({ value: delivery }) => {
          return (
            <S.ColumnShrink>
              <Typography>
                {delivery.type} <br />
                <Typography component="span" fontWeight={500}>
                  {numberToPrice(delivery.price)}
                </Typography>
              </Typography>
            </S.ColumnShrink>
          )
        }
      },
      {
        Header: 'Общая сумма',
        accessor: 'priceTotal',
        Cell: ({ value: priceTotal }) => {
          return <Typography fontWeight={500}>{numberToPrice(priceTotal)}</Typography>
        }
      },
      {
        accessor: 'archive',
        Cell: ({ row }) => {
          const { status, id } = row.original
          const ableToMoveInArchive = status === 'completed' || status === 'cancelled_2'
          const currentOrder = orders.find((order: Order) => order.id === id)

          if (ableToMoveInArchive) {
            return (
              <Button
                variant="text"
                onClick={() => {
                  onArchiveToggle(id, Boolean(currentOrder?.isArchived))
                }}
              >
                <DownloadIcon />
              </Button>
            )
          }

          return null
        }
      }
    ],
    [orderPath, onArchiveToggle]
  )

  const tableCards = orders.length ? (
    orders.map(formatOrder).map((order) => {
      const { id, status, products, paymentType, delivery, priceTotal, date } = order

      const ableToMoveInArchive = status === 'completed' || status === 'cancelled_2'
      const productsString = products.join(', ')
      const slicedProductsString =
        productsString.length >= 45
          ? products.join(', ').slice(0, 45).concat('...')
          : productsString
      const currentOrder = orders.find((order: Order) => order.id === id)

      return (
        <S.TableCard key={id}>
          <S.TableCardTop>
            <Link href={`${orderPath}/${id}`} passHref>
              <S.Link>№ {id}</S.Link>
            </Link>

            <S.TableCardTopRight>
              <span>{new Date(date).toLocaleDateString()}</span>
              {ableToMoveInArchive && (
                <Button
                  variant="text"
                  onClick={() => {
                    onArchiveToggle(id, Boolean(currentOrder?.isArchived))
                  }}
                >
                  <DownloadIcon />
                </Button>
              )}
            </S.TableCardTopRight>
          </S.TableCardTop>

          <S.TableCardContent>
            <S.TableCardRows>
              <Typography>Статус</Typography>
              <OrderStatusBadge status={status} />

              <Typography>Состав заказа</Typography>
              <Typography>{slicedProductsString}</Typography>

              <Typography>Тип оплаты</Typography>
              <Typography>{paymentType}</Typography>

              <Typography>Тип доставки, стоимость</Typography>
              <Typography>
                {delivery.type} <br />
                <S.DeliveryPrice>{numberToPrice(delivery.price)}</S.DeliveryPrice>
              </Typography>

              <Typography>Общая сумма</Typography>
              <S.PriceTotal>{numberToPrice(priceTotal)}</S.PriceTotal>
            </S.TableCardRows>
          </S.TableCardContent>
        </S.TableCard>
      )
    })
  ) : (
    <S.NoDataText>Данные отсутствуют</S.NoDataText>
  )

  return (
    <S.OrdersTable>
      <Table columns={columns} data={orders.map(formatOrder)} isLoading={isLoading} />

      <S.TableCardsList>
        {!isLoading ? tableCards : <Skeleton count={3} height={222} />}
      </S.TableCardsList>
    </S.OrdersTable>
  )
}
