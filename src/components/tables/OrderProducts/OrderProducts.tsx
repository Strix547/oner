import { useMemo } from 'react'
import Link from 'next/link'
import { Column } from 'react-table'
import Typography from '@mui/material/Typography'
import { useForm, FormProvider } from 'react-hook-form'

import { TableCardsList } from 'components'
import { Table, Counter } from 'ui'

import { numberToPrice } from 'utils'
import { Product } from 'types/orders'

import * as S from './OrderProducts.styled'

interface ProductColumn {
  id: number
  name: string
  article: string
  productPrice: number
  totalPrice: number
  currency: string
  count: number
  productId: number
  orderId: number
}

interface OnProductCountChange {
  id: number
  orderId: number
  productId: number
  count: number
}

interface OrderProductsTableProps {
  products?: Product[]
  isLoading?: boolean
  onProductCountChange: ({ id, orderId, productId, count }: OnProductCountChange) => void
}

export const OrderProductsTable = ({
  products = [],
  isLoading,
  onProductCountChange
}: OrderProductsTableProps) => {
  const useFormProps = useForm()

  const renderProductCounter = (id: number, productId: number, orderId: number, count: number) => {
    return (
      <Counter
        name={`count-${productId}-${id}`}
        defaultValue={count}
        onIncrement={(value) => {
          onProductCountChange({ id, orderId, productId, count: value })
        }}
        onDecrement={(value) => {
          onProductCountChange({ id, orderId, productId, count: value })
        }}
      />
    )
  }

  const columns: Column<ProductColumn>[] = useMemo(
    () => [
      {
        Header: 'Наименование',
        accessor: 'name',
        Cell: ({ value: name }) => {
          return (
            // убрать
            <Link href="/" passHref>
              <S.Link>{name}</S.Link>
            </Link>
          )
        }
      },
      {
        Header: 'Артикул',
        accessor: 'article'
      },
      {
        Header: 'Цена',
        accessor: 'productPrice',
        Cell: ({ value: productPrice, row }) => {
          const { currency } = row.original
          return numberToPrice(productPrice, currency)
        }
      },
      {
        Header: 'Количество',
        accessor: 'count',
        Cell: ({ value: count, row }) => {
          const { id, productId, orderId } = row.original

          return renderProductCounter(id, productId, orderId, count)
        }
      },
      {
        Header: 'Общая сумма',
        accessor: 'totalPrice',
        Cell: ({ value: totalPrice, row }) => {
          const { currency } = row.original
          return <Typography fontWeight={500}>{numberToPrice(totalPrice, currency)}</Typography>
        }
      }
    ],
    []
  )

  const selectProductsProps = (products: Product[]): ProductColumn[] => {
    return products.map((product) => {
      const { id, productId, name, article, productPrice, totalPrice, currency, count, orderId } =
        product

      return {
        id,
        productId,
        name,
        article,
        productPrice,
        totalPrice,
        currency,
        count,
        orderId
      }
    })
  }

  const tableCards = selectProductsProps(products).map((product) => {
    const { id, productId, name, article, productPrice, totalPrice, currency, count, orderId } =
      product

    return (
      <S.TableCard key={id}>
        <S.TableCardTop>
          <Link href="/" passHref>
            <S.Link>{name}</S.Link>
          </Link>
        </S.TableCardTop>

        <S.TableCardContent>
          <S.TableCardRows>
            <Typography>Артикул</Typography>
            <Typography>{article}</Typography>

            <Typography>Цена</Typography>
            <Typography>{numberToPrice(productPrice, currency)}</Typography>

            <Typography>Количество</Typography>
            <Typography>{renderProductCounter(id, productId, orderId, count)}</Typography>

            <Typography>Общая сумма</Typography>
            <Typography fontWeight={500}>{numberToPrice(totalPrice, currency)}</Typography>
          </S.TableCardRows>
        </S.TableCardContent>
      </S.TableCard>
    )
  })

  return (
    <S.OrderProductsTable>
      <FormProvider {...useFormProps}>
        <Table
          columns={columns}
          data={selectProductsProps(products)}
          isLoading={isLoading}
          noDataText="Продукты отсутствуют"
        />

        <TableCardsList
          cards={tableCards}
          isLoading={isLoading}
          skeletonHeight={230}
          noDataText="Продукты отсутствуют"
        />
      </FormProvider>
    </S.OrderProductsTable>
  )
}
