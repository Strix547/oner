import Head from 'next/head'
import { useRouter } from 'next/router'

import { PageTitle } from 'components'
import { CarModelSearch, CarSearchByParams } from 'components/cars'

import { ROUTE_NAMES } from 'core'

import * as S from 'styled/pages/catalogs/OriginalSpareParts'

const CategoriesOriginalSparePartsPage = () => {
  const router = useRouter()

  const searchByVin = (vin: string) => {
    router.push({
      pathname: ROUTE_NAMES.ORIGINAL_SPARE_PARTS_VEHICLES,
      query: { vin }
    })
  }

  const searchByBodyNumber = (bodyNumber: string) => {
    router.push({
      pathname: ROUTE_NAMES.ORIGINAL_SPARE_PARTS_VEHICLES,
      query: { bodyNumber }
    })
  }

  return (
    <>
      <Head>
        <title>Каталоги оригинальных запчастей</title>
      </Head>

      <S.CategoriesOriginalSparePartsPage>
        <PageTitle>Каталоги оригинальных запчастей</PageTitle>

        <CarModelSearch onSearchByVin={searchByVin} onSearchByBodyNumber={searchByBodyNumber} />

        <CarSearchByParams />
      </S.CategoriesOriginalSparePartsPage>
    </>
  )
}

// export async function getStaticProps() {
//   const queryClient = new QueryClient()

//   await queryClient.prefetchQuery('brands', catalogsAPI.getCarBrands)

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient)
//     }
//   }
// }

export default CategoriesOriginalSparePartsPage
