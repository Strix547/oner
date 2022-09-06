import { Column } from 'react-table'
import { useMemo } from 'react'
import { useRouter } from 'next/router'

import { Table } from 'ui'

import { ROUTE_NAMES } from 'core'
import { FindedCarDetails } from 'types/catalogs'

import * as S from './CarDetails.styled'

interface CarDetails extends FindedCarDetails {
  catalog: string
  vehicleId: string
  ssd: string
}

interface CarDetailsTableProps {
  details: CarDetails[]
}

export const CarDetailsTable = ({ details = [] }: CarDetailsTableProps) => {
  const router = useRouter()

  const columns: Column<CarDetails>[] = useMemo(
    () => [
      {
        Header: 'Код продажи',
        accessor: 'salesCode'
      },
      {
        Header: 'Даты производства',
        accessor: 'prodRange'
      },
      {
        Header: 'Рынок',
        accessor: 'market'
      },
      {
        Header: 'Двигатель',
        accessor: 'engine'
      },
      {
        Header: 'Информация о двигателе',
        accessor: 'engineInfo'
      },
      {
        Header: 'КП',
        accessor: 'transmission'
      }
    ],
    []
  )

  const toCarCategoriesPage = ({ catalog, vehicleId, ssd }: CarDetails) => {
    router.push({
      pathname: ROUTE_NAMES.ORIGINAL_SPARE_PARTS_CATEGORIES,
      query: {
        catalog,
        vehicleId,
        ssd
      }
    })
  }

  return (
    <S.CarDetailsTable>
      <Table columns={columns} data={details} onRowClick={toCarCategoriesPage} />
    </S.CarDetailsTable>
  )
}
