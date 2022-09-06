import Head from 'next/head'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import Typography from '@mui/material/Typography'

import { PageTitle } from 'components'
import { CarDetailsTable } from 'components/tables'

import { catalogsAPI } from 'api'
import { FindedCar, FindedCarDetails } from 'types/catalogs'

import * as S from 'styled/pages/catalogs/OriginalSparePartsVehicles'

interface CarByName {
  [key: string]: FindedCar[]
}

interface CarDetails extends FindedCarDetails {
  catalog: string
  vehicleId: string
  ssd: string
}

const OriginalSparePartsVehiclesPage = () => {
  const router = useRouter()
  const brandCode = router.query.brandCode as string
  const ssd = router.query.ssd as string

  const { data: findedCars = [], isLoading: isCarsLoading } = useQuery(
    ['cars', brandCode, ssd],
    () => catalogsAPI.findCar({ brandCode, ssd }),
    {
      enabled: !!brandCode && !!ssd
    }
  )

  const carsByName = findedCars.reduce<CarByName>((prev, car) => {
    const isCarNameExist = Object.keys(prev).includes(car.name)

    if (isCarNameExist) {
      return {
        ...prev,
        [car.name]: [...prev[car.name], car]
      }
    }

    return {
      ...prev,
      [car.name]: [car]
    }
  }, {})

  const carTables = Object.entries(carsByName).map(([name, cars]) => {
    const carDetails = cars.reduce<CarDetails[]>((prev, car) => {
      const { catalog, vehicleId, ssd, details } = car

      return [
        ...prev,
        {
          catalog,
          vehicleId,
          ssd,
          ...details
        }
      ]
    }, [])

    return (
      <S.CarType key={name}>
        <Typography variant="h4">{name}</Typography>

        <CarDetailsTable details={carDetails} />
      </S.CarType>
    )
  })

  return (
    <>
      <Head>
        <title>Найденные автомобили</title>
      </Head>

      <PageTitle>Найденные автомобили</PageTitle>

      <S.OriginalSparePartsVehiclesPage>
        <S.CarTypes>{carTables}</S.CarTypes>
      </S.OriginalSparePartsVehiclesPage>
    </>
  )
}

export default OriginalSparePartsVehiclesPage
