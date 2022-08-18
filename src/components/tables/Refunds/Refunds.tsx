import { useMemo } from 'react'
import { Column } from 'react-table'
import Link from 'next/link'
import Typography from '@mui/material/Typography'

import { OrderStatusBadge, TableCardsList } from 'components'
import { Table } from 'ui'

import { OrderStatus, RefundItem } from 'types/orders'

import * as S from './Refunds.styled'

interface RefundItemColumn {
  orderId: number
  orderDate: string
  orderStatus: OrderStatus
  refundId: number
  refundDate: string
}

interface RefundsTableProps {
  refunds?: RefundItem[]
  orderPath: string
  isLoading?: boolean
}

export const RefundsTable = ({ refunds = [], orderPath, isLoading }: RefundsTableProps) => {
  const columns: Column<RefundItemColumn>[] = useMemo(
    () => [
      {
        Header: 'Номер заказа',
        accessor: 'orderId',
        Cell: ({ value: orderId }) => {
          return (
            <Link href={`${orderPath}/${orderId}`} passHref>
              <S.Link>№ {orderId}</S.Link>
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
        accessor: 'orderStatus',
        Cell: ({ value: status }) => {
          return <OrderStatusBadge status={status} />
        }
      },
      {
        Header: 'Номер возврата',
        accessor: 'refundId',
        Cell: ({ value: refundId }) => {
          return <Typography>№ {refundId}</Typography>
        }
      },
      {
        Header: 'Дата возврата',
        accessor: 'refundDate',
        Cell: ({ value: refundDate }) => new Date(refundDate).toLocaleDateString()
      }
    ],
    [orderPath]
  )

  const selectRefundsProps = (refunds: RefundItem[]): RefundItemColumn[] => {
    return refunds.map((refund) => {
      const { id: refundId, orderInfo, createdDateTime } = refund

      return {
        orderId: orderInfo.id,
        orderDate: orderInfo.createdDateTime,
        orderStatus: orderInfo.status,
        refundId,
        refundDate: createdDateTime
      }
    })
  }

  const tableCards = selectRefundsProps(refunds).map((refund) => {
    const { orderId, orderDate, orderStatus, refundId, refundDate } = refund

    return (
      <S.TableCard key={refundId}>
        <S.TableCardTop>
          <Link href={`${orderPath}/${orderId}`} passHref>
            <S.Link>№ {orderId}</S.Link>
          </Link>
        </S.TableCardTop>

        <S.TableCardContent>
          <S.TableCardRows>
            <Typography>Дата заказа</Typography>
            <Typography>{new Date(orderDate).toLocaleDateString()}</Typography>

            <Typography>Статус заказа</Typography>
            <OrderStatusBadge status={orderStatus} />

            <Typography>Номер возврата</Typography>
            <Typography>№ {refundId}</Typography>

            <Typography>Дата возврата</Typography>
            <Typography>{new Date(refundDate).toLocaleDateString()}</Typography>
          </S.TableCardRows>
        </S.TableCardContent>
      </S.TableCard>
    )
  })

  return (
    <S.RefundsTable>
      <Table
        columns={columns}
        data={selectRefundsProps(refunds)}
        isLoading={isLoading}
        noDataText="Возвраты отсутствуют"
      />

      <TableCardsList
        cards={tableCards}
        isLoading={isLoading}
        noDataText="Возвраты отсутствуют"
        skeletonHeight={222}
      />
    </S.RefundsTable>
  )
}
