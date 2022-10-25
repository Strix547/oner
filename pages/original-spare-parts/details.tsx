import Head from 'next/head'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'

import { PageTitle } from 'components'
import { SparePartView } from 'components/cars'
import { SparePartDetailsTable } from 'components/tables'
import { Skeleton } from 'ui'

import { catalogsAPI } from 'api'

import * as S from 'styled/pages/catalogs/SparePartWithDetails'

const SparePartWithDetailsPage = () => {
  const router = useRouter()

  const catalog = router.query.catalog as string
  const unitId = router.query.unitId as string
  const ssd = router.query.ssd as string

  const { data: unitDetails, isLoading: isUnitDetailsLoading } = useQuery(
    ['unit-details', catalog, unitId, ssd],
    () => catalogsAPI.getSparePartUnitDetail({ catalog, unitId, ssd }),
    {
      enabled: Boolean(catalog) && Boolean(unitId) && Boolean(ssd)
    }
  )

  const pageTitle =
    !isUnitDetailsLoading && unitDetails ? unitDetails?.unitInfo.name : 'Загружается...'

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <S.SparePartWithDetailsPage>
        <PageTitle>{pageTitle}</PageTitle>

        {!isUnitDetailsLoading && unitDetails ? (
          <S.Content>
            <SparePartView img={unitDetails.unitInfo.imageUrl} units={unitDetails.units} />
            <SparePartDetailsTable units={unitDetails.units} />
          </S.Content>
        ) : (
          <S.SkeletonGrid>
            <Skeleton count={2} width="100%" height={700} />
          </S.SkeletonGrid>
        )}
      </S.SparePartWithDetailsPage>
    </>
  )
}

export default SparePartWithDetailsPage
