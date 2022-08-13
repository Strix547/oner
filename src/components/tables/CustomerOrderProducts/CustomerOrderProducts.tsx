import { useMemo } from 'react'
import Link from 'next/link'
import { Column } from 'react-table'
import Typography from '@mui/material/Typography'

import { Table, Skeleton, Button } from 'ui'
import { OrderStatusBadge } from 'components/common'
import { CancelButton } from 'common/buttons'
import { Box } from 'common'

import { Product, ProductStatus } from 'types/orders'
import { numberToPrice } from 'utils'

import * as S from './CustomerOrderProducts.styled'

import CrossIcon from 'public/icons/cross-2.svg'

interface ProductColumn {
  id: number
  name: string
  price: number
  priceTotal: number
  status: ProductStatus
}

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
  const columns: Column<ProductColumn>[] = useMemo(
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
        accessor: 'price',
        Cell: ({ value: price }) => numberToPrice(price)
      },
      {
        Header: 'Общая сумма',
        accessor: 'priceTotal',
        Cell: ({ value: priceTotal }) => {
          return <Typography fontWeight={500}>{numberToPrice(priceTotal)}</Typography>
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
    [onProductRemove]
  )

  const selectProductProps = (products: Product[]): ProductColumn[] => {
    return products.map((product) => {
      const { id, productPrice, totalPrice, status, name } = product

      return {
        id,
        name,
        price: productPrice,
        priceTotal: totalPrice,
        status
      }
    })
  }

  const tableCardsList = products.length ? (
    selectProductProps(products).map((product) => {
      const { id, name, price, priceTotal, status } = product

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
              <Typography>{numberToPrice(price)}</Typography>

              <Typography>Общая сумма</Typography>
              <Typography fontWeight={500}>{numberToPrice(priceTotal)}</Typography>

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
  ) : (
    <S.NoDataText>Данные отсутствуют</S.NoDataText>
  )

  return (
    <S.CustomerOrderProductsTable>
      <Box title="Состав заказа" noPaddings>
        <Table columns={columns} data={selectProductProps(products)} isLoading={isLoading} />

        <S.TableCardsList>
          {!isLoading ? tableCardsList : <Skeleton count={3} height={282} />}
        </S.TableCardsList>
      </Box>
    </S.CustomerOrderProductsTable>
  )
}
