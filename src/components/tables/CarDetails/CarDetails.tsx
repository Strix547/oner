import { Column } from 'react-table'
import { useMemo, Fragment } from 'react'
import { useRouter } from 'next/router'
import Typography from '@mui/material/Typography'

import { TableCardsList } from 'components'
import { Table } from 'ui'

import { ROUTE_NAMES } from 'core'

import * as S from './CarDetails.styled'

import SignRightIcon from 'public/icons/arrows/sign-right.svg'

interface Detail {
  [key: string]: string
}

interface CarDetailsTableProps {
  modelName: string
  details: Detail[]
}

interface ToCarCategoriesPage {
  catalog: string
  vehicleId: string
  ssd: string
}

export const CarDetailsTable = ({ modelName, details = [] }: CarDetailsTableProps) => {
  const router = useRouter()

  const notVisibleKeys = ['ssd', 'vehicleId', 'filter_level', 'name', 'catalog']

  const detailsKeys = Object.keys(details[0]).filter((key) =>
    notVisibleKeys.every((notVisibleKey) => notVisibleKey !== key)
  )

  const detailsColumns = detailsKeys.map((key) => ({
    Header: `${key[0].toUpperCase()}${key.slice(1)}`,
    accessor: key,
    Cell: ({ value }) => {
      if (value?.length > 50) {
        return `${value.slice(0, 50)}...`
      }

      return value ?? '-'
    }
  }))

  const columns: Column<Detail>[] = useMemo(() => detailsColumns, [details])

  const toCarCategoriesPage = ({ catalog, vehicleId, ssd }: ToCarCategoriesPage) => {
    router.push({
      pathname: ROUTE_NAMES.ORIGINAL_SPARE_PARTS_CATEGORIES,
      query: {
        catalog,
        vehicleId,
        ssd,
        modelName
      }
    })
  }

  const tableCards = details.map((details) => {
    const { catalog, vehicleId, ssd, model, filter_level, name, ...props } = details

    const rows = Object.entries(props).map(([key, value]) => {
      return (
        <Fragment key={key}>
          <Typography>{`${key[0].toUpperCase()}${key.slice(1)}`}</Typography>
          <Typography>{value?.length > 50 ? `${value.slice(0, 50)}...` : value}</Typography>
        </Fragment>
      )
    })

    return (
      <S.TableCard
        key={ssd}
        onClick={() => {
          toCarCategoriesPage({ catalog, vehicleId, ssd })
        }}
      >
        <S.TableCardTop>
          <Typography>{model}</Typography>

          <SignRightIcon />
        </S.TableCardTop>

        <S.TableCardContent>
          <S.TableCardRows>{rows}</S.TableCardRows>
        </S.TableCardContent>
      </S.TableCard>
    )
  })

  return (
    <S.CarDetailsTable>
      <Table columns={columns} data={details} onRowClick={toCarCategoriesPage} />

      <TableCardsList cards={tableCards} />
    </S.CarDetailsTable>
  )
}
