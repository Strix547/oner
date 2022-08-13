import { useMemo } from 'react'
import { Column } from 'react-table'
import Link from 'next/link'

import { Table, Skeleton } from 'ui'

import { Order, OrderDocument } from 'types/orders'

import * as S from './OrdersAccounting.styled'

import SignRightIcon from 'public/icons/arrows/sign-right.svg'
import FileIcon from 'public/icons/file.svg'

interface OrderColumn {
  id: number
  dateTime: string
  documents: OrderDocument[]
}

interface OrdersAccountingTableProps {
  orders?: Order[]
  orderPath: string
  isLoading?: boolean
}

export const OrdersAccountingTable = ({
  orders = [],
  orderPath,
  isLoading
}: OrdersAccountingTableProps) => {
  const columns: Column<OrderColumn>[] = useMemo(
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
        accessor: 'dateTime',
        Cell: ({ value: dateTime }) => new Date(dateTime).toLocaleDateString()
      },
      {
        Header: 'Документы',
        accessor: 'documents',
        Cell: ({ value: documents }) => {
          if (!documents.length) return 'Отсутствуют'

          const documentsList = documents.map(({ id, name }) => {
            return (
              <S.Document key={id}>
                <FileIcon />
                <span>{name}</span>
              </S.Document>
            )
          })

          return (
            <S.DocumentsCell>
              <S.DocumentsAccordion>
                <S.DocumentsAccordionSummary expandIcon={<SignRightIcon />}>
                  <FileIcon /> <span>Список документов</span>
                </S.DocumentsAccordionSummary>

                <S.DocumentsAccordionDetails>{documentsList}</S.DocumentsAccordionDetails>
              </S.DocumentsAccordion>
            </S.DocumentsCell>
          )
        }
      }
    ],
    []
  )

  const selectOrdersProps = (orders: Order[]): OrderColumn[] => {
    return orders.map((order) => {
      const { id, documents, createdDateTime } = order

      return {
        id,
        dateTime: createdDateTime,
        documents
      }
    })
  }

  const tableCards = orders.length ? (
    selectOrdersProps(orders).map((order) => {
      const { id, dateTime, documents } = order

      const documentsList = documents.map(({ id, name }) => {
        return (
          <S.Document key={id}>
            <FileIcon />
            <span>{name}</span>
          </S.Document>
        )
      })

      return (
        <S.TableCard key={id}>
          <S.TableCardTop>
            <Link href={`${orderPath}/${id}`} passHref>
              <S.Link>№ {id}</S.Link>
            </Link>

            <span>{new Date(dateTime).toLocaleDateString()}</span>
          </S.TableCardTop>

          <S.TableCardContent>
            {documents.length ? documentsList : 'Документы отсутствуют'}
          </S.TableCardContent>
        </S.TableCard>
      )
    })
  ) : (
    <S.NoDataText>Данные отсутствуют</S.NoDataText>
  )

  return (
    <S.OrdersAccountingTable>
      <Table data={selectOrdersProps(orders)} columns={columns} isLoading={isLoading} />

      {!isLoading ? tableCards : <Skeleton count={3} height={200} />}
    </S.OrdersAccountingTable>
  )
}
