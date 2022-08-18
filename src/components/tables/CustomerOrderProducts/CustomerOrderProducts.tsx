import { useMemo } from 'react'
import Link from 'next/link'
import { Column } from 'react-table'
import Typography from '@mui/material/Typography'

import { Table, Button } from 'ui'
import { OrderStatusBadge } from 'components/common'
import { TableCardsList } from 'components'
import { CancelButton } from 'common/buttons'
import { Box } from 'common'

import { Product } from 'types/orders'
import { numberToPrice } from 'utils'

import * as S from './CustomerOrderProducts.styled'

import CrossIcon from 'public/icons/cross-2.svg'

interface CustomerOrderProductsTableProps {
  isLoading: boolean
  products?: Product[]
  onProductRemove: (id: number) => void
}

export const CustomerOrderProductsTable = ({
  products = [],
  isLoading = false,
  onProductRemove
}: CustomerOrderProductsTableProps) => {
  const columns: Column<Product>[] = useMemo(
    () => [
      {
        Header: 'Наименование',
        accessor: 'name',
        Cell: ({ value: name }) => {
          return (
            <Link href="/" passHref>
              <S.Link>{name}</S.Link>
            </Link>
          )
        }
      },
      {
        Header: 'Цена',
        accessor: 'productPrice',
        Cell: ({ value: productPrice }) => numberToPrice(productPrice)
      },
      {
        Header: 'Общая сумма',
        accessor: 'totalPrice',
        Cell: ({ value: totalPrice }) => {
          return <Typography fontWeight={500}>{numberToPrice(totalPrice)}</Typography>
        }
      },
      {
        Header: 'Текущий статус',
        accessor: 'status',
        Cell: ({ value: status }) => <OrderStatusBadge status={status} />
      },
      {
        Header: '',
        accessor: 'id',
        Cell: ({ value: id }) => {
          return (
            <CancelButton
              onClick={() => {
                onProductRemove(id)
              }}
            />
          )
        }
      }
    ],
    []
  )

  const tableCards = products.map((product) => {
    const { id, name, productPrice, totalPrice, status } = product

    return (
      <S.TableCard key={id}>
        <S.TableCardTop>
          <Link href="/" passHref>
            <S.Link>{name}</S.Link>
          </Link>
        </S.TableCardTop>

        <S.TableCardContent>
          <S.TableCardRows>
            <Typography>Цена</Typography>
            <Typography>{numberToPrice(productPrice)}</Typography>

            <Typography>Общая сумма</Typography>
            <Typography fontWeight={500}>{numberToPrice(totalPrice)}</Typography>

            <Typography>Текущий статус</Typography>
            <OrderStatusBadge status={status} />
          </S.TableCardRows>

          <S.TableCardActions>
            <Button
              color="gray"
              variant="outlined"
              startIcon={<CrossIcon />}
              onClick={() => {
                onProductRemove(id)
              }}
            >
              Отменить
            </Button>
          </S.TableCardActions>
        </S.TableCardContent>
      </S.TableCard>
    )
  })

  return (
    <S.CustomerOrderProductsTable>
      <Box title="Состав заказа" noPaddings>
        <Table
          columns={columns}
          data={products}
          isLoading={isLoading}
          noDataText="Продукты отсутствуют"
        />

        <TableCardsList
          cards={tableCards}
          isLoading={isLoading}
          noDataText="Продукты отсутствуют"
          skeletonHeight={247}
        />
      </Box>
    </S.CustomerOrderProductsTable>
  )
}
