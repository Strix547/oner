import Head from 'next/head'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import Typography from '@mui/material/Typography'

import { PageTitle } from 'components'
import { CarDetailsTable } from 'components/tables'
import { FindedCarCard } from 'components/cars'
import { Skeleton } from 'ui'

import { catalogsAPI } from 'api'
import { FindedCar, FindedCarDetails } from 'types/catalogs'

import * as S from 'styled/pages/catalogs/OriginalSparePartsVehicles'

interface GetPageTitle {
  isCarsLoading: boolean
  brandCode?: string
  ssd?: string
  vin?: string
  bodyNumber?: string
}

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

  const brand = router.query.brand as string
  const brandCode = router.query.brandCode as string
  const ssd = router.query.ssd as string
  const vin = router.query.vin as string
  const bodyNumber = router.query.bodyNumber as string

  const { data: findedCars = [], isLoading: isCarsLoading } = useQuery(
    ['cars', brandCode, ssd],
    () => catalogsAPI.findCar({ brandCode, ssd }),
    {
      enabled: Boolean(brandCode) && Boolean(ssd)
    }
  )

  const { data: carByVin, isLoading: isCarByVinLoading } = useQuery(
    ['car-vin', vin],
    () => catalogsAPI.searchCarByVin({ vin }),
    {
      enabled: Boolean(vin)
    }
  )

  const { data: carByBodyNumber, isLoading: isCarByBodyNumberLoading } = useQuery(
    ['car-body-number', bodyNumber],
    () => catalogsAPI.searchCarByBodyNumber({ bodyNumber }),
    {
      enabled: Boolean(bodyNumber)
    }
  )

  const getPageTitle = ({ brandCode, ssd, vin, bodyNumber, isCarsLoading }: GetPageTitle) => {
    if (isCarsLoading) {
      return 'Загружается...'
    }

    if (brandCode && ssd && brand) {
      return brand
    }

    if (vin) {
      return `Результаты поиска по VIN ${vin}`
    }

    if (bodyNumber) {
      return `Результаты поиска по номеру кузова ${bodyNumber}`
    }
  }

  const pageTitle = getPageTitle({ brandCode, ssd, vin, bodyNumber, isCarsLoading })

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

        <CarDetailsTable modelName={name} details={carDetails} />
      </S.CarType>
    )
  })

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <PageTitle>{pageTitle}</PageTitle>

      <S.OriginalSparePartsVehiclesPage>
        {!isCarsLoading ? (
          <S.CarTypes>{carTables}</S.CarTypes>
        ) : (
          <Skeleton width="100%" height={450} />
        )}
      </S.OriginalSparePartsVehiclesPage>

      {!isCarByVinLoading && !isCarByBodyNumberLoading ? (
        <S.FindedCar>
          {typeof carByVin !== 'undefined' && <FindedCarCard car={carByVin} />}
          {typeof carByBodyNumber !== 'undefined' && <FindedCarCard car={carByBodyNumber} />}
        </S.FindedCar>
      ) : (
        <Skeleton width={350} height={450} />
      )}
    </>
  )
}

export default OriginalSparePartsVehiclesPage
