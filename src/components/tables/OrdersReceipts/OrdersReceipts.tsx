import { useMemo } from 'react'
import Link from 'next/link'
import { Column } from 'react-table'
import Typography from '@mui/material/Typography'

import { TableCardsList } from 'components'
import { Table } from 'ui'

import { numberToPrice } from 'utils'
import { Order } from 'types/orders'

import * as S from './OrdersReceipts.styled'

import DocumnetIcon from 'public/icons/document-arrow.svg'

interface ReceiptColumn {
  id: number
  orderDate: string
  status: 'active'
  paymentAmount: number
  paymentDate: string
  documents: string
}

interface OrdersReceiptsTableProps {
  orders?: Order[]
  orderPath: string
  isLoading?: boolean
}

export const OrdersReceiptsTable = ({
  orders = [],
  orderPath,
  isLoading
}: OrdersReceiptsTableProps) => {
  const columns: Column<ReceiptColumn>[] = useMemo(
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
        accessor: 'orderDate',
        Cell: ({ value: orderDate }) => new Date(orderDate).toLocaleDateString()
      },
      {
        Header: 'Статус заказа',
        accessor: 'status',
        Cell: ({ value: status }) => {
          return <S.OrderStatus status={status}>Активный</S.OrderStatus>
        }
      },
      {
        Header: 'Сумма перевода',
        accessor: 'paymentAmount',
        Cell: ({ value: paymentAmount }) => {
          return (
            <Typography component="span" fontWeight={600}>
              {numberToPrice(paymentAmount)}
            </Typography>
          )
        }
      },
      {
        Header: 'Дата перевода',
        accessor: 'paymentDate',
        Cell: ({ value: paymentDate }) => new Date(paymentDate).toLocaleDateString()
      },
      {
        Header: 'Документы по заказу',
        accessor: 'documents',
        Cell: ({ value: documents }) => {
          return (
            <S.DocumentButton variant="text" styled="transparent">
              <DocumnetIcon />
            </S.DocumentButton>
          )
        }
      }
    ],
    [orderPath]
  )

  const selectOrderProps = (orders: Order[]): ReceiptColumn[] => {
    return orders.map((order) => {
      const { id, createdDateTime, saleDateTime, price } = order

      return {
        id,
        orderDate: createdDateTime,
        status: 'active',
        paymentAmount: price,
        paymentDate: saleDateTime,
        documents: ''
      }
    })
  }

  const tableCards = selectOrderProps(orders).map((order) => {
    const { id, orderDate, status, paymentAmount, paymentDate, documents } = order

    return (
      <S.TableCard key={id}>
        <S.TableCardTop>
          <Link href={`${orderPath}/${id}`} passHref>
            <S.Link>№ {id}</S.Link>
          </Link>

          <span>{new Date(orderDate).toLocaleDateString()}</span>
        </S.TableCardTop>

        <S.TableCardContent>
          <S.TableCardRows>
            <Typography>Статус заказа</Typography>
            <S.OrderStatus status={status}>Активный</S.OrderStatus>

            <Typography>Сумма перевода</Typography>
            <Typography component="span" fontWeight={600}>
              {numberToPrice(paymentAmount)}
            </Typography>

            <Typography>Дата перевода</Typography>
            <Typography>{new Date(paymentDate).toLocaleDateString()}</Typography>

            <Typography>Документы по заказу</Typography>
            <S.DocumentButton variant="text" styled="transparent">
              <DocumnetIcon />
            </S.DocumentButton>
          </S.TableCardRows>
        </S.TableCardContent>
      </S.TableCard>
    )
  })

  return (
    <S.OrdersReceiptsTable>
      <Table
        columns={columns}
        data={selectOrderProps(orders)}
        isLoading={isLoading}
        noDataText="Поступления отсутствуют"
      />

      <TableCardsList
        cards={tableCards}
        isLoading={isLoading}
        noDataText="Поступления отсутствуют"
        skeletonHeight={228}
      />
    </S.OrdersReceiptsTable>
  )
}
