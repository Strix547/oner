import { useMemo } from 'react'
import { Column } from 'react-table'
import Typography from '@mui/material/Typography'

import { Table } from 'ui'
import { Rating } from 'components/common'

import { numberToPrice } from 'utils'
import { Product } from 'types/shop'

import * as S from './ShopProductsCatalog.styled'

import ChartCircleIcon from 'public/icons/chart-circle.svg'

interface ProductColumn {
  title: string
  rating: number
  desc: string
  availableAmount: number
  deliveryPeriod: number
  price: number
}

interface ShopProductsCatalogTableProps {
  products?: Product[]
  isLoading?: boolean
}

export const ShopProductsCatalogTable = ({
  products = [],
  isLoading = false
}: ShopProductsCatalogTableProps) => {
  const selectProductsProps = (products: Product[]): ProductColumn[] => {
    return products.map((product) => {
      const { title, availableAmount, price, deliveryPeriod, rating, productInfo } = product

      return {
        title,
        rating,
        desc: productInfo.description,
        availableAmount,
        deliveryPeriod,
        price
      }
    })
  }

  const columns: Column<ProductColumn>[] = useMemo(
    () => [
      {
        Header: 'Производитель и номер',
        accessor: 'title',
        Cell: ({ value: title, row }) => {
          const { rating } = row.original

          return (
            <S.FirstCell>
              <Typography>{title}</Typography>
              <Rating rating={rating} />
            </S.FirstCell>
          )
        }
        // columns: [
        //   {
        //     Header: 'BMW',
        //     accessor: 'title',
        //     Cell: ({ value: title, row }) => {
        //       const { rating } = row.original

        //       return (
        //         <S.FirstCell>
        //           <Typography>{title}</Typography>
        //           <Rating rating={rating} />
        //         </S.FirstCell>
        //       )
        //     }
        //   }
        // ]
      },
      {
        Header: 'Описание',
        accessor: 'desc'
        // columns: [
        //   {
        //     Header: 'Надежный поставщик',
        //     accessor: 'desc'
        //   }
        // ]
      },
      {
        Header: 'Наличие',
        accessor: 'availableAmount',
        Cell: ({ value: availableAmount }) => `${availableAmount} шт.`
        // columns: [
        //   {
        //     Header: '',
        //     accessor: 'availableAmount',
        //     Cell: ({ value: availableAmount }) => `${availableAmount} шт.`
        //   }
        // ]
      },
      {
        Header: 'Срок',
        accessor: 'deliveryPeriod',
        Cell: ({ value: deliveryPeriod }) => {
          return (
            <>
              <S.DeliveryPeriod>
                {deliveryPeriod} дн. <ChartCircleIcon />
              </S.DeliveryPeriod>
            </>
          )
        }
        // columns: [
        //   {
        //     Header: '',
        //     accessor: 'deliveryPeriod',
        //     Cell: ({ value: deliveryPeriod }) => {
        //       return (
        //         <>
        //           <S.DeliveryPeriod>
        //             {deliveryPeriod} дн. <ChartCircleIcon />
        //           </S.DeliveryPeriod>
        //         </>
        //       )
        //     }
        //   }
        // ]
      },
      {
        Header: 'Цена',
        accessor: 'price',
        Cell: ({ value: price }) => <Typography fontWeight={500}>{numberToPrice(price)}</Typography>
        // columns: [
        //   {
        //     Header: '',
        //     accessor: 'price',
        //     Cell: ({ value: price }) => (
        //       <Typography fontWeight={500}>{numberToPrice(price)}</Typography>
        //     )
        //   }
        // ]
      }
    ],
    []
  )

  return (
    <S.ShopProductsCatalogTable>
      <Table data={selectProductsProps(products)} columns={columns} isLoading={isLoading} />
    </S.ShopProductsCatalogTable>
  )
}
