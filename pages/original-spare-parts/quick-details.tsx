import Head from 'next/head'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'

import { PageTitle } from 'components'

import { catalogsAPI } from 'api'

import * as S from 'styled/pages/catalogs/OriginalSparePartsQuickDetails'

const OriginalSparePartsQuickDetailsPage = () => {
  const router = useRouter()

  const catalog = router.query.catalog as string
  const vehicleId = router.query.vehicleId as string
  const ssd = router.query.ssd as string
  const oem = router.query.oem as string

  const { data: unitDetails, isLoading: isUnitDetailsLoading } = useQuery(
    ['quick-details', catalog, vehicleId, ssd],
    () => catalogsAPI.findOEM({ catalog, vehicleId, ssd, oem }),
    {
      enabled: Boolean(catalog) && Boolean(vehicleId) && Boolean(ssd) && Boolean(oem)
    }
  )

  const pageTitle =
    isUnitDetailsLoading && unitDetails ? unitDetails?.unitInfo?.name : 'Загружается...'

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <S.OriginalSparePartsQuickDetailsPage>
        <PageTitle>{pageTitle}</PageTitle>
      </S.OriginalSparePartsQuickDetailsPage>
    </>
  )
}

export default OriginalSparePartsQuickDetailsPage
